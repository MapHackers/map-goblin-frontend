import React, { useEffect } from 'react'

const { kakao } = window

const SimpleMap = ({ data }) => {
    useEffect(() => {
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
            level: 3
        };
        var map = new kakao.maps.Map(container, options);

        var points = [
            new kakao.maps.LatLng(33.452278, 126.567803),
            new kakao.maps.LatLng(33.452671, 126.574792),
            new kakao.maps.LatLng(37.504877390232885, 126.9550496072659),
        ];

        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
        var bounds = new kakao.maps.LatLngBounds();

        var i, marker;
        for (i = 0; i < points.length; i++) {
            // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
            marker = new kakao.maps.Marker({ position: points[i] });
            marker.setMap(map);

            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(points[i]);
        }
        map.setBounds(bounds);
    }, [])

    return (
        <div id="map" style={{ width: '500px', height: '500px' }}></div>
    )
}

export default SimpleMap

