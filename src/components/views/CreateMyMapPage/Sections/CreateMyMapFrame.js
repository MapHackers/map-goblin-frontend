import React from 'react'
import { Button } from 'antd'
import CreateForm from './CreateForm'

function CreateMyMapFrame() {
    return (
        <div className="CreateMyMapWrapper">
            <div className="FormWrapper">
                <h1> 나만의 지도를 만들어 보아요 </h1>
                <h2> 지도 이름과 카테고리를 입력해 주세요 </h2>
                <CreateForm />
            </div>
            <div className="createButtonWrapper">
                <Button> 버튼 </Button>
            </div>
        </div>
    )
}

export default CreateMyMapFrame
