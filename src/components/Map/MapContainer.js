import React, { useState } from 'react';
import { Map, Marker } from '@ref/react-kakao-maps';
import MapController from './MapController';

import useMaps from '../../hooks/useMaps';
import SearchMap from './SearchMap';
import DescriptionModal from './DescriptionModal';
import CreateModal from './CreateModal';

const { kakao } = window;

const MapContainer = ({ mapId, authority }) => {
  const { layer, mapCenter, setmapCenter, setclickedMarker, setReduxGPS } = useMaps();

  //* 마커 추가버튼을 눌렀을때는 마커를 추가하고, 아닐때는 그냥 맵을 클릭 할 수 있도록
  const [isMarkerCreatable, setisMarkerCreatable] = useState(false);

  const toggleMarkerCreatable = () => {
    setisMarkerCreatable(!isMarkerCreatable);
  };

  const GpsOnClick = () => {
    if (navigator.geolocation) {
      setReduxGPS(0, 0);
      navigator.geolocation.getCurrentPosition(function (position) {
        setReduxGPS(position.coords.latitude, position.coords.longitude);
      });
    } else {
      alert('GPS 지원하지 않습니다.');
    }
  };

  //* 마커 설명 모달
  const [isDescModalVisible, setIsDescModalVisible] = useState(false);

  const showDescModal = () => {
    setIsDescModalVisible(true);
  };

  //* 마커 추가 모달
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);

  const showCreateModal = () => {
    setisCreateModalVisible(true);
  };

  const [layerArr, setlayerArr] = useState(['Layer1','Layer2']);

  const onLayerCheckBoxClick = (checkedValues) => {
    setlayerArr(checkedValues);
  };

  const [createLatlng, setCreateLatlng] = useState(null);

  function onMapClick(e) {
    if (isMarkerCreatable) {
      showCreateModal();
      setCreateLatlng(`${e.latLng.Ma},${e.latLng.La}`);
      toggleMarkerCreatable();
    }
  }

  const [searchdAndClickedPlace, setsearchdAndClickedPlace] = useState();

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

        <CreateModal
          latlng={createLatlng}
          isCreateModalVisible={isCreateModalVisible}
          setIsCreateModalVisible={setisCreateModalVisible}
        />

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
