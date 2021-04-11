import React from 'react';
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import styled from "styled-components";

const { Meta } = Card;

const Doilimg = styled.img`
    border-radius: 30% !important;
    overflow: hidden;
    width: 200px;
    height: 200px;
    margin: 25px auto;
`;


const ProfileContainer = (props) => {
    return (
        <Card
            style={{ width: "100%"}}
            cover={
                <Doilimg alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
            }
            actions={[
                //<SettingOutlined key="setting" />,
                <span><EditOutlined key="edit" /> edit profile</span>,
                //<EllipsisOutlined key="ellipsis" />,
            ]}
        >
            <Meta
                title={<h2>{props.name}</h2>}
                description={props.email}
            />
            <Meta
                style={{marginTop:"30px"}}
                title={props.description}
            />
        </Card>
    );
};

export default ProfileContainer;