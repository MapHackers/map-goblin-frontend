import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';

import {
  getAllRepo,
  getRepoByCategoryName,
  getLikedRepositoryByUserId,
} from '../../store/repository';

const Main = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.user.id);

  const recommendCategory = ['대학교', '맛집', '서울', '정보전달', '포탈'];

  const init = async () => {
    if (userId) {
      await dispatch(getAllRepo());
      for (const catecoryName of recommendCategory) {
        await dispatch(getRepoByCategoryName(catecoryName));
      }
      await dispatch(getLikedRepositoryByUserId(userId));
    }
  };

  useEffect(() => {
    init();
  }, [userId]);

  return <div></div>;
};

export default Main;
