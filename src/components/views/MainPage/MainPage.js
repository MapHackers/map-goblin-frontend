import React from 'react'
import MainContentSlider from './Sections/MainContentSlider'
import Slider from './Sections/NetflixSlider'
import NavBar from '../NavigationBar/NavigationBar'

const cards = [
    {
        id: 1,
        image: '/MapThumbnail/Thumbnail1.jpeg', // public 에 위치함
        title: '1983'
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

function MainPage() {
    return (
        <div>
            <NavBar />
            <MainContentSlider />
            <Slider title="내가 좋아요한 지도">
                {cards.map(card => (
                    <Slider.Item card={card} key={card.id}>item</Slider.Item>
                ))}
            </Slider>
            <Slider title="최근 검색한 지도">
                {cards.map(card => (
                    <Slider.Item card={card} key={card.id}>item</Slider.Item>
                ))}
            </Slider>
            <Slider title="제주도 드라이브 코스">
                {cards.map(card => (
                    <Slider.Item card={card} key={card.id}>item</Slider.Item>
                ))}
            </Slider>
        </div>
    )
}

export default MainPage
