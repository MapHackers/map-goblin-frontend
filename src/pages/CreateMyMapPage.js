import React, { useState } from 'react'
import MapContainer from '../components/Map/MapContainer'
import styled from 'styled-components'
import Logo from '../components/Form/Logo'
import Title from '../components/Form/Title'
import { Input, Select, Button } from 'antd'

const { Option } = Select;
const provinceData = ['서울', '경기도'];
const cityData = {
    서울: ['동작구', '관악구', '강남구'],
    경기도: ['안양', '경기', '경기외곽'],
};

function CreateMyMapPage() {

    const [cities, setCities] = useState(cityData[provinceData[0]]);
    const [secondCity, setSecondCity] = useState(cityData[provinceData[0]][0]);
    const [firstCity, setfirstCity] = useState(provinceData[0])

    const [repositoryTitle, setrepositoryTitle] = useState("")
    const [isMapCreatable, setisMapCreatable] = useState(false)

    const [saveMarkers, setsaveMarkers] = useState()

    const handleProvinceChange = value => {
        setCities(cityData[value]);
        setfirstCity(value)
        setSecondCity(cityData[value][0]);
    };

    const onSecondCityChange = value => {
        setSecondCity(value);
    };

    const onCreateButtonClick = () => {
        setisMapCreatable(!isMapCreatable)
        console.log("레포지토리 이름 :", repositoryTitle, "cities : ", firstCity, "second City : ", secondCity)
    }

    const handleSave = () => {
        console.log(saveMarkers)
    }

    return (
        <>
            {!isMapCreatable ?
                <div>
                    <div style={{ display: 'flex', background: '#f5f6f7', position: 'relative', height: '100%' }}>
                        <FrameContainer >
                            <HeaderContainer>
                                <Logo />
                                <Title title="나만의 지도를 만들어 보아요" fontSize='3rem' />
                                <Title title="지도의 이름과 카테고리를 입력해 주세요" fontSize='2rem' />
                            </HeaderContainer>
                            <FormContainer>
                                <p> 레포지토리 이름 </p>
                                <Input
                                    value={repositoryTitle}
                                    placeholder="레포지토리 이름"
                                    onChange={(event) => {
                                        setrepositoryTitle(event.currentTarget.value)
                                    }}
                                />
                                <br />
                                <p> 카테고리 선택 </p>
                                <div>
                                    <Select defaultValue={provinceData[0]} style={{ width: 120 }} onChange={handleProvinceChange}>
                                        {provinceData.map(province => (
                                            <Option key={province}>{province}</Option>
                                        ))}
                                    </Select>
                                    <Select style={{ width: 120 }} value={secondCity} onChange={onSecondCityChange}>
                                        {cities.map(city => (
                                            <Option key={city}>{city}</Option>
                                        ))}
                                    </Select>
                                </div>

                                <Button onClick={onCreateButtonClick}> Create Map </Button>

                            </FormContainer>
                        </FrameContainer>
                    </div>
                </div>
                :
                <div>
                    <MapContainer isCreate={true} saveMarkers={saveMarkers} setSaveMarkers={setsaveMarkers} handleSave={handleSave}/>

                    <Button
                        style={{ zIndex: 420, position: 'absolute', top: '10px', left: '10px' }}
                        onClick={() => {
                            setisMapCreatable(!isMapCreatable)
                            console.log(saveMarkers)
                        }}
                    >
                        Back
                    </Button>

                </div>

            }
        </>

    )
}

export default CreateMyMapPage

const FrameContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: #f5f6f7;
    position: relative;
    display: flex;
    flex-direction: column;
`

const FormContainer = styled.div`
    position: relative;
    box-sizing: border-box;
    width: 30vw;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    @media (max-width: 850px) {
        width: 60vw;
        margin: 0 auto;
    }
`

const HeaderContainer = styled.div`
    position: relative;
    width: 50vw;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 3rem 0 3rem;
    @media (max-width: 850px) {
        width: 100vw;
        margin: 0;
    }
`