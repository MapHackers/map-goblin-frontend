import React, { useState } from 'react'
import { Map, Marker } from '@ref/react-kakao-maps'
import MapController from './MapController';
import { Modal, Input, Button } from 'antd';
import MarkerDescription from './MarkerDescription';


const { kakao } = window;

const MapContainer = ({ isCreate = false, saveMarkers, setSaveMarkers, handleSave }) => {

    const [markers, setmarkers] = useState([
        {
            title: '카카오',
            latlng: new kakao.maps.LatLng(37.504502, 127.053617),
            description: "카카오 건물 입니다."
        },
        {
            title: '생태연못',
            latlng: new kakao.maps.LatLng(37.506502, 127.053617),
            description: "생태 연못 입니다."
        },
        {
            title: '텃밭',
            latlng: new kakao.maps.LatLng(37.52098071008246, 127.05230727786302),
            description: "텃밭 입니다."
        },
        {
            title: '근린공원',
            latlng: new kakao.maps.LatLng(37.506502, 127.053617),
            description: "근린 공원 입니다."
        }
    ])

    const [searchedPlace, setsearchedPlace] = useState([])

    const [isMarkerCreatable, setisMarkerCreatable] = useState(false)

    const toggleMarkerCreatable = () => {
        setisMarkerCreatable(!isMarkerCreatable)
    }

    const [isDescModalVisible, setIsDescModalVisible] = useState(false);
    const [clickedMarker, setclickedMarker] = useState()

    const showDescModal = () => {
        setIsDescModalVisible(true);
    };

    const handleDescOk = () => {
        setIsDescModalVisible(false);
    };

    const handleDescCancel = () => {

        setIsDescModalVisible(false);
    };

    const handleDescDelete = () => {
        markers.splice(clickedMarker[1], 1)

        setIsDescModalVisible(false);
    }

    const [isCreateModalVisible, setisCreateModalVisible] = useState(false)

    const showCreateModal = () => {
        setisCreateModalVisible(true)
    }

    const handleCreateOk = () => {
        console.log("ok")
        setmarkers([...markers, {
            title: createMarkerInfo.title,
            latlng: createMarkerInfo.latlng,
            description: createMarkerInfo.description
        }])
        setisCreateModalVisible(false)
        console.log(createMarkerInfo)
    }

    const handleCreateCancel = () => {
        console.log("cancle")
        setisCreateModalVisible(false)
    }

    const [createMarkerInfo, setcreateMarkerInfo] = useState({ title: "", latlng: "", description: "" })

    function onMapClick(e) {
        if (isMarkerCreatable) {
            showCreateModal()
            setcreateMarkerInfo({
                latlng: e.latLng
            })
            toggleMarkerCreatable()
        }
    }

    // 검색을 위한 기능
    // var ps = new kakao.maps.services.Places();

    // ps.keywordSearch('이태원 맛집', placesSearchCB);

    // // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    // function placesSearchCB(data, status, pagination) {
    //     if (status === kakao.maps.services.Status.OK) {

    //         // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
    //         // LatLngBounds 객체에 좌표를 추가합니다
    //         var bounds = new kakao.maps.LatLngBounds();

    //         for (var i = 0; i < data.length; i++) {
    //             // console.log(data[i])
    //         }
    //     }
    // }

    return (
        <>
            {isCreate &&
                <Button
                    style={{ zIndex: 420, position: 'absolute', top: '10px', left: '100px' }}
                    onClick={async () => {
                        await setSaveMarkers(markers)
                        console.log(markers)
                    }}
                >
                    저장하기
                </Button>}

            <Map
                style={{ width: '100vw', height: '100vh' }}
                options={{
                    center: new kakao.maps.LatLng(37.506502, 127.053617),
                    level: 7
                }}
                onClick={onMapClick}
            >
                <MapController MarkerOnClick={toggleMarkerCreatable} isMarkerCreatable={isMarkerCreatable} />

                {markers.map((marker, idx) => (
                    <>
                        <Marker key={idx}
                            options={{
                                title: marker.title,
                                position: marker.latlng,
                                clickable: true,
                                image: new kakao.maps.MarkerImage(
                                    'Logo.png',
                                    new kakao.maps.Size(44, 44),
                                    { offset: new kakao.maps.Point(20, 44) }
                                )
                            }}
                            onClick={() => {
                                setclickedMarker([marker, idx])
                                console.log(marker.title)
                                showDescModal()
                            }}
                        />
                    </>
                ))}
                <Modal title="마커 정보" visible={isDescModalVisible} onOk={handleDescOk} onCancel={handleDescCancel}
                    footer={[
                        <Button type="primary" onClick={handleDescDelete} style={{ background: 'red', border: 'red' }}>
                            삭제하기
                        </Button>,
                        <Button type="primary" onClick={handleDescOk}>
                            OK
                        </Button>
                    ]}
                >
                    {/* <div>
                        <p> {clickedMarker && clickedMarker[0].title} </p>
                        <p> {clickedMarker && clickedMarker[0].description} </p>
                    </div> */}
                    {clickedMarker && <MarkerDescription style={{ padding: '0', margin: '0'}}title={clickedMarker[0].title} description={clickedMarker[0].description}/>}
                </Modal>

                <Modal title="마커 추가" visible={isCreateModalVisible} onOk={handleCreateOk} onCancel={handleCreateCancel}>
                    <div>
                        <Input
                            placeholder="마커 이름"
                            value={createMarkerInfo.title}
                            onChange={(event) => {
                                setcreateMarkerInfo({
                                    latlng: createMarkerInfo.latlng,
                                    title: event.currentTarget.value
                                })
                            }}
                        />
                        <Input
                            placeholder="마커 설명"
                            value={createMarkerInfo.description}
                            onChange={(event) => {
                                setcreateMarkerInfo({
                                    latlng: createMarkerInfo.latlng,
                                    title: createMarkerInfo.title,
                                    description: event.currentTarget.value
                                })
                            }}
                        />
                    </div>
                </Modal>


                {/* {searchedPlace.map((marker, idx) => (
                    <Marker key={idx}
                        options={{
                            title: marker.title,
                            position: marker.latlng,
                            clickable: true,
                            image: new kakao.maps.MarkerImage(
                                'Logo.png',
                                new kakao.maps.Size(44, 44),
                                { offset: new kakao.maps.Point(20, 44) }
                            )
                        }}
                    >
                        <InfoWindow
                            key={idx}
                            options={{
                                content: '<div style="padding:5px;">Hello World!</div>',
                                position: marker.latlng,
                                zIndex: 420,
                                removable: true
                            }}
                        >
                        </InfoWindow>
                    </Marker>

                ))} */}


            </Map>

        </>
    )
}

export default MapContainer