import React from 'react';
import { Card, Avatar } from 'antd';
import { LikeOutlined, DislikeOutlined, DownloadOutlined } from '@ant-design/icons';

const { Meta } = Card;

const CardViewContainer = () => {
    return (
        <Card
            style={{width: "100%"}}
            cover={
                <img
                    alt="example"
                    src="/2.png"
                />
            }
            actions={[
                <LikeOutlined key="setting"/>,
                <DislikeOutlined key="edit"/>,
                <DownloadOutlined key="ellipsis"/>
            ]}
        >
            <Meta
                title="꼬북칩 파는곳!!"
                description="#꼬북칩 #동네마"
            />
        </Card>
    );
};

export default CardViewContainer;