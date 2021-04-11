import React from 'react'
import MainContentSlider from '../components/MainContentSlider/MainContentSlider'
import NetflixSlider from '../components/NetflixSlider'
import NavBar from '../components/NavigationBar/NavigationBar'
<<<<<<< Updated upstream

// import SlideButton from './Sections/NetflixSlider/SlideButton'

// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


// let settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     arrows: true,
//     prevArrow: <SlideButton type="prev" />,
//     nextArrow: <SlideButton type="next" />
// };
=======
import Card from '../components/CardView/CardView'
import { Divider } from 'antd'

import SlideButton from '../components/NetflixSlider/SlideButton'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

const ThumbCards = [
    {
        id: 1,
        title: "도일이의 드라이브 코스",
        hashtag: "#서울근교 #드라이브 코스",
        like: 30,
        dislike: 4,
        image: "/3.png"
    },
    {
        id: 2,
        title: "노트북해도 눈치X 카페",
        hashtag: "#꼬북칩초코 #마트",
        like: 102,
        dislike: 12,
        image: '/1.png'
    },
    {
        id: 3,
        title: "꼬북칩 초코맛 보유 마트",
        hashtag: "소음환영 #카페",
        like: 42,
        dislike: 291,
        image: '/2.png'
    },
    {
        id: 4,
        title: "도일이의 드라이브 코스",
        hashtag: "#서울근교 #드라이브 코스",
        like: 30,
        dislike: 4,
        image: "/3.png"
    },
    {
        id: 5,
        title: "노트북해도 눈치X 카페",
        hashtag: "#꼬북칩초코 #마트",
        like: 102,
        dislike: 12,
        image: '/1.png'
    },
    {
        id: 6,
        title: "꼬북칩 초코맛 보유 마트",
        hashtag: "소음환영 #카페",
        like: 42,
        dislike: 291,
        image: '/2.png'
    },

]
>>>>>>> Stashed changes

const cards = [
    {
        id: 1,
        image: '/MapThumbnail/Thumbnail1.jpeg', // public 에 위치함
<<<<<<< Updated upstream
        title: '1983'
=======
        title: '1983',
        hastags: ''
>>>>>>> Stashed changes
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
    return (
<<<<<<< Updated upstream
        <div>
            <NavBar />
            <MainContentSlider />
            <NetflixSlider title="내가 좋아요한 지도">
=======
        <div style={{ background: '#f5f6f7' }}>
            <NavBar />
            <MainContentSlider />
            {/* <NetflixSlider title="내가 좋아요한 지도">
>>>>>>> Stashed changes
                {cards.map(card => (
                    <NetflixSlider.Item card={card} key={card.id}>item</NetflixSlider.Item>
                ))}
            </NetflixSlider>
            <NetflixSlider title="최근 검색한 지도">
                {cards.map(card => (
                    <NetflixSlider.Item card={card} key={card.id}>item</NetflixSlider.Item>
                ))}
            </NetflixSlider>
            <NetflixSlider title="제주도 드라이브 코스">
                {cards.map(card => (
                    <NetflixSlider.Item card={card} key={card.id}>item</NetflixSlider.Item>
                ))}
<<<<<<< Updated upstream
            </NetflixSlider>
            {/* <div style={{ border: '1px solid black', padding: '2rem', background: 'yellow' }}>
                <Slider {...settings}>
                    {cards.map(card => (
                        <div>
                            <img style={{ height: '100%', width: '100%' }} src={card.image} alt="" />
                        </div>
                    ))}
                </Slider>
            </div> */}
=======
            </NetflixSlider> */}
            <Divider />
            <div style={{ padding: '3rem', paddingTop: '1rem', background: '#f5f6f7' }}>
                <div
                    style={{ display: 'flex', verticalAlign: 'bottom', lineHeight: '1rem', fontSize: '1.5rem', fontWeight: '700', margin: '0 4% 1.5rem 3rem' }}
                >
                    <a href={`/category`}>
                        내가 최근에 방문한 페이지
                    </a>
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
                    <a href={`/category`}>
                        내가 최근에 방문한 페이지
                    </a>
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
                    <a href={`/category`}>
                        내가 최근에 방문한 페이지
                    </a>
                </div>
                <Slider {...settings}>
                    {ThumbCards.map(card => (
                        <Card title={card.title} hastags={card.hashtag} like={card.like} dislike={card.dislike} thumbnail={card.image} key={card.id} />
                    ))}
                </Slider>
            </div>
>>>>>>> Stashed changes
        </div>
    )
}

export default MainPage
