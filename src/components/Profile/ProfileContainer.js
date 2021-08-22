import React from 'react';
import { Card, Input, Button, Avatar } from 'antd';
import { EditOutlined, UserOutlined } from '@ant-design/icons';
import Api from '../../util/Api';
import ImgUpload from '../Repository/ImgUpload';
import useEditProfile from '../../hooks/useEditProfile';

const { Meta } = Card;

const { TextArea } = Input;

const ProfileContainer = ({
  userInfoName,
  userInfoDesc,
  userInfoProfile,
  userInfoEmail,
  isOwner,
}) => {
  const {
    isEdit,
    toggleEdit,
    inputName,
    inputDesc,
    onClickCancle,
    onClickSubmit,
    onChangeName,
    onChangeDescription,
    uploadProfileFile,
    setUploadProfileFile,
  } = useEditProfile();

  return (
    <Card
      style={{ width: '100%' }}
      cover={
        isEdit ? (
          <span
            id="create-map-upload"
            style={{ marginLeft: '25px', marginTop: '25px', width: '100%' }}
          >
            <ImgUpload
              uploadProfileFile={uploadProfileFile}
              setUploadProfileFile={setUploadProfileFile}
            />
          </span>
        ) : (
          <div>
            <Avatar
              size={250}
              shape="square"
              src={
                userInfoProfile
                  ? Api.defaults.baseURL + '/files/' + userInfoProfile
                  : 'NoProfile.png'
              }
            />
          </div>
        )
      }
      actions={[
        <>
          {isOwner && (
            <span title="프로필 변경">
              {isEdit ? (
                <div>
                  <Button danger style={{ marginRight: '10px' }} onClick={onClickCancle}>
                    취소하기
                  </Button>
                  <Button type="primary" onClick={onClickSubmit}>
                    변경 완료
                  </Button>
                </div>
              ) : (
                <div onClick={toggleEdit}>
                  <EditOutlined key="edit" />
                  edit profile
                </div>
              )}
            </span>
          )}
        </>,
      ]}
    >
      {isEdit ? (
        <div>
          <Meta description="이름과 상태메시지를 바꿔보세요!" />
          <div style={{ marginTop: '10px' }}>이름</div>
          <Input
            placeholder="바꿀 이름을 입력해 주세요."
            value={inputName}
            onChange={(e) => onChangeName(e)}
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
          <div style={{ marginTop: '10px' }}>상태메시지</div>
          <TextArea
            placeholder="상태메시지를 입력해 주세요."
            rows={4}
            value={inputDesc}
            onChange={(e) => onChangeDescription(e)}
          />
        </div>
      ) : (
        <div>
          <Meta
            title={<h2>{userInfoName}</h2>}
            description={userInfoEmail}
            style={{ marginTop: '10px' }}
          />
          <Meta style={{ marginTop: '30px' }} title={userInfoDesc} />
        </div>
      )}
    </Card>
  );
};

export default ProfileContainer;
