import React from 'react'
import { LikeOutlined, DislikeOutlined, DownloadOutlined, FileTextOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import Api from '../../util/Api'
import { withRouter } from 'react-router-dom'
import { Image } from 'antd';


function CardView(props) {

    const { Meta } = Card;

    return (
        <Card
            style={{ width: '15rem', marginLeft: '3rem', marginRight: '3rem', marginBottom: '1rem', boxShadow: '6px 6px 10px 0 rgba(169, 169, 169, 0.4)' }}
            cover={
                <Image
                    onClick={() => { console.log(props.ownerId)
                        props.history.push(`/${props.ownerId}/repositories/${props.title}`)
                    }}
                    width= '15rem'
                    height= '15rem'
                    alt="example"
                    src={Api.defaults.baseURL + '/files/' + props.thumbnail}
                    fallback="no-image.svg"
                    preview={false}
                />
            }
            actions={[
                <div>
                    <LikeOutlined key="like" />
                    <h3> {props.like} </h3>
                </div>,
                <div>
                    <DislikeOutlined key="disLike" />
                    <h3> {props.dislike} </h3>
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
                title={props.title}
                description={props.hastags}
            />
        </Card>
    )
}

export default withRouter(CardView)
