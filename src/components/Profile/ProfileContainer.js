import React, {useEffect, useState} from 'react';
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
    const [editData, setShowResults] = React.useState(false)
    const [userName, setUserName] = React.useState("")
    const [userEmail, setUserEmail] = useState("")
    const [description, setDescription] = useState("")
    const onClick = () => setShowResults(!editData)

    useEffect(() => {
        console.log("props : ",props)
        setUserName(props.name)
        setUserEmail(props.email)
        setDescription(props.description)
        }
    , [])

    return (
        <Card
            style={{ width: "100%"}}
            cover={
                <Doilimg alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"/>
            }
            actions={[
                <span title='edit profile' onClick={onClick}>{
                    editData ? <input type='button' value='변경 완료' color='#36A2EB'/> : <div><EditOutlined key="edit"/>edit profile</div>
                }</span>
            ]}
        >
            { editData ?
                <div>
                    <div>이름</div>
                    <input
                       value={userName}
                       onChange={(event) => {
                           setUserName(event.currentTarget.value)
                       }}
                    />
                    <div>email</div>
                    <input
                        value={userEmail}
                        onChange={(event) => {
                            setUserEmail(event.currentTarget.value)
                        }
                        }
                    />
                    <div>상태메시지</div>
                    <input
                        value={description}
                        onChange={(event) => {
                            setDescription(event.currentTarget.value)
                        }
                        }
                    />
                </div>
                :
                <div>
                    <Meta
                        title={<h2>{userName}</h2>}
                        description={userEmail}
                    />
                    <Meta
                        style={{marginTop:"30px"}}
                        title={description}
                    />
                </div>
            }
        </Card>
    );
}

export default ProfileContainer;