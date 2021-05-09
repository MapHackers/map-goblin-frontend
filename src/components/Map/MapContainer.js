import React, { useState, useEffect } from 'react'
import { Map, Marker } from '@ref/react-kakao-maps'
import MapController from './MapController';
import { Modal, Input, Button, Rate, Upload, Drawer, List } from 'antd';
import MarkerDescription from './MarkerDescription';
import { HeartFilled } from '@ant-design/icons'
import { useDispatch, connect } from 'react-redux'
import { loadMapData } from '../../_actions/map_action'
import Api from '../../util/Api';

const { kakao } = window;

const { TextArea } = Input;


const MapContainer = ({ isCreate = false, saveMarkers, setSaveMarkers, handleSave, mapId, layers }) => {

    const dispatch = useDispatch()

    const [markers, setmarkers] = useState([])

    useEffect(() => {
        dispatch(loadMapData(mapId))
            .then(response => {
                // console.log("Responose", response.payload.data.data[0].mapDatas)
                response.payload.data.data.length > 0 && setmarkers(response.payload.data.data[0].mapDatas)
            })

    }, [dispatch, mapId])


    // if (layers !== null && layers !== undefined) {
    //     console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", layers.data[0].mapDatas)
    //     layers[0].mapDatas.map(mapdata => {
    //         console.log(mapdata.latlng.split(","))
    //     })
    // }
    // if (layers.data !== null & layers !== undefined) {
    //     console.log("================================")
    //     if (layers.data.length > 0) {
    //         layers.data[0].mapDatas.map(mapdata => {
    //             console.log(mapdata.latlng.split(","))
    //         })
    //     }
    // }

    // const [markers, setmarkers] = useState([
    //     {
    //         name: '카카오',
    //         latlng: new kakao.maps.LatLng(37.504502, 127.053617),
    //         description: "카카오 건물 입니다.",
    //         rating: 5
    //     },
    //     {
    //         name: '생태연못',
    //         latlng: new kakao.maps.LatLng(37.506502, 127.053617),
    //         description: "생태 연못 입니다.",
    //         rating: 4
    //     },
    //     {
    //         name: '텃밭',
    //         latlng: new kakao.maps.LatLng(37.52098071008246, 127.05230727786302),
    //         description: "텃밭 입니다.",
    //         rating: 3.5
    //     },
    //     {
    //         name: '근린공원',
    //         latlng: new kakao.maps.LatLng(37.506502, 127.053617),
    //         description: "근린 공원 입니다.",
    //         rating: 1
    //     }
    // ])


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

    const handleCreateOk = async () => {
        console.log("ok")
        await setmarkers([...markers, {
            name: createMarkerInfo.title,
            latlng: createMarkerInfo.latlng,
            description: createMarkerInfo.description,
            rating: createMarkerInfo.rating
        }])
        setisCreateModalVisible(false)
        let dataToSubmit = {
            "mapId": mapId,
            "layerName": "default1",
            "title": createMarkerInfo.title,
            "description": createMarkerInfo.description,
            "rating": createMarkerInfo.rating,
            "geometry": createMarkerInfo.latlng,
            "thumbnail": null,
            "mapDataType": "point"
        }
        Api.post('/mapdata', dataToSubmit)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
        console.log("data to submit", dataToSubmit)
    }

    const handleCreateCancel = () => {
        console.log("cancle")
        setisCreateModalVisible(false)
    }

    const [createMarkerInfo, setcreateMarkerInfo] = useState({ title: "", latlng: "", description: "", rating: null })

    function onMapClick(e) {
        if (isMarkerCreatable) {
            showCreateModal()
            console.log(`${e.latLng.La},${e.latLng.Ma}`)
            setcreateMarkerInfo({
                latlng: `${e.latLng.Ma},${e.latLng.La}`
            })
            toggleMarkerCreatable()
        }
    }

    // 검색을 위한 기능
    var ps = new kakao.maps.services.Places();


    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
        if (status === kakao.maps.services.Status.OK) {

            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            // var bounds = new kakao.maps.LatLngBounds();

            // for (var i = 0; i < data.length; i++) {
            //     console.log(data[i])
            // }
            console.log(data[0])
            setsearchedPlace(data)
        }
    }

    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        // console.log(loadedLayer)
        console.log(markers)
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const { Search } = Input;

    const [searchValue, setsearchValue] = useState()
    const [searchedPlace, setsearchedPlace] = useState([])
    const [searchdAndClickedPlace, setsearchdAndClickedPlace] = useState()

    const onSearch = () => {
        console.log(searchValue)
        ps.keywordSearch(searchValue, placesSearchCB);
        console.log(searchedPlace)
    }

    const [mapCenter, setmapCenter] = useState(new kakao.maps.LatLng(37.504877390232885, 126.9550496072659))

    const SearchedList = ({ searchedPlace }) => (
        <List
            dataSource={searchedPlace}
            header={`${searchedPlace.length} ${searchedPlace.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            pagination={{
                onChange: page => {
                    console.log(page)
                },
                pageSize: 5
            }}
            renderItem={item => (
                <>
                    <div style={{ marginBottom: '10px', marginTop: '10px' }}
                        onClick={() => {
                            setmapCenter(new kakao.maps.LatLng(item.y, item.x))
                            setsearchdAndClickedPlace({ latlng: new kakao.maps.LatLng(item.y, item.x) })
                        }}
                    >
                        <div className="head_item">
                            <strong style={{ fontSize: '1.2rem' }}> {item.place_name} </strong>
                            <span style={{ fontSize: '0.9rem', marginLeft: '3px' }}> {item.category_name.split(" ")[item.category_name.split(" ").length - 1]}</span>
                        </div>
                        <div className="info">
                            <div className="address">
                                <p style={{ margin: 0, padding: 0, color: 'GrayText' }}> {item.road_address_name}</p>
                                <p style={{ margin: 0, padding: 0, color: 'GrayText' }}> {item.address_name} </p>
                            </div>
                            <div>
                                <span style={{ color: 'green', fontSize: '0.8rem' }}> {item.phone} </span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        />
    );

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
                style={{ width: '95vw', height: '80vh' }}
                options={{
                    center: mapCenter,
                    level: 3
                }}
                onClick={onMapClick}
            >
                <Button type="primary" onClick={showDrawer} style={{ zIndex: '999', left: '10px', top: '10px' }}>
                    검색하기
                </Button>
                <Drawer
                    title="길 찾기"
                    placement="left"
                    closable={true}
                    onClose={onClose}
                    visible={visible}
                    getContainer={false}
                    style={{ position: 'absolute' }}
                    width="400"
                >
                    <Search placeholder="장소, 주소 검색" size="large" value={searchValue} onChange={(event) => { setsearchValue(event.currentTarget.value) }} onSearch={onSearch} enterButton />
                    {/* {searchedPlace && searchedPlace.map((place, idx) => (
                        <>
                            <h3> {place.place_name} </h3>
                        </>
                    ))} */}
                    <SearchedList searchedPlace={searchedPlace} />
                </Drawer>
                <MapController MarkerOnClick={toggleMarkerCreatable} isMarkerCreatable={isMarkerCreatable} />

                {markers && markers.map((marker, idx) => (
                    <>
                        <Marker key={marker.id}
                            options={{
                                title: marker.name,
                                position: new kakao.maps.LatLng(marker.latlng.split(",")[0], marker.latlng.split(",")[1]),
                                clickable: true,
                                image: new kakao.maps.MarkerImage(
                                    '../../Logo.png',
                                    new kakao.maps.Size(44, 44),
                                    { offset: new kakao.maps.Point(20, 44) }
                                )
                            }}
                            onClick={() => {
                                setclickedMarker([marker, idx])
                                console.log(marker.name)
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
                    {clickedMarker && <MarkerDescription style={{ padding: '0', margin: '0' }} title={clickedMarker[0].name} description={clickedMarker[0].description} rating={clickedMarker[0].rating} />}
                </Modal>

                <Modal title="마커 추가" visible={isCreateModalVisible} onOk={handleCreateOk} onCancel={handleCreateCancel}>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <h2> Title </h2>
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
                        <h2 style={{ marginTop: '20px' }}> Description </h2>
                        <TextArea
                            rows={3}
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
                        <h2 style={{ marginTop: '20px' }}> Rating </h2>
                        <div style={{ display: 'flex' }}>
                            <Rate character={<HeartFilled />} allowHalf
                                allowClear={false} defaultValue={5}
                                style={{ fontSize: '40px', marginBottom: '25px' }}
                                onChange={(value) => {
                                    setcreateMarkerInfo({
                                        latlng: createMarkerInfo.latlng,
                                        title: createMarkerInfo.title,
                                        description: createMarkerInfo.description,
                                        rating: value
                                    })
                                }} />
                            <div style={{ marginLeft: 'auto' }}>
                                <Upload

                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                // beforeUpload={beforeUpload}
                                // onChange={this.handleChange}
                                >
                                    upload
                        </Upload>
                            </div>
                        </div>
                    </div>
                </Modal>


                {searchdAndClickedPlace &&
                    <>
                        <Marker
                            options={{
                                position: searchdAndClickedPlace.latlng,
                                clickable: true,
                                // image: new kakao.maps.MarkerImage(
                                //     '../../Logo.png',
                                //     new kakao.maps.Size(44, 44),
                                //     { offset: new kakao.maps.Point(20, 44) }
                                // )
                            }}
                        />
                    </>}

                {/* {loadedLayer && loadedLayer.map((loaded, idx) => (
                    <>
                    <Marker key={loaded.id}
                        options={{
                            title: loaded.name,
                            position: new kakao.maps.LatLng(loaded.latlng.split(",")[0], loaded.latlng.split(",")[1]),
                            clickable: true,
                        }}
                    />
                    </>
                ))} */}

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

const mapStateToProps = state => ({
    layers: state.map.layers
})

export default connect(mapStateToProps)(MapContainer)