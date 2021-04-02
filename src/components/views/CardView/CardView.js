import React from 'react'
import { LikeOutlined, DislikeOutlined, DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons';

function CardView( {title, hastags, like, dislike, thumbnail }) {

    return (
        <div className="CardWrapper"
            style={{
                border: '1px solid black',
                width: '150px',
                height: '250px',
                display: 'flex',
                flexDirection: 'column',
                margin: 'auto'
            }}
        >
            <div className="img">
                <img src={thumbnail} alt="" style={{ width: '148px'}}/>
            </div>
            <div className="NameDesc">
                <div className="Title">
                    {title}
                </div>
                <div className="Hastag">
                    {hastags}
                </div>
            </div>
            <div className="ButtonBox"
                style={{
                    display: 'flex',
                    marginTop: 'auto',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    width: '100%'
                }}
            >
                <div className="Like" style={{ margin: 'auto'}}>
                    <LikeOutlined />
                        {like}
                    </div>
                <div className="disLike" style={{ margin: 'auto'}}>
                    <DislikeOutlined />
                        {dislike}
                    </div>
                <div className="Clone" style={{ margin: 'auto'}}>
                    <DownloadOutlined />
                </div>
                <div className="ReadMe" style={{ margin: 'auto'}}>
                    <InfoCircleOutlined />
                </div>
            </div>
        </div>
    )
}

export default CardView
