import React, { useEffect, useState } from 'react';
import { Divider, Space, Tabs, List, Row, Col, Image, Empty } from 'antd';
import {
    BookOutlined,
    EnvironmentOutlined,
    MessageOutlined,
    DownloadOutlined,
    LikeOutlined,
    DislikeOutlined
} from '@ant-design/icons';
import {useSelector} from "react-redux";

import Card from "../CardView/CardView";

import {Doughnut} from "react-chartjs-2";
import Api from "../../util/Api";
import {withRouter} from "react-router-dom";

const { TabPane } = Tabs;

const typemap = {
    'LIKE': '를 좋아합니다.',
    'CLONE': '를 가져갔습니다.',
    'REQUEST': '에 변경 요청을 남겼습니다.',
    'ISSUE': '를 지적했습니다.'
}


const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);


function alarmCalculate(date) {
    const cur_date = new Date();
    const time_val = cur_date.getTime() - Date.parse(date)
    const min = 60000
    const hour = 3600000
    const day = 86400000
    const week = day * 7
    const month = day * 30
    const year = day * 365

    if (time_val < min) return '방금 전'
    else if (time_val < hour) return Math.round(time_val / min) + '분 전'
    else if (time_val < day) return Math.round(time_val / hour) + '시간 전'
    else if (time_val < week) return Math.round(time_val / day) + '일 전'
    else if (time_val < month) return Math.round(time_val / week) + '주 전'
    else if (time_val < year) return Math.round(time_val / month) + '개월 전'
    else return Math.round(time_val / year) + '년 전'
}


