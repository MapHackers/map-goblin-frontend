import React from 'react'
import NavBar from '../components/NavigationBar/NavigationBar'
import qs from 'qs'
import SearchLists from '../components/SearchList/SearchList'
import {Image, List, Space, Tabs} from 'antd';
import {UserOutlined, EnvironmentOutlined, LikeOutlined, DislikeOutlined, DownloadOutlined} from "@ant-design/icons";
import {useSelector} from "react-redux";
import Api from "../util/Api";

const { TabPane } = Tabs;

const Lists = [
    {
        title: "알바생이 친절한 편의점",
        hashtag: "#동작구 #편의점",
        likes: 123,
        clones: 23,
        image: '/2.png'
    },
    {
        title: "내가 직접 가본 친절하게 상담해주는 병원",
        hashtag: "#친절 #의사 #병원리스트",
        likes: 441,
        clones: 101,
        image: '/1.png'
    }

]

const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

function SearchPage({ location }) {

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    const searchValue = `${query.q}`

    const maps = useSelector(state => state.search.searchRepo)
    const users = useSelector(state => state.search.searchUser)


    return (
        <div>
            <NavBar />
            <div style={{marginLeft: '100px'}}>
                <div style={{ marginTop: '20px', marginRight: 'auto'}}>
                    <h1> "{searchValue}" 키워드에 대한 검색 결과입니다.</h1>
                </div>
                <Tabs defaultActiveKey="1">
                    <TabPane tab={<span><EnvironmentOutlined /> 지도</span>} key="1">
                        <div className="demo-infinite-container" style={{height: "700px", overflow: "auto"}}>
                            <List
                                itemLayout="horizontal"
                                size="large"
                                layout="vertical"
                                dataSource={maps}
                                pagination={{
                                    onChange: page => {
                                    },
                                    pageSize: 7,
                                }}
                                renderItem={item => (
                                    <List.Item
                                        actions={[

                                            <IconText icon={LikeOutlined} text={item.likeCount} key="list-vertical-star-o" />,
                                            <IconText icon={DislikeOutlined} text={item.dislikeCount} key="list-vertical-like-o" />,
                                            <IconText icon={DownloadOutlined} text="2" key="list-vertical-message" />,
                                        ]}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Image
                                                    width= '2rem'
                                                    height= '2rem'
                                                    alt="example"
                                                    src={item.thumbnail ? Api.defaults.baseURL + '/files/' + item.thumbnail : "no-image.svg"}
                                                    style={{borderRadius:"10%"}}
                                                    preview={false}
                                                />
                                            }
                                            title={
                                                //item.name
                                                <a href={`/${item.ownerId}/repositories/${item.name}`}
                                                   style={{fontSize:'16px'}}>
                                                    {item.name}
                                                </a>
                                            }
                                            description={item.description}
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </TabPane>
                    <TabPane tab={<span><UserOutlined />유저</span>} key="2">
                        유저 검색
                    </TabPane>
                </Tabs>
                {/*<SearchLists Lists={Lists} />*/}
            </div>

        </div>
    )
}

export default SearchPage
