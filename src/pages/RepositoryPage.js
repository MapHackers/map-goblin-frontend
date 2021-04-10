import React from 'react';

import { Breadcrumb, Tabs } from 'antd';
import { FileTextOutlined, EnvironmentOutlined, PullRequestOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import CommonLayout from "../components/Layout/CommonLayout";
import MapContainer from "../components/Map/MapContainer";

const { TabPane } = Tabs

const RepositoryPage = (props) => {
    return (
        <CommonLayout>
            <Breadcrumb style={{fontSize:'20px', textAlign:'left', padding:'30px 0px 20px 30px'}}>
                <Breadcrumb.Item>
                    <a href="">사용자 아이디</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <a href="">지도 이름</a>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Tabs defaultActiveKey="1" size="large" style={{padding: '0px 30px 10px 30px'}}>
                <TabPane tab={<span><FileTextOutlined />README</span>} key="1">
                    README
                </TabPane>
                <TabPane tab={<span><EnvironmentOutlined />Map</span>} key="2">
                    <MapContainer/>
                </TabPane>
                <TabPane tab={<span><ExclamationCircleOutlined />Issues</span>} key="3">
                    Issues
                </TabPane>
                <TabPane tab={<span><PullRequestOutlined />Pull requests</span>} key="4">
                    Pull requests
                </TabPane>
            </Tabs>
        </CommonLayout>
    );
};

export default RepositoryPage;