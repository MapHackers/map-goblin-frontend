import React, {useEffect, useState} from 'react'
import { BellOutlined } from '@ant-design/icons';
import styled from 'styled-components'
import { Badge, Menu, Dropdown, Divider } from 'antd'


function setRead(alarmData){
    alarmData.read = true
}

function Alarm() {

    const alarmDatas = [
        {
            id : 1,
            user : 'dydfuf',
            type : 'like',
            read : true
        },
        {
            id : 2,
            user : 'oxhe2038',
            type : 'clone',
            read : true
        },
        {
            id : 3,
            user : 'unknown1',
            type : 'issue',
            read : true
        },
        {
            id : 4,
            user : 'ghdtjq',
            type : 'request',
            read : false
        },
        {
            id : 5,
            user : 'yongyeol',
            type : 'like',
            read : false
        }
    ]

    const [unreadAlarmDatas, setUnreadAlarmDatas] = useState([])



    useEffect(async () => {
        let temp = []
        alarmDatas.reverse().map((alarmData)=>{
            if(alarmData.read === false){
                temp.push(alarmData)
            }
        })
        await setUnreadAlarmDatas([...temp])
    }, [])

    const typemap = {
        'like' : '를 좋아합니다.',
        'clone' : '를 클론하였습니다.',
        'request' : '에 요청을 남겼습니다.',
        'issue' : '에 이슈를 남겼습니다.'
    }


    const AlarmList = (
        <Menu>
            {
                unreadAlarmDatas.map((alarm, idx) => (
                    <Menu.Item key={idx}>
                        <div>{alarm.user}님이 회원님의 지도{typemap[alarm.type]}</div>
                    </Menu.Item>
                ))
            }
        </Menu>
    )


    return (

        <AlarmContainer>
            <Badge count={unreadAlarmDatas.length} size="small" >
                <Dropdown overlay={AlarmList} trigger={['click']} >
                    <BellOutlined style={{ fontSize: '1.5rem', marginTop: '0.1875rem' }} />
                </Dropdown>
            </Badge>
        </AlarmContainer >

    )
}

export default Alarm

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