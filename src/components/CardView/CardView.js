import React from 'react'
import { LikeOutlined, DislikeOutlined, DownloadOutlined, FileTextOutlined } from '@ant-design/icons';
import { Card } from 'antd';


function CardView({ title, hastags, like, dislike, thumbnail }) {

    const { Meta } = Card;

    return (
        // <div className="CardWrapper"
        //     style={{
        //         border: '1px solid black',
        //         width: '150px',
        //         height: '250px',
        //         display: 'flex',
        //         flexDirection: 'column',
        //         margin: 'auto'
        //     }}
        // >
        //     <div className="img">
        //         <img src={thumbnail} alt="" style={{ width: '10rem'}}/>
        //     </div>
        //     <div className="NameDesc">
        //         <div className="Title">
        //             {title}
        //         </div>
        //         <div className="Hastag">
        //             {hastags}
        //         </div>
        //     </div>
        //     <div className="ButtonBox"
        //         style={{
        //             display: 'flex',
        //             marginTop: 'auto',
        //             marginRight: 'auto',
        //             marginLeft: 'auto',
        //             width: '100%'
        //         }}
        //     >
        //         <div className="Like" style={{ margin: 'auto'}}>
        //             <LikeOutlined />
        //                 {like}
        //             </div>
        //         <div className="disLike" style={{ margin: 'auto'}}>
        //             <DislikeOutlined />
        //                 {dislike}
        //             </div>
        //         <div className="Clone" style={{ margin: 'auto'}}>
        //             <DownloadOutlined />
        //         </div>
        //         <div className="ReadMe" style={{ margin: 'auto'}}>
        //             <InfoCircleOutlined />
        //         </div>
        //     </div>
        // </div>
        <Card
            style={{ width: '15rem', marginLeft: '3rem', marginRight: '3rem', marginBottom: '1rem',boxShadow: '6px 6px 10px 0 rgba(169, 169, 169, 0.4)' }}
            cover={
                <img
                    alt="example"
                    src={thumbnail}
                />
            }
            actions={[
                <div>
                    <LikeOutlined key="like" />
                    <h3> {like} </h3>
                </div>,
                <div>
                    <DislikeOutlined key="disLike" />
                    <h3> {dislike} </h3>
                </div>,
                <div>
                    <DownloadOutlined key="clone" />
                </div>,
                <div>
                    <FileTextOutlined key="readMe" />
                </div>
            ]}
        >
            <Meta
                title={title}
                description={hastags}
            />
        </Card>
    )
}

export default CardView
