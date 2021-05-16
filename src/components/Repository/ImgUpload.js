import React from 'react';
import {Upload} from "antd";
import ImgCrop from "antd-img-crop";
import {useDispatch, useSelector} from "react-redux";
import {withRouter} from "react-router-dom";
import {addFile, modifiedFile} from "../../_actions/repository_action";

const ImgUpload = (props) => {
    const dispatch = useDispatch();

    const fileList = useSelector(state => state.repository.fileList)

    const onChange = ({ fileList: newFileList }) => {
        dispatch(addFile(newFileList));
        dispatch(modifiedFile(true));
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