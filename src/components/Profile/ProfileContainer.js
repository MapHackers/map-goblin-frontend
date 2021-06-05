import React, {useEffect, useState} from 'react';
import {Card, Input, Button, Avatar} from 'antd';
import {EditOutlined, UserOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {editUser} from "../../_actions/user_action";
import styled from "styled-components";
import Api from "../../util/Api";
import {addFile, modifiedFile} from "../../_actions/repository_action";
import ImgUpload from "../Repository/ImgUpload";

const {Meta} = Card;

const {TextArea} = Input;

const Doilimg = styled.img`
    border-radius: 30% !important;
    overflow: hidden;
    width: 200px;
    height: 200px;
    margin: 25px auto;
`;


const ProfileContainer = (props) => {
    const [editData, setShowResults] = React.useState(false)
    const [userName, setUserName] = useState(props.user.userName)
    const [userDescription, setUserDescription] = useState(props.user.description)
    const [profile, setProfile] = useState(props.user.profile)
    const [isOwner, setIsOwner] = useState(false)


    const dispatch = useDispatch()
    const onClick = () => setShowResults(!editData)

    //const [fileList, setFileList] = useState([]);

    const fileList = useSelector(state => state.repository.fileList)
    const userInfo = useSelector(state => state.userInfo)


    // const onChange = ({ fileList: newFileList }) => {
    //     // console.log("before SET", fileList)
    //     // setFileList(newFileList);
    //     // console.log("after SET", fileList)
    //     // return false;
    //     dispatch(addFile(newFileList));
    //     dispatch(modifiedFile(true));
    // };

    const onClickEdit = () => {
        const formData = new FormData
        console.log("FILELIST", fileList)
        if (fileList.length > 0) {
            if (fileList[0].originFileObj) {
                formData.append('file', fileList[0].originFileObj);
                Api.post('/files', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }).then(response => {
                    console.log("profile:", response)
                    setProfile(response.data)
                    console.log("FILELIST 1", fileList)
                    let dataToSubmit = {
                        userId: props.user.userId,
                        userName: userName,
                        description: userDescription,
                        profile: response.data
                    }
                    dispatch(editUser(dataToSubmit))
                        .then(response => console.log("Edit:", response))
                        .catch(error => error)
                })
            } else {
                let dataToSubmit = {
                    userId: props.user.userId,
                    userName: userName,
                    description: userDescription,
                    profile: null
                }
                dispatch(editUser(dataToSubmit))
                    .then(response => console.log("FILELIST 2", fileList))
                    .catch(error => error)
            }

        } else {
            setProfile(null)
            console.log("No FileList", props.userName, props.description)
            console.log("FILELIST 3", fileList)
            let dataToSubmit = {
                userId: props.user.userId,
                userName: userName,
                description: userDescription,
                profile: null
            }
            dispatch(editUser(dataToSubmit))
                .then(response => console.log("NOEdit:", response))
                .catch(error => error)
        }
    }

    useEffect(() => {
            //console.log("props : ",props)
            // setUserName(props.user.userName)
            // setUserDescription(props.user.description)
            // setProfile(props.user.profile)
            //props.user.profile && setFileList(fileList.concat(props.user.profile))

            if (props.user.userId === userInfo.userId) {
                setIsOwner(true)
            }

            setUserName(userInfo.userName)
            setUserDescription(userInfo.description)
            setProfile(userInfo.profile)

            let newFileList = [{
                uid: '-1',
                name: 'image.png',
                status: 'done',
                url: profile,
            }];

            dispatch(addFile(newFileList));

            dispatch(modifiedFile(false));
        }
        , [])

    return (
        <Card
            style={{width: "100%"}}
            cover={
                editData ?
                    <span id="create-map-upload" style={{marginLeft: '25px', marginTop: '25px', width: "100%"}}>
                        <ImgUpload/>
                        {/*<ImgCrop rotate>*/}
                        {/*    <Upload*/}
                        {/*        listType="picture-card"*/}
                        {/*        fileList={fileList}*/}
                        {/*        onChange={onChange}*/}
                        {/*        beforeUpload={() => {return false}}*/}
                        {/*        // beforeUpload={file => {*/}
                        {/*        //     setFileList(fileList.concat(file));*/}
                        {/*        //     return false;*/}
                        {/*        // }}*/}
                        {/*    >*/}
                        {/*        {fileList.length < 1 && '+ Upload'}*/}
                        {/*    </Upload>*/}
                        {/*</ImgCrop>*/}
                    </span> :

                    <div>
                        {
                            userInfo.profile !== "" &&
                            <Avatar size={250}
                                    shape="square"
                                    src={userInfo.profile ? Api.defaults.baseURL + '/files/' + userInfo.profile : 'NoProfile.png'}
                            />
                        }
                    </div>
            }
            actions={[
                <>
                    {
                        isOwner &&
                        <span title='프로필 변경' onClick={onClick}>{
                            editData ?
                                <div><Button danger style={{marginRight: '10px'}}>취소하기</Button><Button
                                    type="primary"
                                    onClick={onClickEdit}>변경
                                    완료</Button></div>
                                : <div><EditOutlined key="edit"/>edit profile</div>
                        }</span>
                    }
                </>,
            ]}
        >
            {editData ?
                <div>
                    <Meta
                        description="이름과 상태메시지를 바꿔보세요!"
                    />
                    <div style={{marginTop: '10px'}}>이름</div>
                    <Input
                        placeholder="바꿀 이름을 입력해 주세요."
                        value={userName}
                        onChange={(event) => {
                            setUserName(event.currentTarget.value)
                        }}
                        prefix={<UserOutlined className="site-form-item-icon"/>}
                    />
                    <div style={{marginTop: '10px'}}>상태메시지</div>
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
                        title={<h2>{userName}</h2>}
                        description={userInfo.userEmail}
                        style={{marginTop: '10px'}}
                    />
                    <Meta
                        style={{marginTop: "30px"}}
                        title={userDescription}
                    />
                </div>
            }
        </Card>
    );
};

export default ProfileContainer;