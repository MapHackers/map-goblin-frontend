import React from 'react';
import CommonLayout from "../components/Layout/CommonLayout";
import ProfileContainer from "../components/Profile/ProfileContainer";
import MypageTabContainer from "../components/MypageTab/MypageTabContainer";
import { Row, Col } from 'antd';
import {useSelector} from "react-redux";
import axios from "axios";

const MyPage = () => {

    const userData = useSelector(state => state.user.userData)
    let userName = ''
    let userEmail = ''
    if (userData !== undefined){
        userName = userData.data.name
        userEmail = userData.data.email
    }
    let description = '상도동 살아요~'

    return (
        <CommonLayout>
            <div id="testlayout" style={{margin: "50px 0px 20px 10px", height: "100%"}} >
                <Row>
                    <Col flex="250px" style={{marginRight: "50px", height: "100%"}}>
                        <ProfileContainer name={userName} email={userEmail} description={description} style={{height: "100%"}}/>
                    </Col>
                    <Col flex="auto">
                        <MypageTabContainer name={userName}/>
                    </Col>
                </Row>
            </div>
        </CommonLayout>
    );
};

export default MyPage;