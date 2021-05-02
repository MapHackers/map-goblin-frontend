import React, { useEffect, useState } from 'react';

const { kakao } = window;

const MapContainer = () => {

    const [markers, setmarkers] = useState([
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

    ])

    useEffect(() => {
        console.log("useeffect")
        const script = document.createElement("script");
        script.async = true;
        script.src =
            "https://dapi.kakao.com/v2/maps/sdk.js?appkey=904b7a20847c748b820617f07f458b97&autoload=false";
        document.head.appendChild(script);

        script.onload = () => {
            kakao.maps.load(() => {
                let container = document.getElementById("map");
                let options = {
                    center: new kakao.maps.LatLng(37.506502, 127.053617),
                    level: 7
                };

                let map = new window.kakao.maps.Map(container, options);
                let zoomControl = new kakao.maps.ZoomControl();
                map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

                for (var i = 0; i < markers.length; i++) {
                    // 마커를 생성합니다
                    var marker = new kakao.maps.Marker({
                        map: map, // 마커를 표시할 지도
                        position: markers[i].latlng, // 마커를 표시할 위치
                        title: markers[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    });
                }

                function addMarker(position) {
                    // 마커를 생성합니다
                    var marker = new kakao.maps.Marker({
                        position: position
                    });

                    // 마커가 지도 위에 표시되도록 설정합니다
                    marker.setMap(map);

                    // 생성된 마커를 배열에 추가합니다
                    setmarkers([
                        ...markers,
                        {
                            title: "new",
                            latlng: position
                        }
                    ])
                }

                kakao.maps.event.addListener(map, 'click', function (mouseEvent) {

                    addMarker(mouseEvent.latLng);

                });
            });
        };

    }, [markers])

    return (
        <div id="map" style={{ width: "100%", height: "700px" }}>
        </div>
    );
};

export default MapContainer;