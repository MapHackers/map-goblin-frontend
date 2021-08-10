import React, { useState } from 'react';
import { Modal, Input, Button, Form } from 'antd';
import MarkerDescription from './MarkerDescription';
import { deleteMapDataAPI, updateMapDataAPI } from '../../util/api/map';
import { useDispatch, useSelector } from 'react-redux';
import { loadMapData } from '../../store/map';

const { TextArea } = Input;

const DescriptionModal = ({ isDescModalVisible, setIsDescModalVisible, authority, mapId }) => {
  const [toggleUpdate, settoggleUpdate] = useState(false);
  const dispatch = useDispatch();
  const clickedMarker = useSelector((state) => state.map.clickedMarker);

  const handleDescOk = () => {
    setIsDescModalVisible(false);
  };

  const handleDescCancel = () => {
    setIsDescModalVisible(false);
  };

  const handleDescUpdate = () => {
    settoggleUpdate(!toggleUpdate);
  };

  const handleDescDelete = async () => {
    const deleteData = clickedMarker;

    let dataToSubmit = {
      mapId: mapId,
      layerName: deleteData.layerName,
      geometry: deleteData.latlng,
      mapDataType: 'point',
    };

    try {
      // TODO 삭제하기 누르고 삭제할것인지 물어보기
      await deleteMapDataAPI(dataToSubmit);
      dispatch(loadMapData(mapId));
    } catch (e) {
      console.log(e);
    }

    setIsDescModalVisible(false);
  };

  const onFinishMarkerUpdate = async (values) => {
    let dataToSubmit = {
      title: values.title,
      description: values.desc,
      mapId: mapId,
      layerName: clickedMarker.layerName,
      geometry: clickedMarker.latlng,
      mapDataType: 'point',
    };
    try {
      await updateMapDataAPI(dataToSubmit);
      dispatch(loadMapData(mapId));
      setIsDescModalVisible(false);
      settoggleUpdate(!toggleUpdate);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal
        title="마커 정보"
        visible={isDescModalVisible}
        onOk={handleDescOk}
        onCancel={handleDescCancel}
        footer={[
          <Button
            type="primary"
            onClick={handleDescUpdate}
            style={{ background: 'brown', border: 'red' }}
          >
            {authority === 'OWNER' && (!toggleUpdate ? `수정하기` : `수정취소`)}
          </Button>,
          !toggleUpdate && (
            <Button
              type="primary"
              onClick={handleDescDelete}
              style={{ background: 'red', border: 'red' }}
            >
              {authority === 'OWNER' && `삭제하기`}
            </Button>
          ),
          !toggleUpdate && (
            <Button type="primary" onClick={handleDescOk}>
              OK
            </Button>
          ),
        ]}
      >
        {!toggleUpdate ? (
          clickedMarker && <MarkerDescription mapId={mapId} />
        ) : (
          <div>
            <h1> 마커정보 수정하기 </h1>
            <Form
              name="markerUpdate"
              initialValues={{ title: clickedMarker.name, desc: clickedMarker.description }}
              onFinish={onFinishMarkerUpdate}
            >
              <Form.Item
                label="마커 이름"
                name="title"
                rules={[{ required: true, message: 'Please input title!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="마커 설명"
                name="desc"
                rules={[{ required: true, message: 'Please input description!' }]}
              >
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item>
                <div style={{ textAlign: 'center' }}>
                  <Button type="primary" htmlType="submit">
                    수정하기
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </>
  );
};

export default DescriptionModal;
