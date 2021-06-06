import React, { useEffect } from 'react'

const { kakao } = window

const SimpleMap = ({ data }) => {
    console.log({ data })

    useEffect(() => {
        var container = document.getElementById('map');
        var options = {
            center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
            level: 3
        };
        var map = new kakao.maps.Map(container, options);

        let addedPoints = []
        let modifidedPoints = []
        let deletePoints = []

        //console.log("LatLng", createMarkerInfo.latlng.split(",")[0], createMarkerInfo.latlng.split(",")[1])

        data.added?.map((point) => {
            console.log("Add Add!")
            const tempLatLng = new kakao.maps.LatLng(point.geometry.split(",")[0], point.geometry.split(",")[1])
            addedPoints.push(tempLatLng)
            return null
        })


        data.modified?.map((point) => {
            console.log("Add modifi")
            const tempLatLng = new kakao.maps.LatLng(point.geometry.split(",")[0], point.geometry.split(",")[1])
            modifidedPoints.push(tempLatLng)
            return null
        })


        data.delete?.map((point) => {
            console.log("Add delete")
            const tempLatLng = new kakao.maps.LatLng(point.geometry.split(",")[0], point.geometry.split(",")[1])
            deletePoints.push(tempLatLng)
            return null
        })

        console.log("Map : ", { addedPoints }, { modifidedPoints }, { deletePoints })

        // 지도를 재설정할 범위정보를 가지고 있을 LatLngBounds 객체를 생성합니다
        var bounds = new kakao.maps.LatLngBounds();
        var i, marker;

        if (addedPoints.length > 0) {
            console.log("add length : ", addedPoints.length)
            for (i = 0; i < addedPoints.length; i++) {
                // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
                marker = new kakao.maps.Marker({
                    position: addedPoints[i],
                    image: new kakao.maps.MarkerImage(
                        '/GreenLogo.png',
                        new kakao.maps.Size(44, 44),
                        { offset: new kakao.maps.Point(20, 44) }
                    ),
                    title: "추가된 마커"
                });
                marker.setMap(map);

                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(addedPoints[i]);
            }
        }

        if (modifidedPoints.length > 0) {
            for (i = 0; i < modifidedPoints.length; i++) {
                // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
                console.log("modifi length : ", modifidedPoints.length)

                marker = new kakao.maps.Marker({
                    position: modifidedPoints[i],
                    image: new kakao.maps.MarkerImage(
                        '/Logo.png',
                        new kakao.maps.Size(44, 44),
                        { offset: new kakao.maps.Point(20, 44) }
                    ),
                    title: "수정된 마커"
                });
                marker.setMap(map);

                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(modifidedPoints[i]);
            }
        }

        if(deletePoints.length > 0 ){
            for (i = 0; i < deletePoints.length; i++) {
                // 배열의 좌표들이 잘 보이게 마커를 지도에 추가합니다
                console.log("delete length : ", deletePoints.length)

                marker = new kakao.maps.Marker({
                    position: deletePoints[i],
                    image: new kakao.maps.MarkerImage(
                        '/RedLogo.png',
                        new kakao.maps.Size(44, 44),
                        { offset: new kakao.maps.Point(20, 44) },
                    ),
                    title: "삭제된 마커"
                });
                marker.setMap(map);
    
                // LatLngBounds 객체에 좌표를 추가합니다
                bounds.extend(deletePoints[i]);
            }
        }
        map.setBounds(bounds);
    }, [])

    return (
        <>
            <div id="map" style={{ width: '500px', height: '500px', marginLeft: '240px' }}></div>
        </>
    )
}

export default SimpleMap

