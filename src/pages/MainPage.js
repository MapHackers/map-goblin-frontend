import React, { useEffect, useState } from 'react'
import MainContentSlider from '../components/MainContentSlider/MainContentSlider'
import NetflixSlider from '../components/NetflixSlider'
import NavBar from '../components/NavigationBar/NavigationBar'
import Card from '../components/CardView/CardView'
import { Divider } from 'antd'

import SlideButton from '../components/NetflixSlider/SlideButton'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ExpandingText from '../components/ExpandingText/ExpandingText'
import Api from '../util/Api'

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

// const ThumbCards = [
//     {
//         id: 1,
//         title: "도일이의 드라이브 코스",
//         hashtag: "#서울근교 #드라이브 코스",
//         like: 30,
//         dislike: 4,
//         image: "/3.png"
//     },
//     {
//         id: 2,
//         title: "노트북해도 눈치X 카페",
//         hashtag: "#꼬북칩초코 #마트",
//         like: 102,
//         dislike: 12,
//         image: '/1.png'
//     },
//     {
//         id: 3,
//         title: "꼬북칩 초코맛 보유 마트",
//         hashtag: "소음환영 #카페",
//         like: 42,
//         dislike: 291,
//         image: '/2.png'
//     },
//     {
//         id: 4,
//         title: "도일이의 드라이브 코스",
//         hashtag: "#서울근교 #드라이브 코스",
//         like: 30,
//         dislike: 4,
//         image: "/3.png"
//     },
//     {
//         id: 5,
//         title: "노트북해도 눈치X 카페",
//         hashtag: "#꼬북칩초코 #마트",
//         like: 102,
//         dislike: 12,
//         image: '/1.png'
//     },
//     {
//         id: 6,
//         title: "꼬북칩 초코맛 보유 마트",
//         hashtag: "소음환영 #카페",
//         like: 42,
//         dislike: 291,
//         image: '/2.png'
//     },

// ]

const cards = [
    {
        id: 1,
        image: '/MapThumbnail/Thumbnail1.jpeg', // public 에 위치함
        title: '1983',
        hastags: ''
    },
    {
        id: 2,
        image: '/MapThumbnail/Thumbnail2.jpeg',
        title: 'Russian doll'
    },
    {
        id: 3,
        image: '/MapThumbnail/Thumbnail1.jpeg',
        title: 'The rain',
    },
    {
        id: 4,
        image: '/MapThumbnail/Thumbnail2.jpeg',
        title: 'Sex education'
    },
    {
        id: 5,
        image: '/MapThumbnail/Thumbnail1.jpeg',
        title: 'Elite'
    },
    {
        id: 6,
        image: '/MapThumbnail/Thumbnail2.jpeg',
        title: 'Black mirror'
    },
    {
        id: 7,
        image: '/MapThumbnail/Thumbnail1.jpeg',
        title: 'Black mirror'
    },
    {
        id: 8,
        image: '/MapThumbnail/Thumbnail2.jpeg',
        title: 'Black mirror'
    }
];

function MainPage(props) {
    const [ThumbCards, setThumbCards] = useState([])

    useEffect(() => {
        Api.get('/repositories')
            .then(response => {
                console.log("-------------------------------", response.data.data)
                response.data.data.length > 0 && setThumbCards(response.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])
    return (
        <div style={{ background: '#f5f6f7' }}>
            <NavBar />
            <MainContentSlider />
            <Divider />
            <div style={{ padding: '3rem', paddingTop: '1rem', background: '#f5f6f7' }}>
                <div
                    style={{ display: 'flex', verticalAlign: 'bottom', lineHeight: '1rem', fontSize: '1.5rem', fontWeight: '700', margin: '0 4% 1rem 3rem' }}
                >
                    <ExpandingText text="내가 최근 방문한 페이지" />
                </div>
                <Slider {...settings}>
                    {ThumbCards.map(card => (
                        <Card title={card.name} hastags={card.hashtag} like={card.likeCount} dislike={card.dislikeCount} thumbnail={card.thumbnail} key={card.id} />
                    ))}
                </Slider>
            </div>
            {/* <div style={{ padding: '3rem', paddingTop: '1rem', background: '#f5f6f7' }}>
                <div
                    style={{ display: 'flex', verticalAlign: 'bottom', lineHeight: '1rem', fontSize: '1.5rem', fontWeight: '700', margin: '0 4% 1.5rem 3rem' }}
                >
                    <ExpandingText text="내가 좋아요한 페이지"/>
                </div>
                <Slider {...settings}>
                    {ThumbCards.map(card => (
                        <Card title={card.title} hastags={card.hashtag} like={card.like} dislike={card.dislike} thumbnail={card.image} key={card.id} />
                    ))}
                </Slider>
            </div>
            <div style={{ padding: '3rem', paddingTop: '1rem', background: '#f5f6f7' }}>
                <div
                    style={{ display: 'flex', verticalAlign: 'bottom', lineHeight: '1rem', fontSize: '1.5rem', fontWeight: '700', margin: '0 4% 1.5rem 3rem' }}
                >
                    <ExpandingText text="제주도 드라이브 코스"/>

                </div>
                <Slider {...settings}>
                    {ThumbCards.map(card => (
                        <Card title={card.title} hastags={card.hashtag} like={card.like} dislike={card.dislike} thumbnail={card.image} key={card.id} />
                    ))}
                </Slider>
            </div> */}
        </div>
    )
}

export default MainPage
