import { useSelector } from 'react-redux';

const useProfile = () => {
  const userId = useSelector((state) => state.user.userId);

  const userInfoId = useSelector((state) => state.userInfo.userId);
  const userInfoName = useSelector((state) => state.userInfo.userName);
  const userInfoDesc = useSelector((state) => state.userInfo.description);
  const userInfoProfile = useSelector((state) => state.userInfo.profile);
  const userInfoEmail = useSelector((state) => state.userInfo.userEmail);

  const isOwner = userId === userInfoId;

  return {
    userInfoName,
    userInfoDesc,
    userInfoProfile,
    userInfoEmail,
    isOwner,
  };
};

export default useProfile;
