import React from 'react'
import Card from '../../../CardView/CardView'

const Cards = [
    {
        id: 1,
        title: "도일이의 드라이브 코스",
        hashtag : "#서울근교 #드라이브 코스",
        like: 30,
        dislike: 4,
        image: "/3.png"
    },
    {
        id: 2,
        title: "노트북해도 눈치X 카페",
        hashtag : "#꼬북칩초코 #마트",
        like: 102,
        dislike: 12,
        image: '/1.png'
    },
    {
        id: 3,
        title: "꼬북칩 초코맛 보유 마트",
        hashtag : "소음환영 #카페",
        like: 42,
        dislike: 291,
        image: '/2.png'
    }

]

function OverviewTap() {

    return (
        <div style={{ display: 'flex', height: '550px' ,flexDirection: 'column'}}>
            <div className="CardViewWrapper"
                style={{ display: 'flex', flexDirection: 'column' }}
            >
                <h3 style={{ marginRight: 'auto' }}> 내가 좋아요한 지도 </h3>
                <div className="CardWrapper"
                    style={{
                        display: 'flex',

                    }}>
                    {Cards.map( card => (
                        <Card title={card.title} hastags={card.hashtag} like={card.like} dislike={card.dislike} thumbnail={card.image} key={card.id}/>
                    ))}
                </div>
            </div>
            <div className="StatisticWrapper" style={{ display: 'flex', marginTop: 'auto'}}>
                <img src="/c1.svg" alt="pipe chart" style={{ width: '45%', margin: 'auto'}}/>
                <img src="/c2.svg" alt="line chart" style={{ width: '45%', margin: 'auto'}}/>
            </div>
        </div>
    )
}

export default OverviewTap
