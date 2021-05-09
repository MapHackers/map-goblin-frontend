import React, {useEffect, lazy, useState} from 'react'
import Logo from './Sections/Logo'
import ButtonBox from './Sections/ButtonBox'
import SearchBar from './Sections/SearchByRepoName'
// import Alarm from './Sections/Alarm'
import UserIcon from './Sections/UserIcon'
import styled from 'styled-components'
import Api from "../../util/Api";
import {useSelector, connect, useDispatch} from "react-redux";
import {loadAlarm} from "../../_actions/alram_action";

const Alarm = lazy(() => import('./Sections/Alarm'))

const mapStateToProps = state => ({
    userId: state.user.userId,
    userName: state.user.userName,
    userAlarm: state.user.userAlarm
})


function NavigationBar({userId, userName, userAlarm}, props) {

    // let userName = useSelector(state => state.user.userData)
    // let IuserName = undefined
    // if (userName !== undefined){
    //     IuserName = userName.data.userId
    // }

    const [alarmData, setAlarmData] = useState("")
    // let userId = ''
    const dispatch = useDispatch()

    useEffect(() => {
        // console.log("mypage user, name", userId)
        // async function fetch_user_alarm(){
        //     try{
        //         //if (userId !== ''){
        //             await Api.get("/"+ userId +"/alarms").then(response => {
        //                 console.log("----------------------------------------------")
        //                 console.log("NavBar.js responseData", response.data)
        //                 setAlarmData(response.data)
        //                 console.log("NAVBar.js set alarm ",alarmData)
        //             });
        //         //}
        //
        //     } catch (e){
        //         console.log(e)
        //     }
        //     console.log("fetch : ", alarmData)
        // }
        // fetch_user_alarm()

        dispatch(loadAlarm(userId))
            .then(response => {
                console.log(response)
                console.log("NavBar===",userAlarm)
            })
    }, [dispatch, userId])
    return (
        <NavContainer>
            <Logo />
            <ButtonBox />
            <SearchBar />
            <UserIconContainer>
                <Alarm alarmData = {userAlarm}/>
                <UserIcon />
            </UserIconContainer>
        </NavContainer>
    )
}
export default connect(mapStateToProps)(NavigationBar)



const NavContainer = styled.div`
    padding: 0 20px;
    border-bottom: solid 1px #e8e8e8;
    box-shadow: 0 0 30px #f3f1f1;
    display: flex;
    justify-content: space-between;
    align-content: center;
    height: 4rem;
    background: rgba( 160, 208, 253, 0.3 );
`

const UserIconContainer = styled.div`
    display: flex;
`