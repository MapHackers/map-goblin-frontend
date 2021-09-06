import React from 'react';
import {Upload} from "antd";
import ImgCrop from "antd-img-crop";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {addFile, modifiedFile} from "../../_actions/space_action";

const ImgUpload = (props) => {
    const dispatch = useDispatch();

    const fileList = useSelector(state => state.space.fileList)

    const onChange = ({ fileList: newFileList }) => {

        let newFile = newFileList[0];

        if(newFile?.size > 5*1024*1000){
            alert(`파일업로드 허용용량 5Mbyte를 초과하였습니다.`);
            newFileList.splice(0, 1)
        }else{
            dispatch(addFile(newFileList));
            dispatch(modifiedFile(true));
        }
    };

    return (
        <ImgCrop rotate>
            <Upload
                listType="picture-card"
                fileList={fileList}
                onChange={onChange}
                beforeUpload={() => {return false}}
            >
                {fileList.length < 1 && '+ Upload'}
            </Upload>
        </ImgCrop>
    );
};

export default withRouter(ImgUpload);