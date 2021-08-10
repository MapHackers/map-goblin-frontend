import React, { useCallback, useEffect, useState } from 'react';
import { Button, Alert, Modal } from 'antd';
import { selectPullDataAPI } from '../../util/api/repository';
import { useSelector } from 'react-redux';
import SimpleMap from '../Map/SimpleMap';

const PullData = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleOk = () => {
    alert('아직 준비중입니다.');
    setModalVisible(false);
  };

  const userId = useSelector((state) => state.user.userId);
  const repositoryName = useSelector((state) => state.repository.name);

  const [pullDataLoading, setPullDataLoading] = useState(false)
  const [dataToSimpleMap, setDataToSimpleMap] = useState([])

  const isPullData = useCallback(async (userId, repositoryName) => {
    try {
      const res = await selectPullDataAPI(userId, repositoryName);
      if(res.data.message === undefined){
        setPullDataLoading(true)
        setDataToSimpleMap(res.data)
      }
    } catch (e) {
      console.err(e);
    }
  }, []);

  useEffect(() => {
    isPullData(userId, repositoryName);
  }, [userId, repositoryName, isPullData]);
  return (
    <>
      {pullDataLoading && (
        <Alert
          message="원본 지도에 변경사항이 있습니다!"
          type="info"
          action={
            <Button size="middle" type="primary" onClick={showModal}>
              데이터 받기
            </Button>
          }
          style={{ marginBottom: '10px', borderRadius: '15px', fontSize: '15px' }}
        />
      )}
      <Modal
        visible={modalVisible}
        title="원본 변경 데이터"
        onCancel={handleCancel}
        width="545px"
        footer={[
          <Button key="back" onClick={handleCancel}>
            뒤로가기
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            받아오기
          </Button>,
        ]}
      >
        <div>
          <h1 style={{ fontSize: '2rem' }}> 변경사항 살펴보기 </h1>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img src="/GreenLogo.png" alt="" style={{ width: '40px', height: '40px' }} />
            <h2 style={{ marginTop: '3px', marginLeft: '10px', marginRight: '15px' }}>
              {' '}
              데이터 추가{' '}
            </h2>
            <img src="/RedLogo.png" alt="" style={{ width: '40px', height: '40px' }} />
            <h2 style={{ marginTop: '3px', marginLeft: '10px', marginRight: '15px' }}>
              {' '}
              데이터 삭제{' '}
            </h2>
            <img src="/YellowLogo.png" alt="" style={{ width: '40px', height: '40px' }} />
            <h2 style={{ marginTop: '3px', marginLeft: '10px' }}> 데이터 수정 </h2>
          </div>
          <SimpleMap data={dataToSimpleMap} type="modal" />
        </div>
      </Modal>
    </>
  );
};

export default PullData;
