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
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <SlideButton type="prev" />,
    nextArrow: <SlideButton type="next" />,
    drag: true,
};


function MainPage(props) {
    const [ThumbCards, setThumbCards] = useState([])
    const [LikedThumbCards, setLikedThumbCards] = useState([])

    useEffect(() => {
        Api.get('/repositories')
            .then(response => {
                response.data.data.length > 0 && setThumbCards(response.data.data)
            })
            .catch(err => {
                console.log(err)
            })
        Api.get(`/${props.user?.id}/repositories/likes`)
            .then(response => {
                console.log({ response })
                setLikedThumbCards(response.data?.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    let settings2 = {
        dots: false,
        infinite: LikedThumbCards.length > 3 ? true : false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <SlideButton type="prev" />,
        nextArrow: <SlideButton type="next" />,
        drag: true,
    };

    useEffect(() => {
        console.log(LikedThumbCards)
    }, [LikedThumbCards])

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
                    style={{ display: 'flex', verticalAlign: 'bottom', lineHeight: '1rem', fontSize: '1.5rem', fontWeight: '700', margin: '0 4% 1rem 3rem' }}
                >
                    <ExpandingText text="모든 지도 목록" />
                </div>
                <Slider {...settings}>
                    {ThumbCards.map(card => (
                        <Card title={card.name} 
                        hastags={card.hashtag} like={card.likeCount} dislike={card.dislikeCount} thumbnail={card.thumbnail} 
                        key={card.id} ownerId={card.ownerId} id={card.id} likeType={card.likeType} visitCount={card.visitCount}/>
                    ))}
                </Slider>
                {LikedThumbCards.length > 0 &&
                    <>
                        <div
                            style={{ display: 'flex', verticalAlign: 'bottom', lineHeight: '1rem', fontSize: '1.5rem', fontWeight: '700', margin: '4rem 4% 1rem 3rem' }}
                        >
                            <ExpandingText text="내가 좋아요한 지도 목록" />
                        </div>
                        <Slider {...settings2}>
                            {LikedThumbCards.map(card => (
                                <Card title={card.name} hastags={card.hashtag} like={card.likeCount} dislike={card.dislikeCount} thumbnail={card.thumbnail} 
                                key={card.id} ownerId={card.ownerId} id={card.id} likeType={card.likeType} visitCount={card.visitCount}/>
                            ))}
                        </Slider>
                    </>
                }
            </div>
        </div>
    )
}

export default MainPage
