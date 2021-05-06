import React from 'react';
import { Divider, Space, Tabs } from 'antd';
import CardViewContainer from "../CardView/CardViewContainer";
import { BookOutlined, EnvironmentOutlined, MessageOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { List } from 'antd';

import InfiniteScroll from 'react-infinite-scroller';
import Card from "../CardView/CardView";

import { Doughnut } from "react-chartjs-2";
import Avatar from "antd/es/avatar/avatar";

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
        date : "Apr 12, 2021",
        like: 42,
        dislike: 291,
        image: '/2.png'
    },
    {
        id : "1",
        title : "붕세권",
        hashtag : "#붕어빵",
        date : "Mar 15, 2021",
        like: 30,
        dislike: 4,
        image: "/3.png"
    },
    {
        id : "2",
        title : "알바생이 친절한 편의점",
        hashtag : "#편의점 #친절 #알바생",
        date : "Mar 1, 2021",
        like: 30,
        dislike: 4,
        image: "/3.png"
    },
    {
        id : "3",
        title : "공부하기 좋은 카페",
        hashtag : "#카페 #조용한 #공부",
        date : "Feb 28, 2021",
        like: 102,
        dislike: 12,
        image: '/1.png'
    },
    {
        id : "4",
        title : "콘센트 많은 카페",
        hashtag : "#전기도둑 #충전",
        date : "Jan 21, 2021",
        like: 30,
        dislike: 4,
        image: "/3.png"
    },
    {
        id : "5",
        title : "초보자를 위한 드라이브 코스",
        hashtag : "#초보운전 #드라이브코스",
        date : "Jan 10, 2021",
        like: 30,
        dislike: 4,
        image: "/3.png"
    },
    {
        id : "0",
        title : "111동작구 꼬북칩 초코맛",
        hashtag : "#동작구 #마트 #편의점",
        date : "Apr 12, 2021",
        like: 30,
        dislike: 4,
        image: "/3.png"
    },
    {
        id : "1",
        title : "111붕세권",
        hashtag : "#붕어빵",
        date : "Mar 15, 2021",
        like: 30,
        dislike: 4,
        image: "/3.png"
    },
    {
        id : "2",
        title : "111알바생이 친절한 편의점",
        hashtag : "#편의점 #친절 #알바생",
        date : "Mar 1, 2021",
        like: 30,
        dislike: 4,
        image: "/3.png"
    },
    {
        id : "3",
        title : "111공부하기 좋은 카페",
        hashtag : "#카페 #조용한 #공부",
        date : "Feb 28, 2021",
        like: 30,
        dislike: 4,
        image: "/3.png"
    },
    {
        id : "4",
        title : "111콘센트 많은 카페",
        hashtag : "#전기도둑 #충전",
        date : "Jan 21, 2021",
        like: 30,
        dislike: 4,
        image: "/3.png"
    },
    {
        id : "5",
        title : "초보자를 위한 드라이브 코스",
        hashtag : "#초보운전 #드라이브코스",
        date : "Jan 10, 2021",
        like: 30,
        dislike: 4,
        image: "/3.png"
    }
]

const alarms = [
    {
        id : 1,
        user : 'dydfuf',
        type : 'like'
    },
    {
        id : 2,
        user : 'oxhe2038',
        type : 'clone'
    },
    {
        id : 3,
        user : 'unknown1',
        type : 'issue'
    },
    {
        id : 4,
        user : 'ghdtjq',
        type : 'request'
    },
    {
        id : 5,
        user : 'yongyeol',
        type : 'like'
    }
]

const typemap = {
    'like' : '를 좋아합니다.',
    'clone' : '를 클론하였습니다.',
    'request' : '에 요청을 남겼습니다.',
    'issue' : '에 이슈를 남겼습니다.'
}


const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const MypageTabContainer = (props) => {
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

    return (
        <div>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><BookOutlined/>Overview</span>} key="1">
                    <div style={{marginBottom:"20px", textAlign: "left", fontSize: "20px", fontWeight: "600"}}>내가 좋아요한 지도들</div>
                    <Space size="large" style={{width: "100%"}}>
                        {ThumbCards.map(card => (
                            <Card title={card.title} hastags={card.hashtag} like={card.like} dislike={card.dislike} thumbnail={card.image} key={card.id} />
                        ))}
                    </Space>
                    <Divider/>
                    <div style={{marginBottom:"20px", textAlign: "left", fontSize: "20px", fontWeight: "600"}}>{props.name}의 통계자료</div>
                    <Doughnut data={chartData}/>
                </TabPane>
                <TabPane tab={<span><EnvironmentOutlined/>Maps</span>} key="2">
                    <div style={{marginBottom:"20px", textAlign: "left", fontSize: "20px", fontWeight: "600"}}>{props.name}님의 지도 목록</div>
                    <div className="demo-infinite-container" style={{height: "700px", overflow: "auto"}}>
                        <List
                            itemLayout="horizontal"
                            size="large"
                            layout="vertical"
                            dataSource={data}
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 6,
                            }}
                            renderItem={item => (
                                <List.Item
                                    actions={[
                                        <div>{item.date}</div>,
                                        <IconText icon={LikeOutlined} text={item.like} key="list-vertical-star-o" />,
                                        <IconText icon={DislikeOutlined} text={item.dislike} key="list-vertical-like-o" />,
                                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }
                                        title={<a href="https://ant.design">{item.title}</a>}
                                        description={item.hashtag}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </TabPane>
                <TabPane tab={<span><MessageOutlined/>Records</span>} key="3">
                    <div style={{marginBottom:"20px", textAlign: "left", fontSize: "20px", fontWeight: "600"}}>알림 목록</div>
                    <div className="demo-infinite-container" style={{height: "700px", overflow: "auto"}}>
                        <List
                            itemlayout="horizontal"
                            size="small"
                            layout="vertical"
                            dataSource={alarms}
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 8,
                            }}
                            renderItem={alarm => (
                                <List.Item>
                                    <List.Item.Meta
                                        title={<a href={"https://ant.design"}>{alarm.user}님이 회원님 지도{typemap[alarm.type]}</a>}
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
};

export default MypageTabContainer;