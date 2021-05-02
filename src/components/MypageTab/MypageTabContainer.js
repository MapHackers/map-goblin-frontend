import React from 'react';
import {Divider, Space, Tabs} from 'antd';
import CardViewContainer from "../CardView/CardViewContainer";
import {BookOutlined, EnvironmentOutlined} from '@ant-design/icons';
import { List } from 'antd';

import InfiniteScroll from 'react-infinite-scroller';
import Card from "../CardView/CardView";

import { Doughnut } from "react-chartjs-2";

const { TabPane } = Tabs;

const ThumbCards = [
    {
        id: 1,
        title: "도일이의 드라이브 코스",
        hashtag: "#서울근교 #드라이브 코스",
        like: 30,
        dislike: 4,
        image: "/3.png"
    },
    {
        id: 2,
        title: "노트북해도 눈치X 카페",
        hashtag: "#소음환영 #카페",
        like: 102,
        dislike: 12,
        image: '/1.png'
    },
    {
        id: 3,
        title: "꼬북칩 초코맛 보유 마트",
        hashtag: "#꼬북칩초코 #마트",
        like: 42,
        dislike: 291,
        image: '/2.png'
    }
]

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

const chartData = {
    labels : ['도일이의 드라이브 코스', '노트북해도 눈치X 카페', '꼬북칩 초코맛 보유 마트'],
    datasets : [
        {
            data: [12, 19, 3],
            label:'clone 수',
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56'
            ]
        }
    ]
}

const MypageTabContainer = () => {
    return (
        <div style={{ width: '75vw'}}>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><BookOutlined/>Overview</span>} key="1">
                    <div style={{marginBottom:"20px", textAlign: "left", fontSize: "20px", fontWeight: "600"}}>내가 좋아요한 지도들</div>
                    <Space size="large" style={{width: "100%"}}>
                        {ThumbCards.map(card => (
                            <Card title={card.title} hastags={card.hashtag} like={card.like} dislike={card.dislike} thumbnail={card.image} key={card.id} />
                        ))}
                    </Space>
                    <Divider/>
                    <div style={{marginBottom:"20px", textAlign: "left", fontSize: "20px", fontWeight: "600"}}>통계 자료</div>
                    <Doughnut data={chartData}/>
                </TabPane>
                <TabPane tab={<span><EnvironmentOutlined/>Maps</span>} key="2">
                    <div className="demo-infinite-container" style={{height: "700px", overflow: "auto"}}>
                        <InfiniteScroll
                            initialLoad={false}
                            pageStart={0}
                            hasMore={true}
                            loadMore={()=>{}}
                            useWindow={false}
                        >
                            <List
                                dataSource={data}
                                renderItem={item => (
                                    <List.Item key={item.id}>
                                        <List.Item.Meta
                                            title={<div style={{alignItems: "flex-start", float: "left"}}>{item.title}</div>}
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