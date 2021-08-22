import React, { useState, useEffect } from 'react';
import { Modal, Input, Rate, Select } from 'antd';
import { HeartFilled } from '@ant-design/icons';
import ImgUpload from '../Repository/ImgUpload';
import { useDispatch, useSelector } from 'react-redux';
import { fileActions } from '../../store/file';
import Api from '../../util/Api';
import { createMapDataAPI } from '../../util/api/map';
import { loadMapData } from '../../store/map';

const { kakao } = window;
const { TextArea } = Input;
const { Option } = Select;

const CreateModal = ({ latlng, isCreateModalVisible, setIsCreateModalVisible }) => {
  const [title, setTitle] = useState('');
  const [desc, setdesc] = useState('');
  const [rating, setRating] = useState(0);
  const [layer, setLayer] = useState('None');
  const [fileList, setFileList] = useState("");

  const dispatch = useDispatch();

  const mapId = useSelector((state) => state.repository.mapId);

  //* 모달이 열리고 닫힐때 데이터들 초기화
  useEffect(() => {
    return () => {
      setTitle('');
      setdesc('');
      setRating(0);
      setLayer('None');
      setFileList(null);
      dispatch(fileActions.setUpload(null));
    };
  }, [dispatch, isCreateModalVisible]);

  const handleCreateOk = async () => {
    if (layer === 'None') {
      alert(`레이어를 선택해 주세요!`);
      return;
    }
    if (rating === 0) {
      alert(`별점을 입력해 주세요!`);
      return;
    }
    if (title === '') {
      alert(`제목을 입력해 주세요!`);
      return;
    }
    console.log({ latlng, title, desc, rating, layer, fileList });

    let dataToSubmit = {
      mapId: mapId,
      layerName: layer,
      title: title,
      description: desc,
      rating: rating,
      geometry: latlng,
      thumbnail: null,
      mapDataType: 'point',
    };

    const formData = new FormData();
    if (fileList !== null) {
      formData.append('file', fileList);

      const response = await Api.post(`/files`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      dataToSubmit.thumbnail = response.data;
    } else {
      var staticMapContainer = document.getElementById('staticMap'),
        staticMapOption = {
          center: new kakao.maps.LatLng(latlng.split(',')[0], latlng.split(',')[1]),
          level: 1,
        };
      var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
      let src = staticMap.a.innerHTML
        .replaceAll('&amp;', '&')
        .match(/src=["']?([^>"']+)["'?[^>]*/gm)[0]
        .replaceAll('src', '')
        .replaceAll('"', '')
        .slice(1)
        .replace('IW=0', 'IW=400')
        .replace('IH=0', 'IH=400');
      dataToSubmit.thumbnail = src;
    }

    //* create mapdata
    try {
      await createMapDataAPI(dataToSubmit);
      dispatch(loadMapData(mapId));
      staticMapContainer.innerHTML = null;
    } catch (e) {
      console.error('지도 데이터를 추가하는데 에러가 생겼습니다.');
    }

    setIsCreateModalVisible(false);
  };

  const handleCreateCancel = () => {
    setIsCreateModalVisible(false);
  };

  return (
    <>
      <Modal
        title="마커 추가"
        visible={isCreateModalVisible}
        onOk={handleCreateOk}
        onCancel={handleCreateCancel}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2> Title </h2>
          <Input
            placeholder="마커 이름"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <h2 style={{ marginTop: '20px' }}> Description </h2>
          <TextArea
            rows={3}
            placeholder="마커 설명"
            value={desc}
            onChange={(event) => {
              setdesc(event.target.value);
            }}
          />
          <h2 style={{ marginTop: '20px' }}> Rating </h2>
          <div style={{ display: 'flex' }}>
            <Rate
              character={<HeartFilled />}
              allowHalf
              allowClear={false}
              value={rating}
              style={{ fontSize: '30px', marginBottom: '25px' }}
              onChange={(value) => {
                setRating(value);
              }}
            />
            <div style={{ marginLeft: 'auto' }}>
              <ImgUpload
                uploadProfileFile={fileList}
                setUploadProfileFile={setFileList}
                visible={latlng}
              />
            </div>
          </div>
          <div style={{ marginTop: '-70px', width: '200px' }}>
            <h2 style={{ marginTop: '20px' }}> Layer </h2>
            <Select
              value={layer}
              style={{ width: 120, marginTop: '10px' }}
              onChange={(value) => {
                setLayer(value);
              }}
            >
              <Option value="None">None</Option>
              <Option value="Layer1">Layer1</Option>
              <Option value="Layer2">Layer2</Option>
              <Option value="Layer3">Layer3</Option>
            </Select>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateModal;
