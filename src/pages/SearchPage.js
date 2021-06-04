import React, {useEffect, useState} from 'react'
import NavBar from '../components/NavigationBar/NavigationBar'
import qs from 'qs'
import {Avatar, Image, List, Space, Tabs, Card, Badge} from 'antd';
import {UserOutlined, EnvironmentOutlined, LikeOutlined, DislikeOutlined, EyeOutlined} from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";
import Api from "../util/Api";
import {searchRepository, searchUser} from "../_actions/search_action";
import SearchRepoList from "../components/SearchList/SearchRepoList";

const {TabPane} = Tabs;
const {Meta} = Card;

const test = [
    {
        userId: '1',
        profile: null,
        name: '',
        email: '',
        description: '',
        likeCounts: '',
        visitCounts: '',
    },
    {
        userId: '2',
        profile: null,
        name: '',
        email: '',
        description: '',
        likeCounts: '',
        visitCounts: '',
    },
    {
        userId: '3',
        profile: null,
        name: '',
        email: '',
        description: '',
        likeCounts: '',
        visitCounts: '',
    },
    {
        userId: '4',
        profile: null,
        name: '',
        email: '',
        description: '',
        likeCounts: '',
        visitCounts: '',
    },
    {
        userId: '5',
        profile: null,
        name: '',
        email: '',
        description: '',
        likeCounts: '',
        visitCounts: '',
    },
    {
        userId: '6',
        profile: null,
        name: '',
        email: '',
        description: '',
        likeCounts: '',
        visitCounts: '',
    },
    {
        userId: '7',
        profile: null,
        name: '',
        email: '',
        description: '',
        likeCounts: '',
        visitCounts: '',
    },
    {
        userId: '8',
        profile: null,
        name: '',
        email: '',
        description: '',
        likeCounts: '',
        visitCounts: '',
    },
]

const IconText = ({icon, text}) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

function getDate(isoDate) {
    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const createdDate = isoDate.split(/-|T/);
    const year = createdDate[0];
    const month = months[parseInt(createdDate[1])]
    const date = createdDate[2];

    return year + ', ' + month + ' ' + date;
}

