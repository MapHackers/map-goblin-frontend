import React, { useEffect, useState } from 'react';
import {Link, withRouter} from "react-router-dom";
import styled from "styled-components";

import { FileTextOutlined, EnvironmentOutlined, PullRequestOutlined, ExclamationCircleOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

import CommonLayout from "../components/Layout/CommonLayout";
import MapContainer from "../components/Map/MapContainer";

import {
    Breadcrumb,
    Tabs,
    Avatar,
    Table,
    Tag,
    Row,
    Col,
    Divider,
    Result,
    Button,
    Spin,
    Statistic,
    Image,
    Pagination,
    Alert
} from 'antd';
import { LikeOutlined, LikeTwoTone, DislikeOutlined, DislikeTwoTone } from '@ant-design/icons';
import Api from "../util/Api";

import InfoSetting from "../components/Repository/InfoSetting";
import {useDispatch} from "react-redux";

import {compareRepository, selectIssueList, selectRequestList} from "../_actions/repository_action";

const { TabPane } = Tabs

let hrefId="";
let hrefRepo="";

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        render: (title, values) => {
            if(values.type === "issue"){
                return (<Link to={`/${hrefId}/repositories/${hrefRepo}/issues/${values.key}`}>{title}</Link>)
            }else{
                return (<Link to={{pathname:`/${hrefId}/repositories/${hrefRepo}/requests/${values.key}`,
                    state: {userId:hrefId, repositoryName: hrefRepo}}}>{title}</Link>)
            }
        },
    },
    {
        title: 'User',
        dataIndex: 'user',
        key: 'user',
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: tags => (
            <span>
                {tags.map(tag => {
                    let color;

                    if (tag === 'QUESTION') {
                        color = 'geekblue'
                    } else if (tag === 'ISSUE') {
                        color = 'volcano'
                    } else if (tag === 'OK') {
                        color = 'green'
                    } else if (tag === 'DENIED') {
                        color = 'red'
                    } else if (tag === 'REQUEST') {
                        color = 'processing'
                    } else if (tag === 'MERGE') {
                        color = 'gold'
                    } else if (tag === 'DUPLICATE') {
                        color = 'default'
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </span>
        ),
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',

    }
];

let totalWaitingIssueCount = 0;
let totalCheckedIssueCount = 0;
let totalWaitingRequestCount = 0;
let totalAcceptedRequestCount = 0;
let totalDeniedRequestCount = 0;

const Description = styled.div`
    margin : 20px 100px 20px 100px;
`;

const Info = styled.div`
    
`;

let visitCount = 0

const RepositoryPage = (props) => {
    const dispatch = useDispatch()

    const [repositoryInfo, setRepositoryInfo] = useState({});
    const [thumbnail, setThumbnail] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [isFirst, setIsFirst] = useState(true);
    const { userId, repositoryName } = props.match.params;
    const userUrl = `/${userId}`;

    const [issueWaitingPage, setIssueWaitingPage] = useState(1);
    const [issueCheckedPage, setIssueCheckedPage] = useState(1);
    const [issueWaitingData, setIssueWaitingData] = useState([]);
    const [issueCheckedData, setIssueCheckedData] = useState([]);

    const [requestLoading, setRequestLoading] = useState(false);
    const [requestWaitingPage, setRequestWaitingPage] = useState(1);
    const [requestAcceptedPage, setRequestAcceptedPage] = useState(1);
    const [requestDeniedPage, setRequestDeniedPage] = useState(1);
    const [requestWaitingData, setRequestWaitingData] = useState([]);
    const [requestAcceptedData, setRequestAcceptedData] = useState([]);
    const [requestDeniedData, setRequestDeniedData] = useState([]);

    const backHome = () => {
        props.history.push('/main')
    }

    useEffect(() => {
        // 새로 고침 가능!!
        if (isFirst && visitCount !== 0){
            visitCount++
            setIsFirst(false)
            Api.post(`/${userId}/${repositoryName}/visit`)
                .then(response => response)
                .catch(e => e)
        }
        visitCount++
        async function getRepositoryInfo() {
            hrefId = userId;
            hrefRepo = repositoryName;

            setIsLoading(true);
            await Api.get(`/${userId}/repositories/${repositoryName}`).then(response => {
                setRepositoryInfo(response.data);

                if (response.data.thumbnail !== null) {
                    setThumbnail(Api.defaults.baseURL + '/files/' + response.data.thumbnail);
                }else{
                    setThumbnail(Api.defaults.baseURL + '/files/no-image.svg');
                }

            }).catch(error => {
                setNotFound(true);
            });

            dispatch(selectIssueList(0, userId, repositoryName, 'WAITING'))
                .then(response => {

                    let issueList = response.payload.data;
                    totalWaitingIssueCount = issueList.totalElements;

                    let contents = issueList.content;

                    let result = []

                    for(let i=0; i<contents.length; i++){
                        let jsonObj = {};

                        jsonObj.key = contents[i].id;
                        jsonObj.title = contents[i].title;
                        jsonObj.user = contents[i].createdBy;
                        jsonObj.tags = [contents[i].tag];
                        jsonObj.date = contents[i].createdDate;

                        result.push(jsonObj);
                    }

                    setIssueWaitingData(result);
                })
                .catch(error => {
                    setNotFound(true);
                })

            dispatch(selectIssueList(0, userId, repositoryName, 'CHECKED'))
                .then(response => {

                    let issueList = response.payload.data;
                    totalCheckedIssueCount = issueList.totalElements;

                    let contents = issueList.content;

                    let result = []

                    for(let i=0; i<contents.length; i++){
                        let jsonObj = {};

                        jsonObj.key = contents[i].id;
                        jsonObj.title = contents[i].title;
                        jsonObj.user = contents[i].createdBy;
                        jsonObj.tags = [contents[i].tag];
                        jsonObj.date = contents[i].createdDate;
                        jsonObj.type = "issue";

                        result.push(jsonObj);
                    }

                    setIssueCheckedData(result);

                    setIsLoading(false);
                })
                .catch(error => {
                    setNotFound(true);
                });

            dispatch(selectRequestList(0, userId, repositoryName, 'WAITING'))
                .then(response => {

                    let issueList = response.payload.data;
                    totalWaitingRequestCount = issueList.totalElements;

                    let contents = issueList.content;

                    let result = []

                    for(let i=0; i<contents.length; i++){
                        let jsonObj = {};

                        jsonObj.key = contents[i].id;
                        jsonObj.title = contents[i].title;
                        jsonObj.user = contents[i].createdBy;
                        jsonObj.tags = [contents[i].tag];
                        jsonObj.date = contents[i].createdDate;
                        jsonObj.type = "request";

                        result.push(jsonObj);
                    }

                    setRequestWaitingData(result);

                    setIsLoading(false);
                })
                .catch(error => {
                    setNotFound(true);
                });

            dispatch(selectRequestList(0, userId, repositoryName, 'ACCEPTED'))
                .then(response => {

                    let requestList = response.payload.data;
                    totalAcceptedRequestCount = requestList.totalElements;

                    let contents = requestList.content;

                    let result = []

                    for(let i=0; i<contents.length; i++){
                        let jsonObj = {};

                        jsonObj.key = contents[i].id;
                        jsonObj.title = contents[i].title;
                        jsonObj.user = contents[i].createdBy;
                        jsonObj.tags = [contents[i].tag];
                        jsonObj.date = contents[i].createdDate;
                        jsonObj.type = "request";

                        result.push(jsonObj);
                    }

                    setRequestAcceptedData(result);

                    setIsLoading(false);
                })
                .catch(error => {
                    setNotFound(true);
                });

            dispatch(selectRequestList(0, userId, repositoryName, 'DENIED'))
                .then(response => {

                    let requestList = response.payload.data;
                    totalDeniedRequestCount = requestList.totalElements;

                    let contents = requestList.content;

                    let result = []

                    for(let i=0; i<contents.length; i++){
                        let jsonObj = {};

                        jsonObj.key = contents[i].id;
                        jsonObj.title = contents[i].title;
                        jsonObj.user = contents[i].createdBy;
                        jsonObj.tags = [contents[i].tag];
                        jsonObj.date = contents[i].createdDate;
                        jsonObj.type = "request";

                        result.push(jsonObj);
                    }

                    setRequestDeniedData(result);

                    setIsLoading(false);
                })
                .catch(error => {
                    setNotFound(true);
                });

            dispatch(compareRepository(userId, repositoryName))
                .then(response => {
                    if(response.payload.status === 200){
                        if(response.payload.data.message === undefined){
                            setRequestLoading(true);
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                })
        }

        getRepositoryInfo().then();
    }, [props, actionType])

    const onClickClone = () => {
        if(repositoryInfo.source === "HOST" && repositoryInfo.authority === "OWNER"){
            alert("본인의 지도는 클론할 수 없습니다.");
        }else{
            // eslint-disable-next-line no-restricted-globals
            if(confirm("지도를 클론하시겠습니까?")){
                Api.post('/repositories/clone', {"repositoryId":repositoryInfo.id}).then(response => {
                    alert("클론이 완료되었습니다. 클론된 지도로 이동합니다.");
                    props.history.push(`/${props.user.userData.data.userId}/repositories/${response.data.name}`);
                }).catch(error => {
                    alert(error.response.data.message);
                })
            }
        }

    }

    const onClickLike = (type) => {
        Api.post(`/${repositoryInfo.id}/like`, {"type":type}).then(response => {
            if(actionType === type){
                setActionType(null);
            }else{
                setActionType(type)
            }

        }).catch(error=>{
            console.log(error);
        })
    }

    const onChangeWaitingPage = (page) => {
        dispatch(selectIssueList(page-1, userId, repositoryName, 'WAITING'))
            .then(response => {

                let issueList = response.payload.data;

                let contents = issueList.content;

                let result = []

                for(let i=0; i<contents.length; i++){
                    let jsonObj = {};

                    jsonObj.key = contents[i].id;
                    jsonObj.title = contents[i].title;
                    jsonObj.user = contents[i].createdBy;
                    jsonObj.tags = [contents[i].tag];
                    jsonObj.date = contents[i].createdDate;
                    jsonObj.type = "issue";

                    result.push(jsonObj);
                }

                setIssueWaitingData(result);
            });

        setIssueWaitingPage(page);
    }

    const onChangeCheckedPage = (page) => {
        dispatch(selectIssueList(page-1, userId, repositoryName, 'CHECKED'))
            .then(response => {

                let issueList = response.payload.data;

                let contents = issueList.content;

                let result = []

                for(let i=0; i<contents.length; i++){
                    let jsonObj = {};

                    jsonObj.key = contents[i].id;
                    jsonObj.title = contents[i].title;
                    jsonObj.user = contents[i].createdBy;
                    jsonObj.tags = [contents[i].tag];
                    jsonObj.date = contents[i].createdDate;
                    jsonObj.type = "issue";

                    result.push(jsonObj);
                }

                setIssueWaitingData(result);
            });

        setIssueCheckedPage(page);
    }

    const onChangeRequestWaitingPage = (page) => {
        dispatch(selectRequestList(page-1, userId, repositoryName, 'WAITING'))
            .then(response => {

                let requestList = response.payload.data;

                let contents = requestList.content;

                let result = []

                for(let i=0; i<contents.length; i++){
                    let jsonObj = {};

                    jsonObj.key = contents[i].id;
                    jsonObj.title = contents[i].title;
                    jsonObj.user = contents[i].createdBy;
                    jsonObj.tags = [contents[i].tag];
                    jsonObj.date = contents[i].createdDate;
                    jsonObj.type = "request";

                    result.push(jsonObj);
                }

                setRequestWaitingData(result);
            });

        setRequestWaitingPage(page);
    }

    const onChangeRequestAcceptedPage = (page) => {
        dispatch(selectRequestList(page-1, userId, repositoryName, 'ACCEPTED'))
            .then(response => {

                let requestList = response.payload.data;

                let contents = requestList.content;

                let result = []

                for(let i=0; i<contents.length; i++){
                    let jsonObj = {};

                    jsonObj.key = contents[i].id;
                    jsonObj.title = contents[i].title;
                    jsonObj.user = contents[i].createdBy;
                    jsonObj.tags = [contents[i].tag];
                    jsonObj.date = contents[i].createdDate;
                    jsonObj.type = "request";

                    result.push(jsonObj);
                }

                setRequestAcceptedData(result);
            });

        setRequestAcceptedPage(page);
    }

    const onChangeRequestDeniedPage = (page) => {
        dispatch(selectRequestList(page-1, userId, repositoryName, 'DENIED'))
            .then(response => {

                let requestList = response.payload.data;

                let contents = requestList.content;

                let result = []

                for(let i=0; i<contents.length; i++){
                    let jsonObj = {};

                    jsonObj.key = contents[i].id;
                    jsonObj.title = contents[i].title;
                    jsonObj.user = contents[i].createdBy;
                    jsonObj.tags = [contents[i].tag];
                    jsonObj.date = contents[i].createdDate;
                    jsonObj.type = "request";

                    result.push(jsonObj);
                }

                setRequestDeniedData(result);
            });

        setRequestDeniedPage(page);
    }

    if (!isLoading) {
        return (
            <CommonLayout>
                <Breadcrumb style={{ fontSize: '20px', textAlign: 'left', padding: '30px 0px 20px 30px' }}>
                    <Breadcrumb.Item>
                        <a href={userUrl}>{userId}</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                        <a href="">{repositoryName}</a>
                        {repositoryInfo.source === "CLONE" && <div style={{ fontSize: "15px" }}>원본 지도 : <a style={{ color: "blue" }} href={'/' + repositoryInfo.hostUserId + '/repositories/' + repositoryInfo.hostRepoName}>{`/${repositoryInfo.hostUserId}/repositories/${repositoryInfo.hostRepoName}`}</a></div>}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Tabs defaultActiveKey="1" size="large" style={{ padding: '0px 30px 10px 30px' }}>
                    <TabPane tab={<span><FileTextOutlined />지도 소개</span>} key="1">
                        <Description>
                            <Row>
                                <Col flex="auto" style={{ width: '200px' }}>
                                    <Row>
                                        <h1 style={{ marginBottom: '50px', fontSize: '2rem', fontWeight: '2rem', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px' }}> 상세설명 </h1>
                                        <h2 style={{ fontSize: '1.1rem', lineHeight: '2rem' }}>{repositoryInfo.description}</h2>
                                    </Row>
                                </Col>
                                <Col flex="auto" style={{ marginLeft: '50px', marginRight: '50px' }}>
                                    <Row style={{ alignContent: "center", justifyContent: "center" }}>
                                        {thumbnail !== "" && <Image preview={false} src={thumbnail} alt="Thumbnail" style={{ width: '50vw', height: '50vh' }}
                                                                    fallback="/no-image.svg"
                                        />}
                                    </Row>
                                </Col>
                                <Col flex="auto">
                                    <Info>
                                        {repositoryInfo.source === "HOST" && <Button type="primary" size="large" style={{ width: "100%" }} onClick={onClickClone}>내 지도로 가져오기</Button>}
                                        <Divider />
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Statistic title="좋아요" value={repositoryInfo.likeCount} prefix={repositoryInfo.likeType === "LIKE" ? <LikeTwoTone onClick={()=>{onClickLike("LIKE")}}/> : <LikeOutlined onClick={()=>{onClickLike("LIKE")}}/>} />
                                            </Col>
                                            <Col span={12}>
                                                <Statistic title="싫어요" value={repositoryInfo.dislikeCount} prefix={repositoryInfo.likeType === "DISLIKE" ? <DislikeTwoTone onClick={()=>{onClickLike("DISLIKE")}}/> : <DislikeOutlined onClick={()=>{onClickLike("DISLIKE")}}/>} />
                                            </Col>
                                        </Row>
                                        <Divider>카테고리</Divider>
                                        {
                                            repositoryInfo.categories.map((category, idx)=>{
                                                return (
                                                    <Tag color='geekblue' key={idx}>{category}</Tag>
                                                )
                                            })
                                        }
                                        <Divider>Owner의 한마디</Divider>
                                        <p>
                                            {repositoryInfo.oneWord}
                                        </p>
                                        <Divider>Owner</Divider>
                                        <div>
                                            {
                                                repositoryInfo.owners.map((ownerId, idx)=>{
                                                    return(
                                                        <h3 style={{ textAlign: "left" }} key={idx}>
                                                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                                            &nbsp;{ownerId}
                                                            
                                                        </h3>
                                                    )
                                                })
                                            }
                                        </div>
                                    </Info>
                                </Col>
                            </Row>
                        </Description>
                    </TabPane>
                    <TabPane tab={<span><EnvironmentOutlined />지도</span>} key="2">
                        <MapContainer mapId={repositoryInfo.map_id} authority={repositoryInfo.authority} key="mapContainer"/>
                    </TabPane>
                    { repositoryInfo.source === "HOST" && <TabPane tab={<span><ExclamationCircleOutlined />지적하기</span>} key="3">
                        <Alert
                            message="새로운 이슈를 올려주세요!"
                            type="warning"
                            action={
                                <Link to={`/${userId}/repositories/${repositoryName}/issues`}>
                                    <Button size="middle" type="primary">지적하기</Button>
                                </Link>
                            }
                            style={{marginBottom: '10px', borderRadius: '15px', fontSize: '15px'}}
                        />
                        <Tabs defaultActiveKey="1" size="large" style={{ padding: '0px 30px 10px 30px', borderStyle: 'solid', borderWidth: 'thin', borderRadius: '20px' }}>
                            <TabPane tab={<span>{totalWaitingIssueCount} Waiting</span>} key="1">
                                <Table
                                    columns={columns}
                                    pagination={false}
                                    dataSource={issueWaitingData}
                                />
                                <Pagination style={{marginLeft: '45%', marginTop: '20px'}} current={issueWaitingPage} pageSize={8} onChange={onChangeWaitingPage} total={totalWaitingIssueCount}/>
                            </TabPane>
                            <TabPane tab={<span>{totalCheckedIssueCount} Checked</span>} key="2">
                                <Table
                                    columns={columns}
                                    pagination={false}
                                    dataSource={issueCheckedData}
                                />
                                <Pagination style={{marginLeft: '45%', marginTop: '20px'}} current={issueCheckedPage} pageSize={8} onChange={onChangeCheckedPage} total={totalCheckedIssueCount}/>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    }
                    { repositoryInfo.source === "HOST" && <TabPane tab={<span><PullRequestOutlined />변경 요청</span>} key="4">
                        {
                            requestLoading && <Alert
                                message="복사한 지도에 변경사항이 있습니다!"
                                type="info"
                                action={
                                    <Link to={{pathname: `/${userId}/repositories/${repositoryName}/requests`, state: {userId: userId, repositoryName:repositoryName}}}>
                                        <Button size="middle" type="primary">요청하기</Button>
                                    </Link>
                                }
                                style={{marginBottom: '10px', borderRadius: '15px', fontSize: '15px'}}
                            />
                        }
                        <Tabs defaultActiveKey="1" size="large" style={{ padding: '0px 30px 10px 30px', borderStyle: 'solid', borderWidth: 'thin', borderRadius: '20px' }}>
                            <TabPane tab={<span>{totalWaitingRequestCount} Waiting</span>} key="1">
                                <Table
                                    columns={columns}
                                    pagination={false}
                                    dataSource={requestWaitingData}
                                />
                                <Pagination style={{marginLeft: '45%', marginTop: '20px'}} current={requestWaitingPage} pageSize={8} onChange={onChangeRequestWaitingPage} total={totalWaitingRequestCount}/>
                            </TabPane>
                            <TabPane tab={<span>{totalAcceptedRequestCount} Accepted</span>} key="2">
                                <Table
                                    columns={columns}
                                    pagination={false}
                                    dataSource={requestAcceptedData}
                                />
                                <Pagination style={{marginLeft: '45%', marginTop: '20px'}} current={requestAcceptedPage} pageSize={8} onChange={onChangeRequestAcceptedPage} total={totalAcceptedRequestCount}/>
                            </TabPane>
                            <TabPane tab={<span>{totalDeniedRequestCount} Denied</span>} key="3">
                                <Table
                                    columns={columns}
                                    pagination={false}
                                    dataSource={requestDeniedData}
                                />
                                <Pagination style={{marginLeft: '45%', marginTop: '20px'}} current={requestDeniedPage} pageSize={8} onChange={onChangeRequestDeniedPage} total={totalDeniedRequestCount}/>
                            </TabPane>
                        </Tabs>
                    </TabPane>
                    }
                    { repositoryInfo.authority === "OWNER" && <TabPane tab={<span><SettingOutlined />설정</span>} key="5">
                        <InfoSetting repositoryInfo={repositoryInfo} thumbnailUrl={thumbnail}/>
                    </TabPane>
                    }

                </Tabs>
            </CommonLayout>
        );
    } else {
        return (
            <div style={isLoading && notFound ? null : { textAlign: "center", lineHeight: "100vh", height: "100vh" }}>
                {isLoading && notFound ? <Result
                    status="404"
                    title="404"
                    subTitle="존재하지 않는 페이지입니다."
                    extra={<Button type="primary" onClick={backHome}>홈으로</Button>}
                /> : <Spin size="large" tip="Loading..." />}
            </div>
        );
    }
};

export default withRouter(RepositoryPage);