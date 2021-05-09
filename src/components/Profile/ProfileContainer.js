import React, {useEffect, useState} from 'react';
import {Card, Avatar, Upload} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import styled from "styled-components";
import ImgCrop from 'antd-img-crop';

const { Meta } = Card;

const Doilimg = styled.img`
    border-radius: 30% !important;
    overflow: hidden;
    width: 200px;
    height: 200px;
    margin: 25px auto;
`;


const ProfileContainer = ({name, email, description}) => {
    const [editData, setShowResults] = React.useState(false)
    const [userName, setUserName] = useState()
    const [userEmail, setUserEmail] = useState("")
    const [userDescription, setUserDescription] = useState("")
    const onClick = () => setShowResults(!editData)

    const [fileList, setFileList] = useState([]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);

        return false;
    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
    };

    useEffect(() => {
        //console.log("props : ",props)
        setUserName(name)
        setUserEmail(email)
        setUserDescription(description)
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
                                action=""
                                listType="picture-card"
                                fileList={fileList}
                                onChange={onChange}
                                onPreview={onPreview}
                                style={{ alignItems: 'center'}}
                            >
                                {fileList.length < 1 && '+ Upload'}
                            </Upload>
                        </ImgCrop>
                    </span> :
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
                        value={userDescription}
                        onChange={(event) => {
                            setUserDescription(event.currentTarget.value)
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
                        title={userDescription}
                    />
                </div>
            }
        </Card>
    );
};

export default ProfileContainer;