const MypageTabContainer = (props) => {
    const userInfo = useSelector(state => state.userInfo)
    const [isOwner, setIsOwner] = useState(false)

    let repoOrderByLike = []
    let repoOrderByVisit = []
    let tmpLiLabels = []
    let tmpViLabels = []
    let tmpLikes = []
    let tmpVisits = []

    const [mapList, setMapList] = useState([])
    const [liLabels, setLiLabels] = useState([])
    const [viLabels, setViLabels] = useState([])
    const [likeCounts, setLikeCounts] = useState([])
    const [visitCounts, setVisitCounts] = useState([])

    const alarms = useSelector(state => state.alarm.userAlarm.data)

    const cloneObj = obj => JSON.parse(JSON.stringify(obj))

    let likeChartData = {
        labels: liLabels,
        datasets: [
            {
                data: likeCounts,
                label: '좋아요 수',
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

    let visitChartData = {
        labels: viLabels,
        datasets: [
            {
                data: visitCounts,
                label: '조회 수',
                backgroundColor: [
                    '#FFCE56',
                    '#81c784',
                    '#FFA000',
                    '#ba68c8',
                    '#AEA1FF',
                    // '#CDDC39',
                    // '#fad0c3',
                    // '#bed3f3',
                    // '#FF6384',
                    // '#36A2EB',
                ]
            }
        ]
    }

    useEffect(() => {
        setMapList(userInfo?.mapList)
        if (props.userId === userInfo.userId) {
            setIsOwner(true)
        }
        repoOrderByLike = cloneObj(userInfo.mapList)
        repoOrderByVisit = cloneObj(userInfo.mapList)
        repoOrderByLike.sort(function (a, b) {
            return b.likeCount - a.likeCount
        })
        repoOrderByLike.map(repo => {
            tmpLiLabels.push(repo.name);
            tmpLikes.push(repo.likeCount);
        })

        repoOrderByVisit.sort(function (a, b) {
            return b.visitCount - a.visitCount
        })
        repoOrderByVisit.map(repo => {
            tmpViLabels.push(repo.name)
            tmpVisits.push(repo.visitCount)
        })

        setLiLabels(tmpLiLabels.slice(0, 5))
        setViLabels(tmpViLabels.slice(0, 5))
        setLikeCounts(tmpLikes.slice(0, 5))
        setVisitCounts(tmpVisits.slice(0, 5))

    }, [])


    return (
        <div style={{ width: '60vw' }}>
            <Tabs defaultActiveKey="1">
                <TabPane tab={<span><BookOutlined />Overview</span>} key="1">
                    <div style={{ marginBottom: "20px", textAlign: "left", fontSize: "20px", fontWeight: "600" }}>{userInfo.userName}님의 지도
                        목록
                    </div>
                    {mapList.length !== 0 ?
                    <Space size="large" style={{ width: "100%" }}>
                        {mapList?.map(card => (
                            <Card card={card} />
                        ))}
                    </Space>:
                        <Empty/>
                    }

                    <Divider />
                    <Row>
                        {likeCounts.length !== 0 &&
                            <Col span={12}>
                                <div style={{
                                    marginBottom: "20px",
                                    textAlign: "left",
                                    fontSize: "20px",
                                    fontWeight: "600"
                                }}>{userInfo.userName}님의 지도별 좋아요 수 TOP 5
                                </div>
                                <Doughnut data={likeChartData} />
                            </Col>
                        }
                        {visitCounts.length !== 0 &&
                            <Col span={12}>
                                <div style={{
                                    marginBottom: "20px",
                                    textAlign: "left",
                                    fontSize: "20px",
                                    fontWeight: "600"
                                }}>{userInfo.userName}님의 지도별 조회 수 TOP 5
                                </div>
                                <Doughnut data={visitChartData} />
                            </Col>
                        }
                    </Row>
                </TabPane>
                <TabPane tab={<span><EnvironmentOutlined />Maps</span>} key="2">
                    <div style={{
                        marginBottom: "20px",
                        textAlign: "left",
                        fontSize: "20px",
                        fontWeight: "600"
                    }}>{userInfo.userName}님의 지도 목록
                    </div>
                    <div className="demo-infinite-container" style={{ height: "700px", overflow: "auto" }}>
                        <List
                            itemLayout="horizontal"
                            size="large"
                            layout="vertical"
                            dataSource={mapList}
                            pagination={{
                                onChange: page => {
                                },
                                pageSize: 7,
                            }}
                            renderItem={item => (
                                <List.Item
                                    actions={[

                                        <IconText icon={LikeOutlined} text={item.likeCount}
                                            key="list-vertical-star-o" />,
                                        <IconText icon={DislikeOutlined} text={item.dislikeCount}
                                            key="list-vertical-like-o" />,
                                        <IconText icon={DownloadOutlined} text="2" key="list-vertical-message" />,
                                    ]}
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Image
                                                width='2rem'
                                                height='2rem'
                                                alt="example"
                                                src={item.thumbnail ? Api.defaults.baseURL + '/files/' + item.thumbnail : "no-image3.png"}
                                                style={{ borderRadius: "10%" }}
                                                preview={false}
                                            />
                                        }
                                        title={
                                            <a href={`/${userInfo.userId}/repositories/${item.name}`}
                                                style={{ fontSize: '16px' }}>
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
                {
                    isOwner &&
                    <TabPane tab={<span><MessageOutlined />Records</span>} key="3">
                        <div style={{
                            marginBottom: "20px",
                            textAlign: "left",
                            fontSize: "20px",
                            fontWeight: "600"
                        }}>{userInfo.userName}님의 알림 목록
                        </div>
                        <div className="demo-infinite-container" style={{ height: "700px", overflow: "auto" }}>
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
                                        actions={[<div key="list-vertical-like-o">{alarmCalculate(alarm.date)}</div>]}
                                    >
                                        <List.Item.Meta
                                            avatar={
                                                <Image
                                                    width='2rem'
                                                    height='2rem'
                                                    alt="example"
                                                    src={Api.defaults.baseURL + '/files/' + alarm.thumbnail}
                                                    style={{ borderRadius: "10%" }}
                                                    fallback="no-image3.png"
                                                    preview={false}
                                                />
                                            }
                                            title={alarm.read ?
                                                <a href={`/${props.userId}/repositories/${alarm.spaceName}`}
                                                    style={{ marginLeft: "10px", fontSize: "14px" }}>
                                                    <text style={{ fontWeight: "bold" }}>{alarm.srcMemberName}</text>
                                                    님이 회원님의 지도{typemap[alarm.alarmType]}
                                                </a> :
                                                <a href={`/${props.userId}/repositories/${alarm.spaceName}`}
                                                    style={{ marginLeft: "10px", fontSize: "14px", color: '#36A2EB' }}>
                                                    <text style={{ fontWeight: "bold" }}>{alarm.srcMemberName}</text>
                                                    님이 회원님의 지도{typemap[alarm.alarmType]}
                                                </a>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </div>
                    </TabPane>
                }

            </Tabs>
        </div>
    );
};

export default withRouter(MypageTabContainer);