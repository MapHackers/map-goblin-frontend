import React, {useEffect, useState} from 'react';
import CommonLayout from "../components/Layout/CommonLayout";
import ProfileContainer from "../components/Profile/ProfileContainer";
import MypageTabContainer from "../components/MypageTab/MypageTabContainer";
import { Row, Col } from 'antd';
import {useSelector, connect, useDispatch} from "react-redux";
import Api from "../util/Api";
import {loadAlarm} from "../_actions/alram_action";

const mapStateToProps = state => ({
    userId: state.user.userId,
    userName: state.user.userName,
    userEmail: state.user.userEmail,
    userDescription: state.user.userDescription,
    userAlarm: state.user.userAlarm
})

const MyPage = ({userId, userName, userEmail, userDescription, userAlarm}) => {
    //console.log("mypage props: ", props)
    // const userData = useSelector(state => state.user.userData)
    // let name = ''
    // let email = ''
    // let userId = ''
    // if (userData !== undefined){
    //     name = userData.data.name
    //     email = userData.data.email
    //     userId = userData.data.userId
    // }
    //let description = '상도동 살아요~'

    // const IuserData = props.user.userData.data
    // console.log("IuserData: ", IuserData)
    const dispatch = useDispatch()
    const [alarmData, setalarmData] = useState("")

    // useEffect(()=>{
    //     async function fetch_user_alarm(){
    //         console.log("USERID" , userId)
    //         await Api.get("/"+ userId +"/alarms").then(response => {
    //             console.log("----------------------------------------------")
    //             console.log("MYResponse: ", response.data)
    //             setalarmData(response.data)
    //             console.log("Tab으로 가는지", alarmData)
    //         });
    //         console.log("in mypage", alarmData)
    //         //}
    //     }
    //
    //
    // },[props])

    useEffect(() => {
        dispatch(loadAlarm(userId))
            .then(response => {
                console.log(response)
                console.log("Dispatch===",userAlarm)
            })
    }, [dispatch, userId])

    // let name = userData.data.name
    // let email = userData.data.email
    //let description = '상동'

    return (
        <CommonLayout>
            <div id="testlayout" style={{margin: "50px 0px 20px 10px", height: "100%"}} >
                <Row>
                    <Col flex="250px" style={{marginLeft: "100px", marginRight: "50px", height: "100%"}}>
                        <ProfileContainer name={userName} email={userEmail} description={userDescription} style={{height: "100%"}}/>
                    </Col>
                    <Col flex="auto">
                        <MypageTabContainer name={userName} alarmData={userAlarm}/>
                    </Col>
                </Row>
            </div>
        </CommonLayout>
    );
};

export default connect(mapStateToProps)(MyPage);