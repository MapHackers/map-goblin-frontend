import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllRepo,
  getRepoByCategoryName,
  getLikedRepositoryByUserId,
  mainActions,
} from '../store/main';

const useMainData = () => {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.user.id);
  const allRepo = useSelector((state) => state.main.allRepo);
  const recommendRepo = useSelector((state) => state.main.recommendRepo);
  const likedRepo = useSelector((state) => state.main.likedRepo);

  const [recommendCategory, setrecommendCategory] = useState([
    '대학교',
    '맛집',
    '서울',
    '정보전달',
    '포탈',
  ]);

  const init = useCallback(async (userId, recommendCategory) => {
    if (userId) {
      setrecommendCategory(['대학교', '맛집', '서울', '정보전달', '포탈']);

      dispatch(mainActions.setRecommendRepo());

      dispatch(getAllRepo());

      dispatch(getLikedRepositoryByUserId(userId));

      for (const catecoryName of recommendCategory) {
        dispatch(getRepoByCategoryName(catecoryName));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    init(userId, recommendCategory);
  }, [init, userId]);

  return {
    allRepo,
    recommendRepo,
    likedRepo,
    recommendCategory,
  };
};

export default useMainData;
