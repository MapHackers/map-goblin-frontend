import React from 'react';
import styled from "styled-components";

import { FileTextOutlined, EnvironmentOutlined, PullRequestOutlined, ExclamationCircleOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

import CommonLayout from "../components/Layout/CommonLayout";
import MapContainer from "../components/Map/MapContainer";

import { Breadcrumb, Tabs, Avatar, Table, Tag, Row, Col, Divider } from 'antd';

const { TabPane } = Tabs

const columns = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: title => <a>{title}</a>,
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

            if (tag === 'question') {
                color = 'geekblue'
            }else if (tag === 'issue') {
                color = 'volcano'
            }else if (tag === 'ok') {
                color = 'green'
            }else if(tag === 'denied'){
                color = 'red'
            }else if(tag === 'request'){
                color = 'processing'
            }else if(tag === 'merge'){
                color = 'gold'
            }else if(tag === 'duplicate'){
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

const issueWaitingData = [
    {
        key: '1',
        title: '코로나때문에 통행이 막힌 포탈은 반영이되어있나요?',
        user: 'doili0552',
        tags: ['question'],
        date: '2021-04-11 12:43:52',
    },
    {
        key: '2',
        title: '제2 공학관 6층 피씨실 막혔습니다..',
        user: '88dydfuf',
        tags: ['issue'],
        date: '2021-04-10 09:33:27',
    },
    {
        key: '3',
        title: '학교 310관 막혔어요!',
        user: 'ghdtjq2038',
        tags: ['issue'],
        date: '2021-04-9 11:10:20',
    },
];

const issueCheckedData = [
    {
        key: '1',
        title: '학식 위치 추가해주세요!',
        user: 'doili0552',
        tags: ['ok'],
        date: '2021-04-11 12:43:52',
    },
    {
        key: '2',
        title: '123455관 추가해주실 수 있나요?',
        user: '88dydfuf',
        tags: ['denied'],
        date: '2021-04-10 09:33:27',
    }
];

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
    margin : 20px 200px 20px 200px;
`;

const Info = styled.div`
    
`;

const RepositoryPage = (props) => {

    return (
        <CommonLayout>
            <Breadcrumb style={{fontSize:'20px', textAlign:'left', padding:'30px 0px 20px 30px'}}>
                <Breadcrumb.Item>
                    <a href="/repository">사용자 아이디</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="/repository">지도 이름</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Tabs defaultActiveKey="1" size="large" style={{padding: '0px 30px 10px 30px'}}>
                <TabPane tab={<span><FileTextOutlined />Description</span>} key="1">
                    <Description>
                        <Row>
                            <Col flex="980px">
                                <Row style={{alignContent:"center", justifyContent:"center"}}>
                                    <img src="/cau.jpg"/>
                                </Row>
                                <Row>
                                    <h1>중앙대학교 지도!</h1>
                                </Row>
                            </Col>
                            <Col flex="auto">
                                <Info>
                                    <Divider>Owner의 한마디</Divider>
                                    <p>
                                        우리 함께 중앙대학교 지도를 만들어봐요!
                                    </p>
                                    <Divider>Owner</Divider>
                                    <div>
                                        <h3 style={{textAlign:"left"}}>
                                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                                            &nbsp;ghdtjq2038
                                        </h3>
                                        <h3 style={{textAlign:"left"}}>
                                            <Avatar style={{ backgroundColor: 'blue' }} icon={<UserOutlined />} />
                                            &nbsp;doili0552
                                        </h3>
                                        <h3 style={{textAlign:"left"}}>
                                            <Avatar style={{ backgroundColor: 'orange' }} icon={<UserOutlined />} />
                                            &nbsp;88dydfuf
                                        </h3>
                                    </div>
                                </Info>
                            </Col>
                        </Row>
                    </Description>
                </TabPane>
                <TabPane tab={<span><EnvironmentOutlined />Map</span>} key="2">
                    <MapContainer/>
                </TabPane>
                <TabPane tab={<span><ExclamationCircleOutlined />Issues</span>} key="3">
                    <Tabs defaultActiveKey="1" size="large" style={{padding: '0px 30px 10px 30px', borderStyle: 'solid', borderWidth: 'thin', borderRadius: '20px'}}>
                        <TabPane tab={<span>3 Waiting</span>} key="1">
                            <Table
                                columns={columns}
                                pagination={{ position: ['bottomCenter'] }}
                                dataSource={issueWaitingData}
                            />
                        </TabPane>
                        <TabPane tab={<span>2 Checked</span>} key="2">
                            <Table
                                columns={columns}
                                pagination={{ position: ['bottomCenter'] }}
                                dataSource={issueCheckedData}
                            />
                        </TabPane>
                    </Tabs>
                </TabPane>
                <TabPane tab={<span><PullRequestOutlined />Pull requests</span>} key="4">
                    <Tabs defaultActiveKey="1" size="large" style={{padding: '0px 30px 10px 30px', borderStyle: 'solid', borderWidth: 'thin', borderRadius: '20px'}}>
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
                <TabPane tab={<span><SettingOutlined />Settings</span>} key="5">
                    Settings
                </TabPane>
            </Tabs>
        </CommonLayout>
    );
};

export default RepositoryPage;