function SearchPage({location, history}) {

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });

    const searchValue = `${query.q}`
    const dispatch = useDispatch()

    const highlightedText = (text) => {
        if (searchValue !== '' && text.includes(searchValue)) {
            const parts = text.split(new RegExp(`(${searchValue})`, 'gi'));

            return (
                <>
                    {parts.map((part, index) =>
                        part.toLowerCase() === searchValue.toLowerCase() ? (
                            <mark key={index}>{part}</mark>
                        ) : (
                            part
                        ),
                    )}
                </>
            );
        }

        return text;
    };

    useEffect(() => {
        if (searchValue !== ""){
            dispatch(searchUser(searchValue))
                .then(response => response)
            dispatch(searchRepository(searchValue))
                .then(response => response)
        }
    }, [searchValue])

    const maps = useSelector(state => state.search.searchRepo)
    const users = useSelector(state => state.search.searchUser)

    return (
        <div>
            <NavBar/>
            <div style={{marginLeft: '200px', marginRight: '200px'}}>
                <div style={{marginTop: '20px', marginRight: 'auto'}}>
                    <h1> "{searchValue}" 키워드에 대한 검색 결과가 {maps?.length + users?.length > 0 ? (maps?.length + users?.length) + '개 있습니다.' : '없습니다.'}</h1>
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><EnvironmentOutlined/>지도 <Badge className="site-badge-count-4" count={maps?.length} style={{ color:'#858585', backgroundColor:'#fff', boxShadow:'0 0 0 1px #d9d9d9 inset' }}/></span>} key="1">
                        <div className="지도 검색 리스트" style={{height: "700px", overflow: "auto", marginRight: "100px"}}>
                            <List
                                itemLayout="horizontal"
                                size="large"
                                layout="vertical"
                                dataSource={maps}
                                pagination={{
                                    onChange: page => {
                                    },
                                    pageSize: 10,
                                }}
                                renderItem={item => (
                                    <List.Item
                                        actions={[
                                            <div>{getDate(item.date)}</div>,
                                            <IconText icon={LikeOutlined} text={item.likeCount}
                                                      key="list-vertical-star-o"/>,
                                            <IconText icon={DislikeOutlined} text={item.dislikeCount}
                                                      key="list-vertical-like-o"/>,
                                            <IconText icon={EyeOutlined} text={item.visitCount} key="list-vertical-message"/>,
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Image
                                                    width='6rem'
                                                    height='6rem'
                                                    alt="example"
                                                    src={item.thumbnail ? Api.defaults.baseURL + '/files/' + item.thumbnail : "no-image.svg"}
                                                    style={{borderRadius: "10%"}}
                                                    preview={false}
                                                />
                                            }
                                            title={
                                                <a href={`/${item.ownerId}/repositories/${item.name}`}
                                                   style={{fontSize: '16px'}}>
                                                    {highlightedText(item.name)}
                                                </a>
                                            }
                                            description={item.description ? highlightedText(item.description) : item.description}
                                        />
                                        <b>Created by</b>
                                        <Avatar size = {20}
                                                shape="circle"
                                                style={{marginLeft: '10px', marginRight:'5px'}}
                                                src={item.userProfile ? Api.defaults.baseURL + '/files/' + item.userProfile : 'no-image.svg'}
                                                onClick={() => history.push(`/${item.ownerId}`)}
                                        />
                                        {item.userName}
                                        {/*<span onClick={() => history.push(`/${item.ownerId}`)}>{item.userName}</span>*/}
                                    </List.Item>

                                )}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab={<span><UserOutlined/>유저 <Badge className="site-badge-count-4" count={users?.length} style={{ color:'#858585', backgroundColor:'#fff', boxShadow:'0 0 0 1px #d9d9d9 inset' }}/></span>} key="2">
                        <div className="지도 검색 리스트" style={{height: "700px", overflow: "auto", marginRight: "100px"}}>
                            <List
                                grid={{
                                    align: 'middle',
                                    gutter: [40, 40],
                                    xs: 1,
                                    sm: 1,
                                    md: 1,
                                    lg: 2,
                                    xl: 3,
                                    xxl: 4,
                                }}
                                dataSource={users}
                                renderItem={item => (
                                    <List.Item>
                                        <Card
                                            onClick={() => history.push(`/${item.userId}`)}
                                            style={{width: '250px', boxShadow: '2px 2px 10px #a6a6a6'}}
                                            cover={
                                                <div>
                                                    <div
                                                        style={{
                                                            position: 'absolute',
                                                            width: "250px",
                                                            height: '125px',
                                                            backgroundColor: 'rgba(160, 208, 253, 1)'
                                                        }}
                                                    />

                                                    <Avatar size={200}
                                                            shape="circle"
                                                            style={{marginTop: '25px', marginLeft: '25px'}}
                                                            src={item.profile ? Api.defaults.baseURL + '/files/' + item.profile : 'no-image.svg'}
                                                    />

                                                </div>
                                            }
                                            actions={[
                                                <div>총 좋아요 수 <br/><LikeOutlined key="like" style={{marginRight:'5px'}}/>{item.likeCounts}</div>,
                                                <div>총 조회 수 <br/><EyeOutlined key="visit" style={{marginRight:'5px'}}/>{item.visitCounts}</div>,
                                                // <LikeOutlined key="like" />,
                                                // <DownloadOutlined key="clone" />,
                                            ]}
                                        >
                                            <Meta
                                                title={highlightedText(item.name)}
                                                description={item.email}
                                            />
                                            <Meta
                                                style={{marginTop: '10px'}}
                                                title={item.description}
                                            />
                                        </Card>
                                    </List.Item>
                                )}
                            />
                        </div>
                    </TabPane>
                </Tabs>
                {/*<SearchLists Lists={Lists} />*/}
            </div>

        </div>
    )
}

export default SearchPage
