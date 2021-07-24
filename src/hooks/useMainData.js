import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllRepo,
  getRepoByCategoryName,
  getLikedRepositoryByUserId,
  repositoryActions,
} from '../store/repository';

const useMainData = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);
  const allRepo = useSelector((state) => state.repository.allRepo);
  const recommendRepo = useSelector((state) => state.repository.recommendRepo);
  const likedRepo = useSelector((state) => state.repository.likedRepo);

  const [recommendCategory, setrecommendCategory] = useState([
    '대학교',
    '맛집',
    '서울',
    '정보전달',
    '포탈',
  ]);

  const init = async () => {
    if (userId) {
      setrecommendCategory(['대학교', '맛집', '서울', '정보전달', '포탈']);

      dispatch(repositoryActions.setRecommendRepo());

      dispatch(getAllRepo());

      await dispatch(getLikedRepositoryByUserId(userId));

      for (const catecoryName of recommendCategory) {
        await dispatch(getRepoByCategoryName(catecoryName));
      }
    }
  };

  useEffect(() => {
    init();
  }, [userId]);

  return {
    allRepo,
    recommendRepo,
    likedRepo,
    recommendCategory,
  };
};

export default useMainData;
