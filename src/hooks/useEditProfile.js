import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Api from '../util/Api';
import { editUser } from '../store/user';
import { userInfoActions } from '../store/userInfo';
import { fileActions } from '../store/file';

const useEditProfile = () => {
  const dispatch = useDispatch();

  const [isEdit, setIsEdit] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [uploadProfileFile, setUploadProfileFile] = useState(null);

  const userId = useSelector((state) => state.user.userId);
  const userName = useSelector((state) => state.user.userName);
  const userDesc = useSelector((state) => state.user.description);
  const userProfile = useSelector((state) => state.user.profile);

  const toggleEdit = () => {
    if (!isEdit) {
      dispatch(fileActions.setUpload(userProfile));
    }
    setIsEdit(!isEdit);
    setInputName(userName);
    setInputDesc(userDesc);
  };

  const onClickCancle = async () => {
    toggleEdit();

    setInputName();
    setInputDesc();
  };

  const onClickSubmit = async () => {
    /**
     * * 3가지 경우의 수
     * * 1. 프로필사진도 추가, 나머지 정보도 수정?
     * ?    => uploadProfileFile !== null 이면 이미지를 수정했다는것
     * * 2. 프로필사진은 그대로, 나머지 정보도 수정?
     * ?    => uploadProfileFile === null 이면 이미지를 수정하지 않았다는것
     * * 3. 프로필사진을 삭제(NULL), 나머지 정보도 수정?
     * *
     */
    try {
      let dataToSubmit = {
        userId: userId,
        userName: inputName,
        description: inputDesc,
        profile: userProfile,
      };

      //* 프로필 이미지를 바꾼 경우
      if (uploadProfileFile !== null) {
        //* 프로필 이미지를 삭제한 경우, 즉 원래 프로필 이미지가 있는데 삭제하기 버튼으로 없엔것
        if (uploadProfileFile === 'profileDelete') {
          dataToSubmit = {
            ...dataToSubmit,
            profile: 'profileDelete',
          };
        } else {
          //* 서버에 파일을 저장하고 파일의 주소를 받아옴
          const formData = new FormData();
          formData.append('file', uploadProfileFile);
          console.log({ uploadProfileFile });
          const response = await Api.post('/files', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          dataToSubmit = {
            ...dataToSubmit,
            profile: response.data,
          };
        }
      }

      console.log(dataToSubmit);

      dispatch(editUser(dataToSubmit));
      dispatch(userInfoActions.editUser(dataToSubmit));
    } catch (e) {
      alert(`프로필 수정에 실패했습니다. 다시 시도해주세요`);
    }

    toggleEdit();
  };

  const onChangeName = (e) => {
    setInputName(e.target.value);
  };

  const onChangeDescription = (e) => {
    setInputDesc(e.target.value);
  };

  return {
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
  };
};

export default useEditProfile;
