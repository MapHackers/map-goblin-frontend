import React, { useState, useEffect } from 'react'
import { Map, Marker } from '@ref/react-kakao-maps'
import MapController from './MapController';
import { Modal, Input, Button, Rate, Upload, Drawer, List, Select } from 'antd';
import MarkerDescription from './MarkerDescription';
import { HeartFilled } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { loadMapData } from '../../_actions/map_action'
import Api from '../../util/Api';
import ImgCrop from 'antd-img-crop';

const { kakao } = window;

const { TextArea } = Input;
const { Option } = Select;

const MapContainer = ({ mapId, authority }) => {
    //    const [mapCenter, setmapCenter] = useState(new kakao.maps.LatLng(gpsLat, gpsLng))
    const [gpsLat, setgpsLat] = useState(37.504877390232885)
    const [gpsLng, setgpsLng] = useState(126.9550496072659)
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(function (position) {
            setgpsLat(position.coords.latitude)
            setgpsLng(position.coords.longitude)
        })
    }, [])

    const dispatch = useDispatch()

    const [markers, setmarkers] = useState([])
    // const [L1markers, setL1markers] = useState([])
    // const [L2markers, setL2markers] = useState([])
    // const [L3markers, setL3markers] = useState([])

    useEffect(() => {
        console.log("USeeffect")
        dispatch(loadMapData(mapId))
            .then(response => {
                console.log("response", response)
                // response.payload.data.data.length > 0 && setmarkers(response.payload.data.data[0].mapDatas)
                let temp = []
                response.payload?.data.data.map((layer, idx) => {
                    console.log("temp : ", temp)
                    console.log("layer.mapDatas : ", layer.mapDatas)
                    temp = temp.concat(layer.mapDatas)
                    console.log("markers + layer.mapDatas : ", temp)
                    return null
                })
                setmarkers(temp)
                console.log("after mapping", temp)
            })

    }, [dispatch, mapId])

    const [isMarkerCreatable, setisMarkerCreatable] = useState(false)

    const toggleMarkerCreatable = () => {
        setisMarkerCreatable(!isMarkerCreatable)
    }

    const GpsOnClick = () => {
        console.log("GPS ONCLICK")
        if (navigator.geolocation) {
            console.log("in IF")
            navigator.geolocation.getCurrentPosition(function (position) {
                setmapCenter(new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude))
                console.log(mapCenter)
            })
        } else {
            alert("GPS 지원하지 않습니다.")
        }
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
            "layerName": deleteData[0].layerName,
            "geometry": deleteData[0].latlng,
            "mapDataType": "point"
        }
        console.log({ dataToSubmit })
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

    const onCreateMarkerLayerChange = (value) => {
        console.log(`selected ${value}`);
        setcreateMarkerInfo({
            latlng: createMarkerInfo.latlng,
            title: createMarkerInfo.title,
            description: createMarkerInfo.description,
            rating: createMarkerInfo.rating,
            layer: value
        })
    }

    const handleCreateOk = async () => {
        setisCreateModalVisible(false)
        let dataToSubmit = {
            "mapId": mapId,
            "layerName": createMarkerInfo.layer,
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
                            console.log({ createMarkerInfo })
                            setmarkers([...markers, {
                                name: createMarkerInfo.title,
                                latlng: createMarkerInfo.latlng,
                                description: createMarkerInfo.description,
                                rating: createMarkerInfo.rating,
                                thumbnail: dataToSubmit.thumbnail,
                                layerName: createMarkerInfo.layer
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
        } else {
            console.log("data To Submit : ", dataToSubmit)
            console.log("Clicked marker info", createMarkerInfo)
            console.log("LatLng", createMarkerInfo.latlng.split(",")[0], createMarkerInfo.latlng.split(",")[1])
            var staticMapContainer = document.getElementById('staticMap'), // 이미지 지도를 표시할 div  
                staticMapOption = {
                    center: new kakao.maps.LatLng(createMarkerInfo.latlng.split(",")[0], createMarkerInfo.latlng.split(",")[1]), // 이미지 지도의 중심좌표
                    level: 1 // 이미지 지도의 확대 레벨
                };

            // 이미지 지도를 표시할 div와 옵션으로 이미지 지도를 생성합니다
            var staticMap = new kakao.maps.StaticMap(staticMapContainer, staticMapOption);
            let src = staticMap?.a.innerHTML.replaceAll('&amp;', '&').match(/src=["']?([^>"']+)["'?[^>]*/gm)[0].replaceAll("src", "").replaceAll("\"", "").slice(1).replace("IW=0", "IW=400").replace("IH=0", "IH=400")
            dataToSubmit.thumbnail = src

            console.log(dataToSubmit)
            Api.post('/mapdata', dataToSubmit)
                .then(response => {
                    console.log("response : ", response, "LayerName : ", createMarkerInfo.layer)
                    setmarkers([...markers, {
                        name: createMarkerInfo.title,
                        latlng: createMarkerInfo.latlng,
                        description: createMarkerInfo.description,
                        rating: createMarkerInfo.rating,
                        layerName: createMarkerInfo.layer,
                        thumbnail: dataToSubmit.thumbnail
                    }])
                    console.log("markers : ", markers)
                })
                .catch(error => {
                    console.log(error)
                })
        }

    }

    const handleCreateCancel = () => {
        setFileList([])
        setisCreateModalVisible(false)
    }

    const [layerArr, setlayerArr] = useState(['Layer1'])
    const onLayerCheckBoxClick = (checkedValues) => {
        console.log('checked = ', checkedValues);
        setlayerArr(checkedValues)
    }

    const [createMarkerInfo, setcreateMarkerInfo] = useState({ title: "", latlng: "", description: "", rating: 0, layer: "Layer1" })

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

    useEffect(() => {
        console.log({ clickedMarker })
    }, [clickedMarker])

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
    const [mapCenter, setmapCenter] = useState(new kakao.maps.LatLng(gpsLat, gpsLng))

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
            renderItem={(item, idx) => (

                <div style={{ marginBottom: '10px', marginTop: '10px' }}
                    onClick={() => {
                        setmapCenter(new kakao.maps.LatLng(item.y, item.x))
                        setsearchdAndClickedPlace({ latlng: new kakao.maps.LatLng(item.y, item.x) })
                    }}
                    key={idx}
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
            <div id="staticMap" style={{ width: '400px', height: '400px', display: 'none' }}></div>
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
                <MapController
                    MarkerOnClick={toggleMarkerCreatable} GpsOnClick={GpsOnClick} isMarkerCreatable={isMarkerCreatable}
                    authority={authority} onLayerCheckBoxClick={onLayerCheckBoxClick} />

                {markers && markers.map((marker, idx) => (
                    <React.Fragment key={idx}>
                        {layerArr.includes(marker.layerName) &&
                            <Marker
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
                                    showDescModal()
                                }}

                            />
                        }

                    </React.Fragment>
                ))}
                <Modal title="마커 정보" visible={isDescModalVisible} onOk={handleDescOk} onCancel={handleDescCancel}
                    footer={[
                        <Button type="primary" onClick={handleDescDelete} style={{ background: 'red', border: 'red' }}>
                            {authority === "OWNER" && `삭제하기`}
                        </Button>,
                        <Button type="primary" onClick={handleDescOk}>
                            OK
                        </Button>
                    ]}
                >
                    {clickedMarker && <MarkerDescription style={{ padding: '0', margin: '0' }}
                        title={clickedMarker[0].name} description={clickedMarker[0].description} rating={clickedMarker[0].rating}
                        thumbnail={clickedMarker[0].thumbnail} mapId={mapId} latLng={clickedMarker[0].latlng} layer={clickedMarker[0].layerName}
                    />}
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
                                style={{ fontSize: '30px', marginBottom: '25px' }}
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
                        <div style={{ marginTop: '-70px' }}>
                            <h2 style={{ marginTop: '20px' }}> Layer </h2>

                            <Select defaultValue="Layer1" style={{ width: 120, marginTop: '10px' }} onChange={onCreateMarkerLayerChange}>
                                <Option value="Layer1">Layer1</Option>
                                <Option value="Layer2">Layer2</Option>
                                <Option value="Layer3">Layer3</Option>
                            </Select>
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