import { Modal } from 'antd';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { repositoryActions } from '../store/repository';
import { cloneRepository, getRepositoryInfo, likeRepository } from '../util/api/repository';

const useRepository = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const repositoryUserId = history.location.pathname.split('/')[1];
  const repositoryName = history.location.pathname.split('/')[3];

  const repositoryInfo = useSelector((state) => state.repository);
  const userId = useSelector((state) => state.user.userId);

  const backHome = () => {
    history.push('/main');
  };

  const onClickLike = async (type) => {
    try {
      const response = await likeRepository(type);
      // if (actionType === type) {
      //     setActionType(null);
      //   } else {
      //     setActionType(type);
      //   }
    } catch (e) {}
  };

  const onClickClone = async () => {
    if (repositoryInfo.source === 'HOST' && repositoryInfo.authority === 'OWNER') {
      // TODO 본인의 지도에서는 클론 버튼을 렌더 안하는게 맞지 않나?
      alert(`본인의 지도는 클론할 수 없습니다.`);
      return;
    }

    if (Modal.confirm(`지도를 클론하시겠습니까?`)) {
      try {
        const response = await cloneRepository(repositoryInfo.id);
        alert(`클론이 완료되었습니다. 클론된 지도로 이동합니다.`);
        history.push(`/${userId}/repositories/${response.data.name}`);
      } catch (e) {
        alert(`지도를 클론하는데 오류가 생겼습니다.`);
      }
    }
  };

  const getData = useCallback(async () => {
    try {
      const response = await getRepositoryInfo(userId, repositoryName);
      dispatch(repositoryActions.setRepositoryInfo(response.data));
    } catch (e) {}
  }, [dispatch, repositoryName, userId]);

  useEffect(() => {
    getData();
  }, [getData]);

  return { repositoryUserId, repositoryName, repositoryInfo, backHome, onClickClone, onClickLike };
};

export default useRepository;
