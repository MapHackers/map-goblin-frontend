import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapActinos, loadMapData } from '../store/map';

const useMaps = () => {
  const dispatch = useDispatch();

  const { kakao } = window;

  const mapId = useSelector((state) => state.repository.mapId);

  const layer = useSelector((state) => state.map.layer);
  const gpsLat = useSelector((state) => state.map.gpsLat);
  const gpsLng = useSelector((state) => state.map.gpsLng);

  const [mapCenter, setmapCenter] = useState(new kakao.maps.LatLng(gpsLat, gpsLng));

  //* 지도의 데이터정보 불러오기
  useEffect(() => {
    dispatch(loadMapData(mapId));
  }, [dispatch, mapId]);

  useEffect(() => {
    setmapCenter(new kakao.maps.LatLng(gpsLat, gpsLng));
  }, [gpsLat, gpsLng, kakao.maps.LatLng]);

  const setReduxGPS = useCallback(
    (lat, lng) => {
      dispatch(
        mapActinos.setGpsLatLng({
          gpsLat: lat,
          gpsLng: lng,
        })
      );
    },
    [dispatch]
  );

  //* 유저의 GPS받아오기
  useEffect(() => {
    // TODO 로딩으로 설정 후 콜백 펑션에서 로딩을 해제 하는 방안 고려해보자
    if (navigator.geolocation) {
      //* 위치를 허용 했을때 GPS를 사용해서 맵의 중심 설정
      navigator.geolocation.getCurrentPosition((position) => {
        setReduxGPS(position.coords.latitude, position.coords.longitude);
      });
    } else {
      //* 위치를 허용 하지 않았을때 임의의 GPS설정 [중앙대학교]
      setReduxGPS(37.504877390232885, 126.9550496072659);
    }
  }, [setReduxGPS]);

  //* 레이어들에 있는 mapData들을 하나의 배열로 만들기
  //   let markers = [];
  //   layer.map((aLayer, idx) => {
  //     aLayer.mapDatas.map((data) => {
  //       let temp = { layerName: aLayer, ...data };
  //       markers.push(temp);
  //     });
  //   });

  const setclickedMarker = (marker) => {
    dispatch(mapActinos.setClickedMarker(marker));
  };

  return { layer, mapCenter, setmapCenter, setclickedMarker, setReduxGPS };
};

export default useMaps;
