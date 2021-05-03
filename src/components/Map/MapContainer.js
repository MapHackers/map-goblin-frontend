import React, { useEffect, useMemo } from 'react';
import MapController from './MapController';

const { kakao } = window;

const MapContainer = () => {

    // 맵을 만들때 데이터를 불러와서 기존의 마커들을 저장
    let markers = useMemo(() => [
        {
            title: '카카오',
            latlng: new kakao.maps.LatLng(37.504502, 127.053617)
        },
        {
            title: '생태연못',
            latlng: new kakao.maps.LatLng(37.506502, 127.053617)
        },
        {
            title: '텃밭',
            latlng: new kakao.maps.LatLng(37.506502, 127.053617)
        },
        {
            title: '근린공원',
            latlng: new kakao.maps.LatLng(37.506502, 127.053617)
        }
    ], [])

    let MarkerCreatable = false

    const markerImageSrc = [
        "../../assets/images/Logo.png"
    ]

    const MarkerOnClick = () => {
        MarkerCreatable = !MarkerCreatable
    }

    useEffect(() => {
        var container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.506502, 127.053617),
            level: 7
        };
        var map = new kakao.maps.Map(container, options);

        let zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        let infowindow = new kakao.maps.InfoWindow({
            zIndex: 1,
            removable: true
        });

        for (let i = 0; i < markers.length; i++) {
            // 마커를 생성합니다
            let marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: markers[i].latlng, // 마커를 표시할 위치
                title: markers[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                clickable: true, // 마커를 클릭했을 때 지도의 클릭 이벤트가 발생하지 않도록 설정합니다
                image: new kakao.maps.MarkerImage(
                    'Logo.png',
                    new kakao.maps.Size(44, 44),
                    {offset: new kakao.maps.Point(20, 44)}
                )
            });
            kakao.maps.event.addListener(marker, 'click', function () {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출
                infowindow.setContent('<div style="padding:5px;font-size:12px;"> hello world! </div>');
                infowindow.open(map, marker);
            });
        }

        function addMarker(position) {
            // 마커를 생성합니다
            let marker = new kakao.maps.Marker({
                position: position,
                image: new kakao.maps.MarkerImage(
                    'Logo.png',
                    new kakao.maps.Size(44, 44),
                    {offset: new kakao.maps.Point(20, 44)}
                )
            });
            kakao.maps.event.addListener(marker, 'click', function () {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출
                infowindow.setContent('<div style="padding:5px;font-size:12px;"> hello world! </div>');
                infowindow.open(map, marker);
            });
            // 마커가 지도 위에 표시되도록 설정합니다
            marker.setMap(map);

            markers.push({
                title: "new",
                position: position
            })
        }

        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
            if (MarkerCreatable) {
                addMarker(mouseEvent.latLng);
            }

        });

    }, [markers])


    return (
        <div id="map" style={{ width: "100%", height: "700px" }}>
            <MapController MarkerOnClick={MarkerOnClick} />
        </div>
    );
};

export default MapContainer;