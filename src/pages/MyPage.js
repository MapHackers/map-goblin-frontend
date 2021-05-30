import React, {useEffect, useState} from 'react';
import CommonLayout from "../components/Layout/CommonLayout";
import ProfileContainer from "../components/Profile/ProfileContainer";
import MypageTabContainer from "../components/MypageTab/MypageTabContainer";
import { Row, Col } from 'antd';
import {useSelector, connect, useDispatch} from "react-redux";
import Api from "../util/Api";
import {loadAlarm} from "../_actions/alram_action";


const MyPage = ({userId, userName, userEmail, userDescription, userAlarm}) => {

    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true);

    const user = useSelector(state => state.user);


    useEffect(() => {
        dispatch(loadAlarm(user.userId))
            .then(response => {
                setIsLoading(false);
            })
    }, [])


    return (
        <>
            {isLoading ? null :
                <CommonLayout>
                    <div id="testlayout" style={{margin: "50px 0px 20px 10px", height: "100%"}} >
                        <Row>
                            <Col flex="250px" style={{marginLeft: "100px", marginRight: "50px", height: "100%"}}>
                                <ProfileContainer user={user} style={{height: "100%"}}/>
                            </Col>
                            <Col flex="auto">
                                <MypageTabContainer name={user.userName} userId={user.userId}/>
                            </Col>
                        </Row>
                    </div>
                </CommonLayout>}
        </>

    );
};

export default MyPage;