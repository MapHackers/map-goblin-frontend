import React from 'react';
import {Divider, Space, Tabs} from 'antd';
import CardViewContainer from "../CardView/CardViewContainer";
import {BookOutlined, EnvironmentOutlined} from '@ant-design/icons';
import { List } from 'antd';

import InfiniteScroll from 'react-infinite-scroller';

const { TabPane } = Tabs;

const data = [
    {
        id : "0",
        title : "동작구 꼬북칩 초코맛",
        hashtag : "#동작구 #마트 #편의점",
        date : "Apr 12, 2021"
    },
    {
        id : "1",
        title : "붕세권",
        hashtag : "#붕어빵",
        date : "Mar 15, 2021"
    },
    {
        id : "2",
        title : "알바생이 친절한 편의점",
        hashtag : "#편의점 #친절 #알바생",
        date : "Mar 1, 2021"
    },
    {
        id : "3",
        title : "공부하기 좋은 카페",
        hashtag : "#카페 #조용한 #공부",
        date : "Feb 28, 2021"
    },
    {
        id : "4",
        title : "콘센트 많은 카페",
        hashtag : "#전기도둑 #충전",
        date : "Jan 21, 2021"
    },
    {
        id : "5",
        title : "초보자를 위한 드라이브 코스",
        hashtag : "#초보운전 #드라이브코스",
        date : "Jan 10, 2021"
    }
]

const MypageTabContainer = () => {
    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><BookOutlined/>Overview</span>} key="1">
                    <div style={{marginBottom:"20px", textAlign: "left", fontSize: "20px", fontWeight: "600"}}>내가 좋아요한 지도들</div>
                    <Space size="large" style={{width: "100%"}}>
                        <CardViewContainer/>
                        <CardViewContainer/>
                    </Space>
                    <Divider/>
                    <div style={{marginBottom:"20px", textAlign: "left", fontSize: "20px", fontWeight: "600"}}>통계 자료</div>
                </TabPane>
                <TabPane tab={<span><EnvironmentOutlined/>Maps</span>} key="2">
                    <div className="demo-infinite-container" style={{height: "700px", overflow: "auto"}}>
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            hasMore={true}
                            useWindow={false}
                        >
                            <List
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            title={<h2 style={{alignItems: "flex-start", float: "left"}}>{item.title}</h2>}
                                            description={<div style={{alignItems: "flex-end", clear: "left", float: "left"}}>{item.hashtag}</div>}
                                        />
                                        <List.Item.Meta
                                            style={{alignItems: "flex-end", float: "right"}}
                                            description={item.date}
                                        />
                                    </List.Item>
                                )}
                            >
                            </List>
                        </InfiniteScroll>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default MypageTabContainer;