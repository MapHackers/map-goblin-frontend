<<<<<<< HEAD
import React, {useState} from 'react';
import CommonLayout from "../components/Layout/CommonLayout";

import { Row, Col, Divider } from "antd";
import { Form, Input, Button } from 'antd';
import { Upload, Select, Tag } from 'antd';
import ImgCrop from 'antd-img-crop';

import Api from "../util/Api";

const { TextArea } = Input;

const formItemLayout = {
    labelCol: {
        xs: { span: 10 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 10 },
        sm: { span: 18 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 0,
            offset: 1,
        },
        sm: {
            span: 13,
            offset: 10,
        },
    },
};

const CreateMyMapPage = (props) => {
    const [fileList, setFileList] = useState([]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);

    };

    const onFinish = (values) => {

        const formData = new FormData();

        if (fileList.length > 0) {
            formData.append('file', fileList[0].originFileObj);

            Api.post('/files', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            }).then(response => {
                console.log(response);
                values.thumbnail = response.data;

                Api.post('/repositories', values).then(response=>{
                    const userId = props.user.userData.data.userId;
                    const repositoryName = response.data.name;

                    props.history.push('/'+userId+'/repositories/'+repositoryName);
                }).catch(error=>{
                    alert(error.response.data.message);
                });
            });
        }else{
            Api.post('/repositories', values).then(response=>{
                const userId = props.user.userData.data.userId;
                const repositoryName = response.data.name;

                props.history.push('/'+userId+'/repositories/'+repositoryName);
            }).catch(error=>{
                alert(error.response.data.message);
            });
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
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

    const options = [{ value: '카테고리1' }, { value: '카테고리2' }, { value: '카테고리3' }, { value: '카테고리4' }];

    const tagRender = (props) => {
        const { label, closable, onClose } = props;
        const onPreventMouseDown = event => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color='geekblue'
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{ marginRight: 3 }}
            >
                {label}
            </Tag>
        );
    };

    return (
        <CommonLayout>
            <Row style={{textAlign:'center'}}>
                <Col span={5}></Col>
                <Col span={14}>
                    <p style={{marginTop:"30px", fontSize:"35px"}}>
                        나만의 지도를 만들어 보아요!
                    </p>
                    <p style={{marginTop:"30px", fontSize:"25px"}}>
                        지도의 이름과 카테고리를<br/>입력해주세요.
                    </p>
                    <Divider />
                    <Form {...formItemLayout}
                          name="basic"
                          onFinish={onFinish}
                          onFinishFailed={onFinishFailed}
                          initialValues={{ remember: true }}>

                        <Form.Item
                            label="썸네일"
                            name="thumbnail"
                            style={{width:"50%", marginLeft:"25%"}}>
                            <div id="create-map-upload">
                                <ImgCrop rotate>
                                        <Upload
                                            listType="picture-card"
                                            fileList={fileList}
                                            onChange={onChange}
                                            onPreview={onPreview}
                                            beforeUpload={file => {
                                                setFileList(fileList.concat(file));
                                                return false;
                                            }}
                                        >
                                            {fileList.length < 1 && '+ Upload'}
                                        </Upload>
                                </ImgCrop>
                            </div>
                        </Form.Item>

                        <Form.Item
                            label="지도 이름"
                            name="name"
                            rules={[{ required: true, message: '지도 이름을 입력해주세요!' }]}
                            style={{width:"50%", marginLeft:"25%"}}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="설명"
                            name="description"
                            style={{width:"50%", marginLeft:"25%"}}
                        >
                            <TextArea />
                        </Form.Item>

                        <Form.Item
                            label="카테고리"
                            name="categories"
                            style={{width:"50%", marginLeft:"25%"}}
                        >
                            <Select
                                mode="multiple"
                                showArrow
                                tagRender={tagRender}
                                style={{ width: '100%' }}
                                options={options}
                            />
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                            <Button type="primary" htmlType="submit">
                                지도 생성
                            </Button>
                        </Form.Item>

                    </Form>
                </Col>
                <Col span={5}></Col>
            </Row>
        </CommonLayout>
    );
};

