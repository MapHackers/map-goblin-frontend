import React, { useState } from 'react';
import { Upload, message, Button } from 'antd';
import { useSelector } from 'react-redux';
import Api from '../../util/Api';

const ImgUpload = ({ setUploadProfileFile }) => {
  const [url, setUrl] = useState(
    useSelector((state) => Api.defaults.baseURL + '/files/' + state.file.upload)
  );

  const validURL = url !== Api.defaults.baseURL + '/files/null';

  const onChange = (info) => {
    getURL(info.file.originFileObj);
    setUploadProfileFile(info.file.originFileObj);
  };

  const getURL = (img) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setUrl(reader.result);
    });
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must smaller than 5MB!');
    }
    return isJpgOrPng && isLt5M;
  };

  const onClickDelete = async () => {
    setUrl(Api.defaults.baseURL + '/files/null');
    setUploadProfileFile('profileDelete');
  };

  return (
    <>
      <Upload listType="picture-card" fileList={[]} onChange={onChange} beforeUpload={beforeUpload}>
        <div>{validURL ? <img src={url} alt="" style={{ width: '100%' }} /> : `+ upload`}</div>
      </Upload>
      {validURL && (
        <div style={{ display: 'flex' }}>
          <Button danger onClick={onClickDelete} style={{ left: '60px', marginRight: 'auto' }}>
            삭제하기
          </Button>
        </div>
      )}
    </>
  );
};

export default ImgUpload;
