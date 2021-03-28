import React from 'react'

import { Tabs } from 'antd';
import OverviewTap from './OverviewTap'
import MapsTap from './MapsTap'

const { TabPane } = Tabs;

function RepositoryTaps() {
    // 70vw
    return (
        <div style={{ width: '640px', height: '720px', border: '1px solid black', margin: '0 auto' }}>
            <div style={{ paddingLeft: '20px', paddingTop: '10px', paddingRight: '20px' }}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Overview" key="1">
                        <OverviewTap />
                    </TabPane>
                    <TabPane tab="Maps" key="2">
                        <MapsTap />
                    </TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default RepositoryTaps
