import React, { useState } from 'react'
import { LikeOutlined, DislikeOutlined, EyeOutlined, LikeTwoTone, DislikeTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import Api from '../../util/Api'
import { withRouter } from 'react-router-dom'
import { Image, Popover } from 'antd';


function CardView({card, history}) {

    const { Meta } = Card;

    const [like, setlike] = useState(card.like)
    const [dislike, setdislike] = useState(card.dislike)
    const [id,] = useState(card.id)
    const [likeType, setlikeType] = useState(card.likeType)

    const cardHoverInfo = (
        <div>
            <h3>Owner : {card.userName}</h3>
            <h3>Desc : {card.description}</h3>
        </div>
    )

    const handleLike = (id, type) => {
        Api.post(`/${id}/like`, { type: type })
            .then(() => {
                if (likeType === "LIKE") {
                    setlikeType(null)
                    setlike(like - 1)
                }
                else if (likeType === "DISLIKE") {
                    setlikeType("LIKE")
                    setlike(like + 1)
                    setdislike(dislike - 1)
                }
                else {
                    setlikeType("LIKE")
                    setlike(like + 1)
                }
            })
            .catch(err => console.log(err))
    }

    const handleDislike = (id, type) => {
        Api.post(`/${id}/like`, { type: type })
            .then(response => {
                if (likeType === "DISLIKE") {
                    setlikeType(null)
                    setdislike(dislike - 1)
                }
                else if (likeType === "LIKE") {
                    setlikeType("DISLIKE")
                    setlike(like - 1)
                    setdislike(dislike + 1)
                }
                else {
                    setlikeType("DISLIKE")
                    setdislike(dislike + 1)
                }
            })
    }

    return (
        <Card
            style={{ width: '17.5rem', marginLeft: '1rem', marginRight: '1rem', marginBottom: '1rem', boxShadow: '6px 6px 10px 0 rgba(169, 169, 169, 0.4)' }}
            cover={
                <Image
                    onClick={() => {
                        console.log(card.ownerId)
                        history.push(`/${card.ownerId}/repositories/${card.name}`)
                    }}
                    width='17.5rem'
                    height='17.5rem'
                    alt="example"
                    src={card.thumbnail ? Api.defaults.baseURL + '/files/' + card.thumbnail : "no-image.svg"}
                    preview={false}
                />
            }
            actions={[
                <div>
                    {likeType === "LIKE" ? <LikeTwoTone key="like" onClick={() => { handleLike(id, "LIKE") }} /> : <LikeOutlined key="like" onClick={() => { handleLike(id, "LIKE") }} />}
                    <h3> {card.likeCount} </h3>
                </div>,
                <div>
                    {likeType === "DISLIKE" ? <DislikeTwoTone key="dislike" onClick={() => { handleDislike(id, "DISKLIKE") }} /> : <DislikeOutlined key="dislike" onClick={() => { handleDislike(id, "DISLIKE") }} />}
                    <h3> {card.dislikeCount} </h3>
                </div>,
                <div>
                    <EyeOutlined key="visit" />
                    <h3> {card.visitCount} </h3>
                </div>,
                <Popover trigger="hover" content={cardHoverInfo}>
                    <div>
                        <InfoCircleOutlined key="info" />
                        <h3>Info</h3>
                    </div>
                </Popover>

                // ,
                // <div>
                //     <FileTextOutlined key="readMe" />
                // </div>
            ]}
        >
            <Meta
                title={card.name}
                description={card.hastags}
            />
        </Card>
    )
}

export default withRouter(CardView)
