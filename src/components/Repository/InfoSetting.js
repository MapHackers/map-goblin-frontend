import React, { useEffect, useState } from 'react';
import { Button, Col, Input, Row } from 'antd';
import ImgUpload from './ImgUpload';
import { useHistory, withRouter } from 'react-router-dom';
import CreateForm from './CreateForm';
import CreateFormItem from './CreateFormItem';
import SelectCategory from './SelectCategory';
import { useDispatch, useSelector } from 'react-redux';
import Api from '../../util/Api';
import { deleteRepositoryAPI, modifyRepositoryAPI } from '../../util/api/repository';
import { fileActions } from '../../store/file';

const { TextArea } = Input;

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 10,
      offset: 5,
    },
    sm: {
      span: 20,
      offset: 19,
    },
  },
};

const deleteItemLayout = {
  wrapperCol: {
    xs: {
      span: 10,
      offset: 5,
    },
    sm: {
      span: 12,
      offset: 8,
    },
  },
};

const InfoSetting = (props) => {
  const user = useSelector((state) => state.user);
  const repository = useSelector((state) => state.repository);

  const userId = useSelector((state) => state.user.userId);
  const repositoryInfoName = useSelector((state) => state.repository.name);

  const history = useHistory();

  const [name, setName] = useState(props.repositoryInfo.name);
  const [description, setDescription] = useState(props.repositoryInfo.description);
  const [oneWord, setOneWord] = useState(props.repositoryInfo.oneWord);
  const [thumbnail, setThumbnail] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => {
    if (props.repositoryInfo.thumbnail === '') {
      dispatch(fileActions.setUpload('null'));
    } else {
      dispatch(fileActions.setUpload(props.repositoryInfo.thumbnail));
    }
  }, [dispatch, props.repositoryInfo.thumbnail]);

  const category = useSelector((state) => state.repository.modifyCategory);

  const onClickDelete = async () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        await deleteRepositoryAPI(props.repositoryInfo.id);
        history.push(`/main`);
      } catch (e) {
        console.error(e, `레포지토리를 삭제하는데 에러가 발생했습니다.`);
      }
    }
  };

  const onClickModify = async () => {
    //* title, desc, category, oneword, thumbnail
    let body = {
      name: name,
      description: description,
      oneWord: oneWord,
      categories: category[category.length - 1],
      thumbnail: props.repositoryInfo.thumbnail,
    };

    if (thumbnail !== null) {
      if (thumbnail === 'profileDelete') {
        body = {
          ...body,
          thumbnail: 'null',
        };
      } else {
        const formData = new FormData();
        formData.append('file', thumbnail);
        const response = await Api.post('/files', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        body = {
          ...body,
          thumbnail: response.data,
        };
      }
    }

    try {
      console.log({ body, userId, repositoryInfoName });
      await modifyRepositoryAPI(body, userId, repositoryInfoName);
      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Row style={{ textAlign: 'center' }}>
      <Col span={5}></Col>
      <Col span={14}>
        <CreateForm>
          <Row>
            <Col span={14}>
              <CreateFormItem label="지도 이름">
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </CreateFormItem>
              <CreateFormItem label="설명">
                <TextArea
                  rows={10}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </CreateFormItem>
              <CreateFormItem label="카테고리">
                <SelectCategory categories={repository.categories} />
              </CreateFormItem>
              <CreateFormItem label="Owner의 한마디">
                <TextArea
                  showCount
                  maxLength={20}
                  value={oneWord}
                  onChange={(e) => setOneWord(e.target.value)}
                />
              </CreateFormItem>
              <CreateFormItem wrapperCol={tailFormItemLayout}>
                <Button type="primary" onClick={onClickModify} style={{ marginTop: '20px' }}>
                  정보 수정
                </Button>
              </CreateFormItem>
            </Col>
            <Col span={10}>
              <CreateFormItem label="썸네일" name="thumbnail">
                <div id="create-map-upload">
                  <ImgUpload setUploadProfileFile={setThumbnail} />
                </div>
              </CreateFormItem>
              <CreateFormItem wrapperCol={deleteItemLayout}>
                <Button
                  type="primary"
                  onClick={onClickDelete}
                  style={{ marginTop: '20px', width: '100%' }}
                  danger
                >
                  지도 삭제
                </Button>
              </CreateFormItem>
            </Col>
          </Row>
        </CreateForm>
      </Col>
      <Col span={5}></Col>
    </Row>
  );
};

export default withRouter(InfoSetting);
