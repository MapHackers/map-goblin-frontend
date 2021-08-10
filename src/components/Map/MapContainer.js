import React, { useState, useEffect } from 'react';
import { Map, Marker } from '@ref/react-kakao-maps';
import MapController from './MapController';
import { Modal, Input, Button, Rate, Upload, Select, Form } from 'antd';
import MarkerDescription from './MarkerDescription';
import { HeartFilled } from '@ant-design/icons';
import Api from '../../util/Api';
import ImgCrop from 'antd-img-crop';
import useMaps from '../../hooks/useMaps';
import SearchMap from './SearchMap';
import DescriptionModal from './DescriptionModal';

const { kakao } = window;

const { TextArea } = Input;
const { Option } = Select;

const MapContainer = ({ mapId, authority }) => {
  const { layer, mapCenter, setmapCenter, clickedMarker, setclickedMarker } = useMaps();

  const [gpsLat, setgpsLat] = useState(37.504877390232885);
  const [gpsLng, setgpsLng] = useState(126.9550496072659);

  const [markers, setmarkers] = useState(layer);

  // useEffect(() => {
  //     dispatch(loadMapData(mapId))
  //         .then(response => {
  //             let temp = []
  //             response.payload?.data.data.map((layer, idx) => {
  //                 temp = temp.concat(layer.mapDatas)
  //                 return null
  //             })
  //             setmarkers(temp)
  //         })
  // }, [dispatch, mapId])

  const [isMarkerCreatable, setisMarkerCreatable] = useState(false);

  const toggleMarkerCreatable = () => {
    setisMarkerCreatable(!isMarkerCreatable);
  };

  const [isGPSLoading, setisGPSLoading] = useState(false);
  const GpsOnClick = () => {
    console.log('GPS ONCLICK');
    if (navigator.geolocation) {
      console.log('in IF');
      setisGPSLoading(true);

      navigator.geolocation.getCurrentPosition(function (position) {
        setgpsLat(position.coords.latitude);
        setgpsLng(position.coords.longitude);
      });
    } else {
      alert('GPS 지원하지 않습니다.');
    }
  };

  const [isDescModalVisible, setIsDescModalVisible] = useState(false);
  //   const [clickedMarker, setddclickedMarker] = useState();

  const showDescModal = () => {
    setIsDescModalVisible(true);
  };

  //   const handleDescOk = () => {
  //     setIsDescModalVisible(false);
  //   };

  //   const handleDescCancel = () => {
  //     setIsDescModalVisible(false);
  //   };

  //   const handleDescDelete = async () => {
  //     let deleteData = markers.splice(clickedMarker[1], 1);
  //     let dataToSubmit = {
  //       mapId: mapId,
  //       layerName: deleteData[0].layerName,
  //       geometry: deleteData[0].latlng,
  //       mapDataType: 'point',
  //     };
  //     Api.post('/mapdata/delete', dataToSubmit)
  //       .then((response) => {
  //         console.log(response);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     setIsDescModalVisible(false);
  //   };

  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);

  const showCreateModal = () => {
    setisCreateModalVisible(true);
  };

  const [selectLayer, setselectLayer] = useState('None');
  const onCreateMarkerLayerChange = (value) => {
    console.log(`selected ${value}`);
    setselectLayer(value);
    setcreateMarkerInfo({
      latlng: createMarkerInfo.latlng,
      title: createMarkerInfo.title,
      description: createMarkerInfo.description,
      rating: createMarkerInfo.rating,
      layer: value,
    });
  };

  const handleCreateOk = async () => {
    if (selectLayer === 'None') {
      alert('레이어를 선택해 주세요');
      return;
    }
    setisCreateModalVisible(false);
    let dataToSubmit = {
      mapId: mapId,
      layerName: createMarkerInfo.layer,
      title: createMarkerInfo.title,
      description: createMarkerInfo.description,
      rating: createMarkerInfo.rating,
      geometry: createMarkerInfo.latlng,
      thumbnail: null,
      mapDataType: 'point',
    };

    const formData = new FormData();

    if (fileList.length > 0) {
      formData.append('file', fileList[0].originFileObj);

      Api.post('/files', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
          dataToSubmit.thumbnail = response.data;
          console.log('data To Submit : ', dataToSubmit);

          Api.post('/mapdata', dataToSubmit)
            .then((response) => {
              console.log({ createMarkerInfo });
              setmarkers([
                ...markers,
                {
                  name: createMarkerInfo.title,
                  latlng: createMarkerInfo.latlng,
                  description: createMarkerInfo.description,
                  rating: createMarkerInfo.rating,
                  thumbnail: dataToSubmit.thumbnail,
                  layerName: createMarkerInfo.layer,
                },
              ]);
            })
            .catch((error) => {
              console.log(error);
            });
          setFileList([]);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    } else {
      console.log('data To Submit : ', dataToSubmit);
      console.log('Clicked marker info', createMarkerInfo);
      console.log(
        'LatLng',
        createMarkerInfo.latlng.split(',')[0],
        createMarkerInfo.latlng.split(',')[1]
      );
      var staticMapContainer = document.getElementById('staticMap'), // 이미지 지도를 표시할 div
        staticMapOption = {
          center: new kakao.maps.LatLng(
            createMarkerInfo.latlng.split(',')[0],
            createMarkerInfo.latlng.split(',')[1]
          ), // 이미지 지도의 중심좌표
          level: 1, // 이미지 지도의 확대 레벨
        };

      // 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
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
      console.log({ dataToSubmit });
      console.log({ staticMap });
      console.log(src);
      Api.post('/mapdata', dataToSubmit)
        .then((response) => {
          console.log('response : ', response, 'LayerName : ', createMarkerInfo.layer);
          setmarkers([
            ...markers,
            {
              name: createMarkerInfo.title,
              latlng: createMarkerInfo.latlng,
              description: createMarkerInfo.description,
              rating: createMarkerInfo.rating,
              layerName: createMarkerInfo.layer,
              thumbnail: dataToSubmit.thumbnail,
            },
          ]);
          console.log('markers : ', markers);
        })
        .catch((error) => {
          console.log('eeeeeeuyeiuyeiwuryweiurywie', error);
        });
    }
    setdefaultRating(0);
    setcreateMarkerInfo({
      title: '',
      latlng: '',
      description: '',
      rating: defaultRating,
      layer: 'Layer1',
    });
    let elem = document.getElementById('staticMap');
    elem.innerHTML = null;
    setselectLayer('None');
  };

  const handleCreateCancel = () => {
    setFileList([]);
    setisCreateModalVisible(false);
    setdefaultRating(0);
    setselectLayer('None');
  };

  //   const [toggleUpdate, settoggleUpdate] = useState(false);
  //   const handleDescUpdate = () => {
  //     settoggleUpdate(!toggleUpdate);
  //   };

  //   const onFinishMarkerUpdate = (values) => {
  //     let dataToSubmit = {
  //       title: values.title,
  //       description: values.desc,
  //       mapId: mapId,
  //       layerName: clickedMarker[0].layerName,
  //       geometry: clickedMarker[0].latlng,
  //       mapDataType: 'point',
  //     };
  //     Api.post(`/mapdata/update`, dataToSubmit)
  //       .then((response) => {
  //         setIsDescModalVisible(false);
  //         settoggleUpdate(!toggleUpdate);
  //         markers[markers.indexOf(clickedMarker[0])].name = values.title;
  //         markers[markers.indexOf(clickedMarker[0])].description = values.desc;
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //     console.log({ dataToSubmit });
  //   };

  const [layerArr, setlayerArr] = useState(['Layer1']);
  const onLayerCheckBoxClick = (checkedValues) => {
    setlayerArr(checkedValues);
  };

  const [defaultRating, setdefaultRating] = useState(0);
  const [createMarkerInfo, setcreateMarkerInfo] = useState({
    title: '',
    latlng: '',
    description: '',
    rating: defaultRating,
    layer: 'Layer1',
  });

  function onMapClick(e) {
    if (isMarkerCreatable) {
      showCreateModal();
      console.log(`${e.latLng.La},${e.latLng.Ma}`);
      setcreateMarkerInfo({
        latlng: `${e.latLng.Ma},${e.latLng.La}`,
      });
      toggleMarkerCreatable();
    }
  }

  const [searchdAndClickedPlace, setsearchdAndClickedPlace] = useState();

  // 파일 업로드
  const [fileList, setFileList] = useState([]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  return (
    <>
      <div id="staticMap" style={{ width: '400px', height: '400px', display: 'none' }}></div>
      <Map
        style={{ width: '95vw', height: '80vh' }}
        options={{
          center: mapCenter,
          level: 2,
        }}
        onClick={onMapClick}
        cursor={isMarkerCreatable ? 'url(../../mint.cur), help' : 'auto'}
      >
        <SearchMap
          setsearchdAndClickedPlace={setsearchdAndClickedPlace}
          setmapCenter={setmapCenter}
        />
        <MapController
          MarkerOnClick={toggleMarkerCreatable}
          GpsOnClick={GpsOnClick}
          isMarkerCreatable={isMarkerCreatable}
          authority={authority}
          onLayerCheckBoxClick={onLayerCheckBoxClick}
        />
        {layer &&
          layer.map((aLayer) => (
            <>
              {layerArr.includes(aLayer.name) &&
                aLayer.mapDatas.map((mapData, idx) => (
                  <>
                    <Marker
                      options={{
                        title: mapData.name,
                        position: new kakao.maps.LatLng(
                          mapData.latlng.split(',')[0],
                          mapData.latlng.split(',')[1]
                        ),
                        clickable: true,
                        image: new kakao.maps.MarkerImage(
                          '../../MintLogo.png',
                          new kakao.maps.Size(44, 44),
                          { offset: new kakao.maps.Point(20, 44) }
                        ),
                      }}
                      onClick={() => {
                        setclickedMarker(mapData);
                        showDescModal();
                      }}
                    />
                  </>
                ))}
            </>
          ))}
        <DescriptionModal
          isDescModalVisible={isDescModalVisible}
          setIsDescModalVisible={setIsDescModalVisible}
          authority={authority}
          mapId={mapId}
        />

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
              value={createMarkerInfo.title}
              onChange={(event) => {
                setcreateMarkerInfo({
                  latlng: createMarkerInfo.latlng,
                  title: event.currentTarget.value,
                });
              }}
            />
            <h2 style={{ marginTop: '20px' }}> Description </h2>
            <TextArea
              rows={3}
              placeholder="마커 설명"
              value={createMarkerInfo.description}
              onChange={(event) => {
                setcreateMarkerInfo({
                  latlng: createMarkerInfo.latlng,
                  title: createMarkerInfo.title,
                  description: event.currentTarget.value,
                });
              }}
            />
            <h2 style={{ marginTop: '20px' }}> Rating </h2>
            <div style={{ display: 'flex' }}>
              <Rate
                character={<HeartFilled />}
                allowHalf
                allowClear={false}
                value={defaultRating}
                style={{ fontSize: '30px', marginBottom: '25px' }}
                onChange={(value) => {
                  setdefaultRating(value);
                  setcreateMarkerInfo({
                    latlng: createMarkerInfo.latlng,
                    title: createMarkerInfo.title,
                    description: createMarkerInfo.description,
                    rating: value,
                  });
                }}
              />
              <div style={{ marginLeft: 'auto' }}>
                <ImgCrop rotate>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    beforeUpload={(file) => {
                      setFileList(fileList.concat(file));
                      return false;
                    }}
                  >
                    {fileList.length < 1 && '+ Upload'}
                  </Upload>
                </ImgCrop>
              </div>
            </div>
            <div style={{ marginTop: '-70px' }}>
              <h2 style={{ marginTop: '20px' }}> Layer </h2>
              <Select
                value={selectLayer}
                style={{ width: 120, marginTop: '10px' }}
                onChange={onCreateMarkerLayerChange}
              >
                <Option value="None">None</Option>
                <Option value="Layer1">Layer1</Option>
                <Option value="Layer2">Layer2</Option>
                <Option value="Layer3">Layer3</Option>
              </Select>
            </div>
          </div>
        </Modal>

        <Modal
          visible={isGPSLoading}
          onOk={() => {
            setisGPSLoading(!isGPSLoading);
          }}
          centered
        >
          <h1>GPS Loading...</h1>
          <h3>GPS 정보를 불러오는 데 수 초~분이 걸릴 수 있습니다.</h3>
        </Modal>

        {searchdAndClickedPlace && (
          <>
            <Marker
              options={{
                position: searchdAndClickedPlace.latlng,
                clickable: true,
                image: new kakao.maps.MarkerImage(
                  '../../SearchLogo1.png',
                  new kakao.maps.Size(44, 44),
                  { offset: new kakao.maps.Point(20, 44) }
                ),
              }}
              onClick={() => {
                setsearchdAndClickedPlace(null);
              }}
            />
          </>
        )}
      </Map>
    </>
  );
};

export default MapContainer;
