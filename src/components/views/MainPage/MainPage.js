import React from 'react'
import MainContentSlider from '../../MainContentSlider/MainContentSlider'
import NetflixSlider from '../../NetflixSlider'
import NavBar from '../../NavigationBar/NavigationBar'

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

function MainPage(props) {
    return (
        <div>
            <NavBar />
            <MainContentSlider />
            <NetflixSlider title="내가 좋아요한 지도">
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
        </div>
    )
}

export default MainPage
