import React, {useEffect, useState} from 'react'
import { BellOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import {Badge, Menu, Dropdown, Divider, Image} from 'antd'
import {connect, useSelector, useDispatch} from 'react-redux'
import {withRouter} from 'react-router-dom'
import Api from "../../../util/Api";
import {deleteAllAlarm} from "../../../_actions/alram_action";

function Alarm(props) {

    const dispatch = useDispatch()

    const alarms = useSelector(state => state.alarm.userAlarm.data)

    const typemap = {
        'LIKE' : '를 좋아합니다.',
        'CLONE' : '를 클론하였습니다.',
        'REQUEST' : '에 요청을 남겼습니다.',
        'ISSUE' : '에 이슈를 남겼습니다.'
    }

    const onClickAlarm = (values) => {
        console.log("values////////////////////")
        console.log(values);

        Api.post("/alarms", {alarmId:values.key}).then(response => {
            console.log(response);
            console.log(props);
        }).catch(error => {
            console.log(error);
        })

    }

    let alarmCount = 0


    const AlarmList = (
        <Menu>
            {
                alarms !== null && alarms.map((alarm, idx) => {
                    if(alarm.read === false){
                        alarmCount += 1;
                        return (
                            <Menu.Item key={alarm.id}
                                       icon={
                                           <Image
                                               width= '1.5rem'
                                               height= '1.5rem'
                                               alt="example"
                                               src={Api.defaults.baseURL + '/files/' + alarm.thumbnail}
                                               style={{borderRadius:"10%"}}
                                               fallback="no-image.svg"
                                               preview={false}
                                           />
                                       }
                                       title={alarm.spaceName}
                                       onClick={onClickAlarm}>
                                <a href={`/${props.user.userId}/repositories/${alarm.spaceName}`} style={{marginLeft:'8px'}}>
                                    {alarm.srcMemberName}님이 회원님의 지도{typemap[alarm.alarmType]}
                                </a>
                            </Menu.Item>
                        )
                    }
                })
            }
            {
                alarmCount !== 0 &&
                    <Menu.Item style={{color:'#999999'}}
                               onClick={() => {
                                   Api.post(`/${props.user.userId}/alarms`)
                                       .then(response => {
                                           dispatch(deleteAllAlarm())
                                       })
                                       .catch(err => err)
                               }}
                        >
                        알람 모두 읽음으로 표시
                    </Menu.Item>
            }
        </Menu>
    )


    return (

        <AlarmContainer>
            <Badge count={alarmCount} size="small" >
                <Dropdown overlay={AlarmList} trigger={['click']} >
                    <BellOutlined style={{ fontSize: '1.5rem', marginTop: '0.1875rem' }} />
                </Dropdown>
            </Badge>
        </AlarmContainer >

    )
}

export default withRouter(Alarm)

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