export default CreateMyMapPage;
=======
import React, { useState } from 'react'
import MapContainer from '../components/Map/MapContainer'
import styled from 'styled-components'
import Logo from '../components/Form/Logo'
import Title from '../components/Form/Title'
import { Input, Select, Button } from 'antd'

const { Option } = Select;
const provinceData = ['서울', '경기도'];
const cityData = {
    서울: ['동작구', '관악구', '강남구'],
    경기도: ['안양', '경기', '경기외곽'],
};

function CreateMyMapPage() {

    const [cities, setCities] = useState(cityData[provinceData[0]]);
    const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);
    const [firstCity, setfirstCity] = useState(provinceData[0])

    const [repositoryTitle, setrepositoryTitle] = useState("")
    const [isMapCreatable, setisMapCreatable] = useState(false)

    const [saveMarkers, setsaveMarkers] = useState()

    const handleProvinceChange = value => {
        setCities(cityData[value]);
        setfirstCity(value)
        setSecondCity(cityData[value][0]);
    };

    const onSecondCityChange = value => {
        setSecondCity(value);
    };

    const onCreateButtonClick = () => {
        setisMapCreatable(!isMapCreatable)
        console.log("레포지토리 이름 :", repositoryTitle, "cities : ", firstCity, "second City : ", secondCity)
    }

    const handleSave = () => {
        console.log(saveMarkers)
    }

    return (
        <>
            {!isMapCreatable ?
                <div>
                    <div style={{ display: 'flex', background: '#f5f6f7', position: 'relative', height: '100%' }}>
                        <FrameContainer >
                            <HeaderContainer>
                                <Logo />
                                <Title title="나만의 지도를 만들어 보아요" fontSize='3rem' />
                                <Title title="지도의 이름과 카테고리를 입력해 주세요" fontSize='2rem' />
                            </HeaderContainer>
                            <FormContainer>
                                <p> 레포지토리 이름 </p>
                                <Input
                                    value={repositoryTitle}
                                    placeholder="레포지토리 이름"
                                    onChange={(event) => {
                                        setrepositoryTitle(event.currentTarget.value)
                                    }}
                                />
                                <br />
                                <p> 카테고리 선택 </p>
                                <div>
                                    <Select defaultValue={provinceData[0]} style={{ width: 120 }} onChange={handleProvinceChange}>
                                        {provinceData.map(province => (
                                            <Option key={province}>{province}</Option>
                                        ))}
                                    </Select>
                                    <Select style={{ width: 120 }} value={secondCity} onChange={onSecondCityChange}>
                                        {cities.map(city => (
                                            <Option key={city}>{city}</Option>
                                        ))}
                                    </Select>
                                </div>

                                <Button onClick={onCreateButtonClick}> Create Map </Button>

                            </FormContainer>
                        </FrameContainer>
                    </div>
                </div>
                :
                <div>
                    <MapContainer isCreate={true} saveMarkers={saveMarkers} setSaveMarkers={setsaveMarkers} handleSave={handleSave}/>

                    <Button
                        style={{ zIndex: 420, position: 'absolute', top: '10px', left: '10px' }}
                        onClick={() => {
                            setisMapCreatable(!isMapCreatable)
                            console.log(saveMarkers)
                        }}
                    >
                        Back
                    </Button>

                </div>

            }
        </>

    )
}

export default CreateMyMapPage

const FrameContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: #f5f6f7;
    position: relative;
    display: flex;
    flex-direction: column;
`

const FormContainer = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 30vw;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    @media (max-width: 850px) {
        width: 60vw;
        margin: 0 auto;
    }
`

const HeaderContainer = styled.div`
    position: relative;
    width: 50vw;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 3rem 0 3rem;
    @media (max-width: 850px) {
        width: 100vw;
        margin: 0;
    }
`
>>>>>>> maps
