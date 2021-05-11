import React, { useState, useEffect } from 'react'
import { Map, Marker } from '@ref/react-kakao-maps'
import MapController from './MapController';
import { Modal, Input, Button, Rate, Upload, Drawer, List } from 'antd';
import MarkerDescription from './MarkerDescription';
import { HeartFilled } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { loadMapData } from '../../_actions/map_action'
import Api from '../../util/Api';
import ImgCrop from 'antd-img-crop';

const { kakao } = window;

const { TextArea } = Input;


const MapContainer = ({ isCreate = false, mapId, authority }) => {

    const dispatch = useDispatch()

    const [markers, setmarkers] = useState([])

    useEffect(() => {
        dispatch(loadMapData(mapId))
            .then(response => {
                console.log("loaded data", response.payload.data)
                response.payload.data.data.length > 0 && setmarkers(response.payload.data.data[0].mapDatas)
            })

    }, [dispatch, mapId])

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

    const handleDescDelete = async () => {
        let deleteData = markers.splice(clickedMarker[1], 1)
        let dataToSubmit = {
            "mapId": mapId,
            "layerName": "default1",
            "geometry": deleteData[0].latlng,
            "mapDataType": "point"
        }
        console.log("delete --------------------------- ", dataToSubmit)
        Api.post('/mapdata/delete', dataToSubmit)
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })

        setIsDescModalVisible(false);
    }

    const [isCreateModalVisible, setisCreateModalVisible] = useState(false)

    const showCreateModal = () => {
        setisCreateModalVisible(true)
    }

    const handleCreateOk = async () => {
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

        const formData = new FormData();

        if (fileList.length > 0) {
            formData.append('file', fileList[0].originFileObj)

            Api.post('/files', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
                .then(response => {
                    dataToSubmit.thumbnail = response.data
                    console.log("data To Submit : ", dataToSubmit)
                    Api.post('/mapdata', dataToSubmit)
                        .then(response => {
                            console.log(response)
                            setmarkers([...markers, {
                                name: createMarkerInfo.title,
                                latlng: createMarkerInfo.latlng,
                                description: createMarkerInfo.description,
                                rating: createMarkerInfo.rating,
                                thumbnail: dataToSubmit.thumbnail
                            }])
                        })
                        .catch(error => {
                            console.log(error)
                        })
                    setFileList([])
                })
                .catch(err => {
                    alert(err.response.data.message)
                })
        } else{
            console.log("data To Submit : ", dataToSubmit)
            Api.post('/mapdata', dataToSubmit)
                .then(response => {
                    console.log(response)
                    setmarkers([...markers, {
                        name: createMarkerInfo.title,
                        latlng: createMarkerInfo.latlng,
                        description: createMarkerInfo.description,
                        rating: createMarkerInfo.rating,
                    }])
                })
                .catch(error => {
                    console.log(error)
                })
        }

    }

    const handleCreateCancel = () => {
        console.log("cancle")
        setFileList([])
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

    // 파일 업로드
    const [fileList, setFileList] = useState([])

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);

    };

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
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
            <Map
                style={{ width: '95vw', height: '80vh' }}
                options={{
                    center: mapCenter,
                    level: 2
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
                    <SearchedList searchedPlace={searchedPlace} />
                </Drawer>
                <MapController MarkerOnClick={toggleMarkerCreatable} isMarkerCreatable={isMarkerCreatable} authority={authority}/>

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
                                console.log(marker.thumbnail)
                                showDescModal()
                            }}
                        />
                    </>
                ))}

                <Modal title="마커 정보" visible={isDescModalVisible} onOk={handleDescOk} onCancel={handleDescCancel}
                    footer={[
                        <Button type="primary" onClick={handleDescDelete} style={{ background: 'red', border: 'red' }}>
                            { authority === "OWNER" && `삭제하기`}
                        </Button>,
                        <Button type="primary" onClick={handleDescOk}>
                            OK
                        </Button>
                    ]}
                >
                    {clickedMarker && <MarkerDescription style={{ padding: '0', margin: '0' }} title={clickedMarker[0].name} description={clickedMarker[0].description} rating={clickedMarker[0].rating} thumbnail={clickedMarker[0].thumbnail} />}
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
                                <ImgCrop rotate>
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={onChange}
                                        onPreview={onPreview}
                                        beforeUpload={file => {
                                            setFileList(fileList.concat(file));
                                            return false;
                                        }}
                                    >
                                        {fileList.length < 1 && '+ Upload'}
                                    </Upload>
                                </ImgCrop>
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
                                image: new kakao.maps.MarkerImage(
                                    '../../SearchLogo1.png',
                                    new kakao.maps.Size(44, 44),
                                    { offset: new kakao.maps.Point(20, 44) }
                                )
                            }}
                        />
                    </>}
            </Map>
        </>
    )
}

export default MapContainer