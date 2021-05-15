import React, {useState} from 'react';
import {Button, Col, Form, Image, Input, Row, Select, Tag, Upload} from "antd";
import ImgCrop from "antd-img-crop";
import Api from "../../util/Api";
import ImgUpload from "./ImgUpload";
import CreateInfo from "./CreateInfo";

const InfoSetting = (props) => {

    return (
        <Row style={{textAlign:'center'}}>
            <Col span={5}></Col>
            <Col span={14}>
                <CreateInfo repositoryInfo={props.repositoryInfo} thumbnailUrl={props.thumbnailUrl}/>
            </Col>
            <Col span={5}></Col>
        </Row>
    );
};

export default InfoSetting;