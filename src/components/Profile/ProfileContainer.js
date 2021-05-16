import React, {useEffect, useState} from 'react';
import {Card, Image, Upload, Input, Button} from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { editUser } from "../../_actions/user_action";
import styled from "styled-components";
import ImgCrop from 'antd-img-crop';
import Api from "../../util/Api";
import ProfileUi from 'react-profile-card';

const { Meta } = Card;

const { TextArea } = Input;

const Doilimg = styled.img`
    border-radius: 30% !important;
    overflow: hidden;
    width: 200px;
    height: 200px;
    margin: 25px auto;
`;


const ProfileContainer = (props) => {
    const [editData, setShowResults] = React.useState(false)
    const [userName, setUserName] = useState()
    const [userDescription, setUserDescription] = useState("")
    const [profile, setProfile] = useState("")

    const dispatch = useDispatch()
    const onClick = () => setShowResults(!editData)

    const [fileList, setFileList] = useState([]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        return false;
    };

    const onClickEdit = () => {
        //// 유저 상태 변환 시켜주기...

        const formData = new FormData
        if (fileList.length > 0) {
            formData.append('file', fileList[0].originFileObj);

            Api.post('/files', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(response => {
                console.log("profile:",response)
                setProfile(response.data)
                console.log("Edit Clicked", userName, userDescription)
                let dataToSubmit = {
                    userId: props.user.userId,
                    userName: userName,
                    description: userDescription,
                    profile: response.data
                }
                dispatch(editUser(dataToSubmit))
                    .then(response => console.log("Edit:",response))
                    .catch(error => error)
            })
        }else{
            setProfile(null)
            console.log("Edit Clicked", userName, userDescription)
            let dataToSubmit = {
                userId: props.user.userId,
                userName: userName,
                description: userDescription,
                profile: null
            }
            dispatch(editUser(dataToSubmit))
                .then(response => console.log("NOEdit:",response))
                .catch(error => error)
        }
    }

    useEffect(() => {
        //console.log("props : ",props)
        setUserName(props.user.userName)
        setUserDescription(props.user.description)
        setProfile(props.user.profile)
        }
    , [])



    return (
        <Card
            style={{ width: "100%"}}
            cover={
                editData ?
                    <span id="create-map-upload" style={{margin: '25px auto'}}>
                        <ImgCrop rotate>
                            <Upload
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                beforeUpload={file => {
                                    setFileList(fileList.concat(file));
                                    return false;
                                }}
                            >
                                {fileList.length < 1 && '+ Upload'}
                            </Upload>
                        </ImgCrop>
                    </span> :
                    <div>
                        {
                            profile !== "" &&
                            <ProfileUi
                                imgUrl={profile ? Api.defaults.baseURL + '/files/' + profile : 'no-image.svg'}
                                // name={props.user.userName}
                                // designation={props.user.userEmail}
                            />
                            // <Image alt="example"
                            //        src={Api.defaults.baseURL + '/files/' + profile}
                            //        style={{ width: '20vw', height: '35vh', borderRadius: '10%', verticalAlign:'center' }}
                            //        fallback="no-image.svg"
                            // />
                        }
                    </div>
            }
            actions={[
                <span title='프로필 변경' onClick={onClick}>{
                    editData ? <div><Button danger>취소하기</Button><Button type="primary" onClick={onClickEdit}>변경 완료</Button></div>
                        : <div><EditOutlined key="edit"/>edit profile</div>
                }</span>
            ]}
        >
            { editData ?
                <div>
                    <Meta
                        description="이름과 상태메시지를 바꿔보세요!"
                    />
                    <br/>
                    <div>이름</div>
                    <Input
                        placeholder="바꿀 이름을 입력해 주세요."
                        value={userName}
                        onChange={(event) => {
                            setUserName(event.currentTarget.value)
                        }}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                    />

                    <br/>
                    <div>상태메시지</div>
                    <TextArea
                        placeholder="상태메시지를 입력해 주세요."
                        rows={4}
                        value={userDescription}
                        onChange={(event) => {
                            setUserDescription(event.currentTarget.value)
                        }}
                    />
                </div>
                :
                <div>
                    <Meta
                        title={<h2>{props.user.userName}</h2>}
                        description={props.user.userEmail}
                    />
                    <Meta
                        style={{marginTop:"30px"}}
                        title={props.user.description}
                    />
                </div>
            }
        </Card>
    );
};


export default ProfileContainer;