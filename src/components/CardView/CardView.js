import React, { useState } from 'react'
import { LikeOutlined, DislikeOutlined, DownloadOutlined, EyeOutlined, LikeTwoTone, DislikeTwoTone } from '@ant-design/icons';
import { Card } from 'antd';
import Api from '../../util/Api'
import { withRouter } from 'react-router-dom'
import { Image } from 'antd';


function CardView(props) {

    const { Meta } = Card;

    const [like, setlike] = useState(props.like)
    const [dislike, setdislike] = useState(props.dislike)
    const [id, setid] = useState(props.id)
    const [likeType, setlikeType] = useState(props.likeType)

    const handleLike = (id, type) => {
        Api.post(`/${id}/like`, { type: type })
            .then(response => {
                if (likeType === "LIKE") {
                    setlikeType(null)
                    setlike(like - 1)
                }
                else if (likeType === "DISLIKE"){
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
                else if (likeType === "LIKE"){
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
            style={{ width: '15rem', marginLeft: '3rem', marginRight: '3rem', marginBottom: '1rem', boxShadow: '6px 6px 10px 0 rgba(169, 169, 169, 0.4)' }}
            cover={
                <Image
                    onClick={() => {
                        console.log(props.ownerId)
                        props.history.push(`/${props.ownerId}/repositories/${props.title}`)
                    }}
                    width='15rem'
                    height='15rem'
                    alt="example"
                    src={props.thumbnail ? Api.defaults.baseURL + '/files/' + props.thumbnail : "no-image.svg"}
                    preview={false}
                />
            }
            actions={[
                <div>
                    {likeType === "LIKE" ? <LikeTwoTone key="like" onClick={() => { handleLike(id, "LIKE") }} /> : <LikeOutlined key="like" onClick={() => { handleLike(id, "LIKE") }} />}
                    <h3> {like} </h3>
                </div>,
                <div>
                    {likeType === "DISLIKE" ? <DislikeTwoTone key="dislike" onClick={() => { handleDislike(id, "DISKLIKE") }} /> : <DislikeOutlined key="dislike" onClick={() => { handleDislike(id, "DISLIKE") }} />}
                    <h3> {dislike} </h3>
                </div>,
                <div>
                    <EyeOutlined key="visit" />
                    <h3> {props.visitCount} </h3>
                </div>
                // ,
                // <div>
                //     <FileTextOutlined key="readMe" />
                // </div>
            ]}
        >
            <Meta
                title={props.title}
                description={props.hastags}
            />
        </Card>
    )
}

export default withRouter(CardView)
