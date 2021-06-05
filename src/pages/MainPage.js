import React, { useEffect, useState, lazy } from 'react'
import MainContentSlider from '../components/MainContentSlider/MainContentSlider'
import Card from '../components/CardView/CardView'
import { Divider } from 'antd'

import SlideButton from '../components/NetflixSlider/SlideButton'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ExpandingText from '../components/ExpandingText/ExpandingText'
import Api from '../util/Api'
const NavBar = lazy(() => import('../components/NavigationBar/NavigationBar'))

let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <SlideButton type="prev" />,
    nextArrow: <SlideButton type="next" />,
    drag: true
};


function MainPage(props) {
    const [ThumbCards, setThumbCards] = useState([])
    const [LikedThumbCards, setLikedThumbCards] = useState([])
    const [CategoryUnivercityThumbCards, setCategoryThumbCards] = useState([])
    const [CategorySeoulThumbCards, setCategorySeoulThumbCards] = useState([])
    const [CategoryInfoThumbCards, setCategoryInfoThumbCards] = useState([])
    const [CategoryRestThumbCards, setCategoryRestThumbCards] = useState([])

    useEffect(() => {
        Api.get('/repositories')
            .then(response => {
                response.data.data.length > 0 && setThumbCards(response.data.data)
            })
            .catch(err => {
                console.log(err)
            })
        Api.get(`/대학교/repositories/category`)
            .then(response => {
                setCategoryThumbCards(response.data?.data)
            })
            .catch(err => {
                console.log(err)
            })
        Api.get(`/서울/repositories/category`)
            .then(response => {
                setCategorySeoulThumbCards(response.data?.data)
            })
            .catch(err => {
                console.log(err)
            })
        Api.get(`/정보전달/repositories/category`)
            .then(response => {
                setCategoryInfoThumbCards(response.data?.data)
            })
            .catch(err => {
                console.log(err)
            })
        Api.get(`/맛집/repositories/category`)
            .then(response => {
                setCategoryRestThumbCards(response.data?.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (props.user?.id !== undefined && props.user?.id !== "null" && props.user?.id !== "") {
            Api.get(`/${props.user?.id}/repositories/likes`)
                .then(response => {
                    console.log({ response })
                    setLikedThumbCards(response.data?.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [props.user?.id])

    let settings2 = {
        dots: false,
        infinite: LikedThumbCards.length > 4 ? true : false,
        speed: 500,
        slidesToShow: LikedThumbCards.length > 4 ? 5 : LikedThumbCards.length,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <SlideButton type="prev" />,
        nextArrow: <SlideButton type="next" />,
        drag: true,
    }
    let settings3 = {
        dots: false,
        infinite: CategoryUnivercityThumbCards.length > 4 ? true : false,
        speed: 500,
        slidesToShow: CategoryUnivercityThumbCards.length > 4 ? 5 : CategoryUnivercityThumbCards.length,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <SlideButton type="prev" />,
        nextArrow: <SlideButton type="next" />,
        drag: true,
    };
    let settingsSeoul = {
        dots: false,
        infinite: CategorySeoulThumbCards.length > 4 ? true : false,
        speed: 500,
        slidesToShow: CategorySeoulThumbCards.length > 4 ? 5 : CategorySeoulThumbCards.length,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <SlideButton type="prev" />,
        nextArrow: <SlideButton type="next" />,
        drag: true,
    };
    let settingsInfo = {
        dots: false,
        infinite: CategoryInfoThumbCards.length > 4 ? true : false,
        speed: 500,
        slidesToShow: CategoryInfoThumbCards.length > 4 ? 5 : CategoryInfoThumbCards.length,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <SlideButton type="prev" />,
        nextArrow: <SlideButton type="next" />,
        drag: true,
    };
    let settingsRest = {
        dots: false,
        infinite: CategoryRestThumbCards.length > 4 ? true : false,
        speed: 500,
        slidesToShow: CategoryRestThumbCards.length > 4 ? 5 : CategoryRestThumbCards.length,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <SlideButton type="prev" />,
        nextArrow: <SlideButton type="next" />,
        drag: true,
    };

    useEffect(() => {
        console.log({ ThumbCards })
    }, [ThumbCards])
    return (
        <div style={{ background: '#f5f6f7' }}>
            <NavBar user={props.user} />
            <MainContentSlider />
            <Divider />
            <div style={{ padding: '3rem', paddingTop: '1rem', background: '#f5f6f7' }}>
                <div
                    style={{ display: 'flex', verticalAlign: 'bottom', lineHeight: '1rem', fontSize: '1.5rem', fontWeight: '700', margin: '0 4% 1.7rem 1rem' }}
                >
                    <ExpandingText text="모든 지도 목록" />
                </div>
                <Slider {...settings}>
                    {ThumbCards.map(card => (
                        <Card card={card} key={card.id} />
                    ))}
                </Slider>
                {LikedThumbCards.length > 0 &&
                    <>
                        <div
                            style={{ display: 'flex', verticalAlign: 'bottom', lineHeight: '1rem', fontSize: '1.5rem', fontWeight: '700', margin: '4rem 4% 1.7rem 1rem' }}
                        >
                            <ExpandingText text="내가 좋아요한 지도 목록" />
                        </div>
                        <Slider {...settings2}>
                            {LikedThumbCards.map(card => (
                                <Card card={card} key={card.id} />
                            ))}
                        </Slider>
                    </>
                }

                {CategoryUnivercityThumbCards.length > 0 &&
                    <>
                        <div
                            style={{ display: 'flex', verticalAlign: 'bottom', lineHeight: '1rem', fontSize: '1.5rem', fontWeight: '700', margin: '4rem 4% 1.7rem 1rem' }}
                        >
                            <ExpandingText text="대학교 카테고리 목록" />
                        </div>
                        <Slider {...settings3}>
                            {CategoryUnivercityThumbCards.map(card => (
                                <Card card={card} key={card.id} />
                            ))}
                        </Slider>
                    </>
                }

                {CategorySeoulThumbCards.length > 0 &&
                    <>
                        <div
                            style={{ display: 'flex', verticalAlign: 'bottom', lineHeight: '1rem', fontSize: '1.5rem', fontWeight: '700', margin: '4rem 4% 1.7rem 1rem' }}
                        >
                            <ExpandingText text="서울 카테고리 목록" />
                        </div>
                        <Slider {...settingsSeoul}>
                            {CategorySeoulThumbCards.map(card => (
                                <Card card={card} key={card.id} />
                            ))}
                        </Slider>
                    </>
                }

                {CategoryInfoThumbCards.length > 0 &&
                    <>
                        <div
                            style={{ display: 'flex', verticalAlign: 'bottom', lineHeight: '1rem', fontSize: '1.5rem', fontWeight: '700', margin: '4rem 4% 1.7rem 1rem' }}
                        >
                            <ExpandingText text="정보전달 카테고리 목록" />
                        </div>
                        <Slider {...settingsInfo}>
                            {CategoryInfoThumbCards.map(card => (
                                <Card card={card} key={card.id} />
                            ))}
                        </Slider>
                    </>
                }

                {CategoryRestThumbCards.length > 0 &&
                    <>
                        <div
                            style={{ display: 'flex', verticalAlign: 'bottom', lineHeight: '1rem', fontSize: '1.5rem', fontWeight: '700', margin: '4rem 4% 1.7rem 1rem' }}
                        >
                            <ExpandingText text="맛집 카테고리 목록" />
                        </div>
                        <Slider {...settingsRest}>
                            {CategoryRestThumbCards.map(card => (
                                <Card card={card} key={card.id} />
                            ))}
                        </Slider>
                    </>
                }
            </div>
        </div>
    )
}

export default MainPage
