import React, { useState } from 'react';
import {
  LikeOutlined,
  DislikeOutlined,
  EyeOutlined,
  LikeTwoTone,
  DislikeTwoTone,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Card, Divider } from 'antd';
import Api from '../../util/Api';
import { Link, withRouter } from 'react-router-dom';
import { Image, Popover, Tag } from 'antd';

function CardView({ card }) {
  const { Meta } = Card;

  const [like, setlike] = useState(card.likeCount);
  const [dislike, setdislike] = useState(card.dislikeCount);
  const [id] = useState(card.id);
  const [likeType, setlikeType] = useState(card.likeType);

  const colorArray = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ];
  const cardHoverInfo = (
    <div style={{ width: '200px' }}>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <h2 style={{ color: '#808080' }}>
          <InfoCircleOutlined /> information{' '}
        </h2>
      </div>
      <h4>
        <text style={{ color: '#808080' }}>created By:</text> {card.userName}
      </h4>
      {card.description && (
        <div>
          <Divider>
            <h4 style={{ color: '#808080' }}> 지도 설명</h4>
          </Divider>
          <h3>{card.description}</h3>
        </div>
      )}
      {card.categories.length > 0 && (
        <div>
          <Divider>
            <h4 style={{ color: '#808080' }}> 카테고리</h4>
          </Divider>
        </div>
      )}
      <div style={{ textAlign: 'center' }}>
        {card.categories.map((category, idx) => (
          <Tag color={colorArray[idx % colorArray.length]} key={idx}>
            {category.name}
          </Tag>
        ))}
      </div>
    </div>
  );

  const handleLike = (id, type) => {
    Api.post(`/${id}/like`, { type: type })
      .then(() => {
        if (likeType === 'LIKE') {
          setlikeType(null);
          setlike(like - 1);
        } else if (likeType === 'DISLIKE') {
          setlikeType('LIKE');
          setlike(like + 1);
          setdislike(dislike - 1);
        } else {
          setlikeType('LIKE');
          setlike(like + 1);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleDislike = (id, type) => {
    Api.post(`/${id}/like`, { type: type }).then(() => {
      if (likeType === 'DISLIKE') {
        setlikeType(null);
        setdislike(dislike - 1);
      } else if (likeType === 'LIKE') {
        setlikeType('DISLIKE');
        setlike(like - 1);
        setdislike(dislike + 1);
      } else {
        setlikeType('DISLIKE');
        setdislike(dislike + 1);
      }
    });
  };

  return (
    <Card
      style={{
        width: '15rem',
        marginLeft: '1rem',
        marginRight: '1rem',
        marginBottom: '1rem',
        boxShadow: '6px 6px 10px 0 rgba(169, 169, 169, 0.4)',
      }}
      cover={
        <Link to={`/${card.ownerId}/repositories/${card.name}`}>
          <Image
            width="15rem"
            height="15rem"
            alt="example"
            src={
              card.thumbnail ? Api.defaults.baseURL + '/files/' + card.thumbnail : 'no-image3.png'
            }
            preview={false}
          />
        </Link>
      }
      actions={[
        <div>
          {likeType === 'LIKE' ? (
            <LikeTwoTone
              key="like"
              onClick={() => {
                handleLike(id, 'LIKE');
              }}
            />
          ) : (
            <LikeOutlined
              key="like"
              onClick={() => {
                handleLike(id, 'LIKE');
              }}
            />
          )}
          <h3 style={{ color: '#808080' }}> {like} </h3>
        </div>,
        <div>
          {likeType === 'DISLIKE' ? (
            <DislikeTwoTone
              key="dislike"
              onClick={() => {
                handleDislike(id, 'DISKLIKE');
              }}
            />
          ) : (
            <DislikeOutlined
              key="dislike"
              onClick={() => {
                handleDislike(id, 'DISLIKE');
              }}
            />
          )}
          <h3 style={{ color: '#808080' }}> {dislike} </h3>
        </div>,
        <div>
          <EyeOutlined key="visit" />
          <h3 style={{ color: '#808080' }}> {card.visitCount} </h3>
        </div>,
        <Popover trigger="hover" content={cardHoverInfo}>
          <div>
            <InfoCircleOutlined key="info" />
            <h3 style={{ color: '#808080' }}>Info</h3>
          </div>
        </Popover>,
      ]}
    >
      <Meta title={card.name} description={card.hastags} />
    </Card>
  );
}

export default withRouter(CardView);
