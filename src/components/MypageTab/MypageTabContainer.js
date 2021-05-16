import React, {useEffect, useState} from 'react';
import {Divider, Space, Tabs, List, Row, Col, Image} from 'antd';
import { BookOutlined, EnvironmentOutlined, MessageOutlined, DownloadOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
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
    'CLONE' : '를 가져갔습니다.',
    'REQUEST' : '에 변경 요청을 남겼습니다.',
    'ISSUE' : '를 지적했습니다.'
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
    const [labels, setLabels] = useState([])
    const [likeCounts, setLikeCounts] = useState([])
    const [dislikeCounts, setDislikeCounts] = useState([])

    const alarms = useSelector(state => state.alarm.userAlarm.data)

    const cloneObj = obj => JSON.parse(JSON.stringify(obj))

    let likeChartData = {
        labels : labels,
        datasets : [
            {
                data: likeCounts,
                label:'좋아요 수',
                backgroundColor: [
                    '#FFCE56',
                    '#81c784',
                    '#FFA000',
                    '#ba68c8',
                    '#AEA1FF',
                    '#CDDC39',
                    '#fad0c3',
                    '#bed3f3',
                    '#FF6384',
                    '#36A2EB',
                ]
            }
        ]
    }

    let dislikeChartData = {
        labels : labels,
        datasets : [
            {
                data: dislikeCounts,
                label:'클론 수',
                backgroundColor: [
                    '#FFCE56',
                    '#81c784',
                    '#FFA000',
                    '#ba68c8',
                    '#AEA1FF',
                    '#CDDC39',
                    '#fad0c3',
                    '#bed3f3',
                    '#FF6384',
                    '#36A2EB',
                ]
            }
        ]
    }

    useEffect(()=>{
        Api.get(`/${props.userId}/repositories`)
            .then(response=>{
                let repoOrderbyLike = []
                let tmpLabels = []
                let tmpLikes = []
                let tmpDislikes = []

                repoDatas = response.data.data
                repoOrderbyLike = cloneObj(repoDatas)

                setRepoData(response.data.data)

                repoOrderbyLike.sort(function(a,b){
                    return b.likeCount - a.likeCount
                })
                repoOrderbyLike.map(repo => {
                    tmpLabels.push(repo.name);
                    tmpLikes.push(repo.likeCount);
                    tmpDislikes.push(repo.dislikeCount);
                })
                setLabels(tmpLabels)
                setLikeCounts(tmpLikes)
                setDislikeCounts(tmpDislikes)
            })
            .catch(error=>error)

    },[])


    return (
        <div style={{ width: '60vw'}}>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><BookOutlined/>Overview</span>} key="1">
                    <div style={{marginBottom:"20px", textAlign: "left", fontSize: "20px", fontWeight: "600"}}>내 지도 목록</div>
                    <Space size="large" style={{width: "100%"}}>
                        {repoData.map(card => (
                            <Card title={card.name} hashtags={card.description} like={card.likeCount} dislike={card.dislikeCount} thumbnail={card.thumbnail} key={card.id} ownerId={props.userId}/>
                        ))}
                    </Space>
                    <Divider/>
                    <Row>
                        <Col span={12}>
                            <div style={{marginBottom:"20px", textAlign: "left", fontSize: "20px", fontWeight: "600"}}>{props.name}님의 지도별 좋아요 수</div>
                            <Doughnut data={likeChartData}/>
                        </Col>
                        <Col span={12}>
                            <div style={{marginBottom:"20px", textAlign: "left", fontSize: "20px", fontWeight: "600"}}>{props.name}님의 지도별 싫어요 수</div>
                            <Doughnut data={dislikeChartData}/>
                        </Col>
                    </Row>

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
                                                src={Api.defaults.baseURL + '/files/' + item.thumbnail}
                                                style={{borderRadius:"10%"}}
                                                fallback="no-image.svg"
                                                preview={false}
                                            />
                                        }
                                        title={
                                            <a href={`/${props.userId}/repositories/${item.name}`}
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
                <TabPane tab={<span><MessageOutlined/>Records</span>} key="3">
                    <div style={{marginBottom:"20px", textAlign: "left", fontSize: "20px", fontWeight: "600"}}>{props.name}님의 알림 목록</div>
                    <div className="demo-infinite-container" style={{height: "700px", overflow: "auto"}}>
                        <List
                            itemlayout="horizontal"
                            size="medium"
                            layout="vertical"
                            dataSource={alarms}
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: 8,
                            }}
                            renderItem={alarm => (
                                <List.Item
                                    actions={[<div key="list-vertical-like-o">1day ago</div>]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Image
                                                width= '2rem'
                                                height= '2rem'
                                                alt="example"
                                                src={Api.defaults.baseURL + '/files/' + alarm.thumbnail}
                                                style={{borderRadius:"10%"}}
                                                fallback="no-image.svg"
                                                preview={false}
                                            />
                                        }
                                        title={alarm.read?
                                            <a href={`/${props.userId}/repositories/${alarm.spaceName}`}
                                               style={{marginLeft:"10px", fontSize:"14px"}}>
                                                {alarm.srcMemberName}님이 회원님의 지도{typemap[alarm.alarmType]}
                                            </a>:
                                            <a href={`/${props.userId}/repositories/${alarm.spaceName}`}
                                               style={{marginLeft:"10px", fontSize:"14px", color:'#36A2EB'}}>
                                                {alarm.srcMemberName}님이 회원님의 지도{typemap[alarm.alarmType]}
                                            </a>
                                        }
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