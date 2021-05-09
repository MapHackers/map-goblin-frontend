import React, {useEffect, useState} from 'react';
import { Divider, Space, Tabs, List } from 'antd';
import { BookOutlined, EnvironmentOutlined, MessageOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import {useSelector, connect, useDispatch} from "react-redux";

import Card from "../CardView/CardView";

import { Doughnut } from "react-chartjs-2";
import Avatar from "antd/es/avatar/avatar";
import Api from "../../util/Api";
import {withRouter} from "react-router-dom";
import SlideButton from "../NetflixSlider/SlideButton";

const { TabPane } = Tabs;

const typemap = {
    'LIKE' : '를 좋아합니다.',
    'CLONE' : '를 클론하였습니다.',
    'REQUEST' : '에 요청을 남겼습니다.',
    'ISSUE' : '에 이슈를 남겼습니다.'
}


const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);


const MypageTabContainer = (props) => {
    let repoDatas = []
    //const [alarmData, setAlarmData] = useState()
    const [repoData, setRepoData] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const alarms = useSelector(state => state.alarm.userAlarm.data)

    const chart = {}

    const chartData = {
        labels : ["1번 더미 데이터","2번 더미 데이터","3번 더미 데이터"],
        datasets : [
            {
                data: [4,2,1],
                label:'좋아요 수',
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }
        ]
    }
    useEffect(()=>{
        Api.get(`/${props.userId}/repositories`)
            .then(response=>{
                repoDatas = response.data.data
                console.log("GET REPO//////////////", repoDatas)
                setRepoData(response.data.data)
                setIsLoading(false)
            })
            .catch(error=>error)

    },[])


    return (
        <div style={{ width: '60vw'}}>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><BookOutlined/>Overview</span>} key="1">
                    <div style={{marginBottom:"20px", textAlign: "left", fontSize: "20px", fontWeight: "600"}}>내가 좋아요한 지도들</div>
                    <Space size="large" style={{width: "100%"}}>
                        {repoData.map(card => (
                            <Card title={card.name} hashtags={card.description} like={card.likeCount} dislike={card.dislikeCount} thumbnail={card.thumbnail} key={card.id} ownerId={props.userId}/>
                        ))}
                    </Space>
                    <Divider/>
                    <div style={{marginBottom:"20px", textAlign: "left", fontSize: "20px", fontWeight: "600"}}>{props.name}님의 지도별 좋아요 수</div>
                    <Doughnut data={chartData}/>
                </TabPane>
                <TabPane tab={<span><EnvironmentOutlined/>Maps</span>} key="2">
                    <div style={{marginBottom:"20px", textAlign: "left", fontSize: "20px", fontWeight: "600"}}>{props.name}님의 지도 목록</div>
                    <div className="demo-infinite-container" style={{height: "700px", overflow: "auto"}}>
                        <List
                            itemLayout="horizontal"
                            size="large"
                            layout="vertical"
                            dataSource={repoData}
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 7,
                            }}
                            renderItem={item => (
                                <List.Item
                                    actions={[

                                        <IconText icon={LikeOutlined} text={item.likeCount} key="list-vertical-star-o" />,
                                        <IconText icon={DislikeOutlined} text={item.dislikeCount} key="list-vertical-like-o" />,
                                        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                        }
                                        title={<a href={`/${props.userId}/repositories/${item.name}`}>{item.name}</a>}
                                        description={item.description}
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
                                        title={<a href={`/${props.userId}/repositories/${alarm.spaceName}`}>{alarm.srcMemberName}님이 회원님의 지도{typemap[alarm.alarmType]}</a>}
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

export default withRouter(MypageTabContainer);