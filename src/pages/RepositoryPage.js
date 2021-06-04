import React, { useEffect, useState } from 'react';
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
    Pagination
} from 'antd';
import { LikeOutlined, LikeTwoTone, DislikeOutlined, DislikeTwoTone } from '@ant-design/icons';
import Api from "../util/Api";

import InfoSetting from "../components/Repository/InfoSetting";
import {useDispatch, useSelector} from "react-redux";

import {selectIssueList} from "../_actions/repository_action";

const { TabPane } = Tabs

let hrefId="";
let hrefRepo="";

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        render: (title, values) => <a href={`/${hrefId}/repositories/${hrefRepo}/issues/${values.key}`}>{title}</a>,
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

const requestWaitingData = [
    {
        key: '1',
        title: '학교 경치 좋은 곳 추가',
        user: 'doili0552',
        tags: ['request'],
        date: '2021-04-11 12:43:52',
    },
    {
        key: '2',
        title: '학교 화장실 위치 추가',
        user: '88dydfuf',
        tags: ['request'],
        date: '2021-04-10 09:33:27',
    }
];

const requestAcceptedData = [
    {
        key: '1',
        title: '학교 편의점 위치 추가',
        user: '88dydfuf',
        tags: ['ok', 'merge'],
        date: '2021-04-10 09:33:27',
    },
    {
        key: '2',
        title: '학교 커피숍 위치 추가',
        user: 'ghdtjq2038',
        tags: ['ok', 'merge'],
        date: '2021-04-9 11:10:20',
    },
];

const requestDeniedData = [
    {
        key: '1',
        title: '학교 운동장 위치 추가',
        user: 'doili0552',
        tags: ['denied', 'duplicate'],
        date: '2021-04-11 12:43:52',
    },
    {
        key: '2',
        title: '맛집 추가',
        user: 'ghdtjq2038',
        tags: ['denied'],
        date: '2021-04-11 12:43:52',
    },
];

const Description = styled.div`
    margin : 20px 100px 20px 100px;
`;

const Info = styled.div`
    
`;

const RepositoryPage = (props) => {
    const dispatch = useDispatch()

    const [repositoryInfo, setRepositoryInfo] = useState({});
    const [thumbnail, setThumbnail] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [actionType, setActionType] = useState(null);
    const { userId, repositoryName } = props.match.params;
    const userUrl = `/${userId}`;

    const [issueWaitingPage, setIssueWaitingPage] = useState(1);
    const [issueCheckedPage, setIssueCheckedPage] = useState(1);
    const [issueWaitingData, setIssueWaitingData] = useState([]);
    const [issueCheckedData, setIssueCheckedData] = useState([]);

    const backHome = () => {
        props.history.push('/main')
    }

    useEffect(() => {

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

                        jsonObj.key = i;
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

                        jsonObj.key = i;
                        jsonObj.title = contents[i].title;
                        jsonObj.user = contents[i].createdBy;
                        jsonObj.tags = [contents[i].tag];
                        jsonObj.date = contents[i].createdDate;

                        result.push(jsonObj);
                    }

                    setIssueCheckedData(result);

                    setIsLoading(false);
                })
                .catch(error => {
                    setNotFound(true);
                })
        }

        getRepositoryInfo().then();
    }, [props,actionType])

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

                    jsonObj.key = i;
                    jsonObj.title = contents[i].title;
                    jsonObj.user = contents[i].createdBy;
                    jsonObj.tags = [contents[i].tag];
                    jsonObj.date = contents[i].createdDate;

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

                    jsonObj.key = i;
                    jsonObj.title = contents[i].title;
                    jsonObj.user = contents[i].createdBy;
                    jsonObj.tags = [contents[i].tag];
                    jsonObj.date = contents[i].createdDate;

                    result.push(jsonObj);
                }

                setIssueWaitingData(result);
            });

        setIssueCheckedPage(page);
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
                        <Button href={`/${userId}/repositories/${repositoryName}/issues`}>새로운 지적</Button>
                        <Tabs defaultActiveKey="1" size="large" style={{ padding: '0px 30px 10px 30px', borderStyle: 'solid', borderWidth: 'thin', borderRadius: '20px' }}>
                            <TabPane tab={<span>{`${totalWaitingIssueCount} Waiting`}</span>} key="1">
                                <Table
                                    columns={columns}
                                    pagination={false}
                                    dataSource={issueWaitingData}
                                />
                                <Pagination style={{marginLeft: '45%', marginTop: '20px'}} current={issueWaitingPage} pageSize={8} onChange={onChangeWaitingPage} total={totalWaitingIssueCount}/>
                            </TabPane>
                            <TabPane tab={<span>{`${totalCheckedIssueCount} Checked`}</span>} key="2">
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
                        <Button href={`/${userId}/repositories/${repositoryName}/requests`}>새로운 변경 요청</Button>
                        <Tabs defaultActiveKey="1" size="large" style={{ padding: '0px 30px 10px 30px', borderStyle: 'solid', borderWidth: 'thin', borderRadius: '20px' }}>
                            <TabPane tab={<span>2 Waiting</span>} key="1">
                                <Table
                                    columns={columns}
                                    pagination={{ position: ['bottomCenter'] }}
                                    dataSource={requestWaitingData}
                                />
                            </TabPane>
                            <TabPane tab={<span>2 Accepted</span>} key="2">
                                <Table
                                    columns={columns}
                                    pagination={{ position: ['bottomCenter'] }}
                                    dataSource={requestAcceptedData}
                                />
                            </TabPane>
                            <TabPane tab={<span>1 Denied</span>} key="3">
                                <Table
                                    columns={columns}
                                    pagination={{ position: ['bottomCenter'] }}
                                    dataSource={requestDeniedData}
                                />
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

export default RepositoryPage;