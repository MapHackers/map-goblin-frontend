import React from 'react';
import CommonLayout from "../components/Layout/CommonLayout";
import ProfileContainer from "../components/Profile/ProfileContainer";
import MypageTabContainer from "../components/MypageTab/MypageTabContainer";
import { Row, Col } from 'antd';

const MyPage = () => {
    return (
        <CommonLayout>
            <div id="testlayout" style={{margin: "50px 150px 20px 150px", height: "100%"}} >
                <Row>
                    <Col flex="250px" style={{marginRight: "50px", height: "100%"}}>
                        <ProfileContainer name="doyle" email="doili@naver.com" description="상도동 진지 탐험러" style={{height: "100%"}}/>
                    </Col>
                    <Col flex="auto">
                        <MypageTabContainer/>
                    </Col>
                </Row>
            </div>
        </CommonLayout>
    );
};

export default MyPage;