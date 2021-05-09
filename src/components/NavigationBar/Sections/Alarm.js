import React, {useEffect, useState} from 'react'
import { BellOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { Badge, Menu, Dropdown, Divider } from 'antd'
import { connect } from 'react-redux'

import Api from "../../../util/Api";

function setRead(alarmData){
    alarmData.read = true
}

const mapStateToProps = state => ({

    userAlarm: state.user.userAlarm
})

function Alarm({userAlarm}, props) {

    // const alarmDatas = [
    //     {
    //         id : 1,
    //         user : 'dydfuf',
    //         type : 'like',
    //         read : true
    //     },
    //     {
    //         id : 2,
    //         user : 'oxhe2038',
    //         type : 'clone',
    //         read : true
    //     },
    //     {
    //         id : 3,
    //         user : 'unknown1',
    //         type : 'issue',
    //         read : true
    //     },
    //     {
    //         id : 4,
    //         user : 'ghdtjq',
    //         type : 'request',
    //         read : false
    //     },
    //     {
    //         id : 5,
    //         user : 'yongyeol',
    //         type : 'like',
    //         read : false
    //     }
    // ]

    console.log(userAlarm)

    const [unreadAlarmDatas, setUnreadAlarmDatas] = useState([userAlarm.data])
    const tmpData = []
    console.log("---------------------------",unreadAlarmDatas)

    // useEffect(() => {
    //     // console.log("Alarm.js ==============================",userAlarm.data)
    //     // if(userAlarm !== undefined){
    //     //     userAlarm.data.reverse().map(alarm => {
    //     //         if (alarm.read === false){
    //     //             tmpData.push(alarm)
    //     //         }
    //     //     })
    //     //     setUnreadAlarmDatas(tmpData)
    //     // }
    //     if(userAlarm.data !== undefined){
    //         userAlarm.data.map(alarm => {
    //             if(alarm.read === false){
    //                 tmpData.push(alarm)
    //             }
    //         })
    //         setUnreadAlarmDatas(tmpData)
    //     }
    //
    //
    // }, [props])

    const typemap = {
        'LIKE' : '를 좋아합니다.',
        'CLONE' : '를 클론하였습니다.',
        'REQUEST' : '에 요청을 남겼습니다.',
        'ISSUE' : '에 이슈를 남겼습니다.'
    }
    //console.log("alarma!!!!!",userAlarm.data)
    // userAlarm.data.map(alarm => {
    //     if(alarm.read === false){
    //         tmpData.push(alarm)
    //     }
    // })

    const AlarmList = (
        <Menu>
            {
                [...userAlarm.data].map((alarm, idx) => (
                    <Menu.Item key={idx} onClick={() => {}}>
                        <div>{alarm.dstMemberName}님이 회원님의 지도{typemap[alarm.alarmType]}</div>
                    </Menu.Item>
                ))
            }
        </Menu>
    )


    return (

        <AlarmContainer>
            <Badge count={userAlarm.data.length} size="small" >
                <Dropdown overlay={AlarmList} trigger={['click']} onVisibleChange={() => { console.log(userAlarm.data)}} >
                    <BellOutlined style={{ fontSize: '1.5rem', marginTop: '0.1875rem' }} />
                </Dropdown>
            </Badge>
        </AlarmContainer >

    )
}

export default connect(mapStateToProps)(Alarm)

const AlarmContainer = styled.div`
    border-radius: 1.1rem;
    background-color: white;
    width: 2.2rem;
    height: 2.2rem;
    margin-top: 1rem;
    text-align: center;
    vertical-align: middle;
    margin-right: 1.5rem;
`