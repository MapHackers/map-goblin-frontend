import React, { useState } from 'react';
import { Button, Input } from 'antd';
import ImgUpload from './ImgUpload';
import { useHistory, withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CreateForm from './CreateForm';
import CreateFormItem from './CreateFormItem';
import SelectCategory from './SelectCategory';
import { createRepositoryAPI } from '../../util/api/repository';
import Api from '../../util/Api';

const { TextArea } = Input;

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 18,
      offset: 10,
    },
    sm: {
      span: 15,
      offset: 9,
    },
  },
};

const CreateInfo = (props) => {
  const user = useSelector((state) => state.user);
  const repository = useSelector((state) => state.repository);

  const [uploadProfileFile, setUploadProfileFile] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const category = useSelector((state) => state.repository.modifyCategory);

  const history = useHistory();

  const onCreateRepository = async () => {
    //* categories, thumbnail, name, description
    let body = {
      categories: category[category.length - 1],
      name: name,
      description: description,
    };
    console.log({ uploadProfileFile });

    try {
      if ((uploadProfileFile !== null) & (uploadProfileFile !== 'profileDelete')) {
        console.log('form data!!!');
        const formData = new FormData();
        formData.append('file', uploadProfileFile);
        const fileResponse = await Api.post('/files', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        body = { ...body, thumbnail: fileResponse.data };
      } else {
        body = { ...body, thumbnail: '' };
      }
      await createRepositoryAPI(body);
      alert(`지도 생성이 완료 되었습니다. 지도 페이지로 이동합니다.`);
      history.push(`/${user.userId}/repositories/${name}`);
    } catch (e) {
      console.log(await e);
      alert(`지도를 생성하는데 오류가 생겼습니다.`);
    }
  };

  return (
    <CreateForm formName="create" repository={repository} user={user}>
      <CreateFormItem label="썸네일" name="thumbnail" style={{ width: '50%', marginLeft: '25%' }}>
        <div id="create-map-upload">
          <ImgUpload
            uploadProfileFile={uploadProfileFile}
            setUploadProfileFile={setUploadProfileFile}
            type="repository"
          />
        </div>
      </CreateFormItem>
      <CreateFormItem
        label="지도 이름"
        name="name"
        rules={[{ required: true, message: '지도 이름을 입력해주세요!' }]}
        style={{ width: '50%', marginLeft: '25%' }}
      >
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </CreateFormItem>
      <CreateFormItem label="설명" name="description" style={{ width: '50%', marginLeft: '25%' }}>
        <TextArea rows={5} value={description} onChange={(e) => setDescription(e.target.value)} />
      </CreateFormItem>
      <CreateFormItem
        label="카테고리"
        name="categories"
        style={{ width: '50%', marginLeft: '25%' }}
      >
        <SelectCategory />
      </CreateFormItem>
      <CreateFormItem wrapperCol={tailFormItemLayout}>
        <Button type="primary" htmlType="submit" onClick={onCreateRepository}>
          지도 생성
        </Button>
      </CreateFormItem>
    </CreateForm>
  );
};

export default withRouter(CreateInfo);
