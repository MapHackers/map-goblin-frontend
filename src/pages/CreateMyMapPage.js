import React from 'react';
import CommonLayout from "../components/Layout/CommonLayout";

import { Row, Col, Divider } from "antd";
import CreateInfo from "../components/Repository/CreateInfo";

const CreateMyMapPage = (props) => {

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
                    <CreateInfo/>
                </Col>
                <Col span={5}></Col>
            </Row>
        </CommonLayout>
    );
};

export default CreateMyMapPage;