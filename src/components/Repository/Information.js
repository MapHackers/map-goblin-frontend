import React from 'react';
import {
  UserOutlined,
  LikeOutlined,
  LikeTwoTone,
  DislikeOutlined,
  DislikeTwoTone,
} from '@ant-design/icons';

import { Avatar, Tag, Row, Col, Divider, Button, Statistic, Image } from 'antd';
import { useSelector } from 'react-redux';
import Api from '../../util/Api';
const Information = ({ repositoryInfo, colorArray, onClickLike, onClickClone }) => {
  const thumbnail = useSelector((state) => state.repository.thumbnail);
  return (
    <>
      <Row>
        <Col flex="auto" style={{ width: '200px' }}>
          <Row>
            <h1
              style={{
                width: '200px',
                marginBottom: '50px',
                fontSize: '2rem',
                fontWeight: '2rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '50px',
              }}
            >
              {' '}
              상세설명{' '}
            </h1>
            <h2 style={{ fontSize: '1.1rem', lineHeight: '2rem' }}>{repositoryInfo.description}</h2>
          </Row>
        </Col>
        <Col flex="auto" style={{ marginLeft: '50px', marginRight: '50px' }}>
          <Row style={{ alignContent: 'center', justifyContent: 'center' }}>
            {thumbnail !== '' && thumbnail !== 'null' ? (
              <Image
                preview={false}
                src={Api.defaults.baseURL + '/files/' + thumbnail}
                alt="Thumbnail"
                style={{ width: '45vw', height: '45vh' }}
              />
            ) : (
              <Image
                preview={false}
                src="/no-image3.png"
                alt="Thumbnail"
                style={{ width: '45vw', height: '45vh' }}
              />
            )}
          </Row>
        </Col>
        <Col flex="auto">
          <div>
            {repositoryInfo.source === 'HOST' && (
              <Button type="primary" size="large" style={{ width: '100%' }} onClick={onClickClone}>
                내 지도로 가져오기
              </Button>
            )}
            <Divider />
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="좋아요"
                  value={repositoryInfo.likeCount}
                  prefix={
                    repositoryInfo.likeType === 'LIKE' ? (
                      <LikeTwoTone
                        onClick={() => {
                          onClickLike('LIKE');
                        }}
                      />
                    ) : (
                      <LikeOutlined
                        onClick={() => {
                          onClickLike('LIKE');
                        }}
                      />
                    )
                  }
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="싫어요"
                  value={repositoryInfo.dislikeCount}
                  prefix={
                    repositoryInfo.likeType === 'DISLIKE' ? (
                      <DislikeTwoTone
                        onClick={() => {
                          onClickLike('DISLIKE');
                        }}
                      />
                    ) : (
                      <DislikeOutlined
                        onClick={() => {
                          onClickLike('DISLIKE');
                        }}
                      />
                    )
                  }
                />
              </Col>
            </Row>
            <Divider>카테고리</Divider>
            <div style={{ overflow: 'hidden', width: '200px' }}>
              {repositoryInfo.categories.map((category, idx) => {
                return (
                  <Tag
                    style={{ marginBottom: '5px' }}
                    color={colorArray[idx % colorArray.length]}
                    key={idx}
                  >
                    {category}
                  </Tag>
                );
              })}
            </div>
            <Divider>Owner의 한마디</Divider>
            <p>{repositoryInfo.oneWord}</p>
            <Divider>Owner</Divider>
            <div>
              {repositoryInfo.owners.map((ownerId, idx) => {
                return (
                  <h3 style={{ textAlign: 'left' }} key={idx}>
                    <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    &nbsp;{ownerId}
                  </h3>
                );
              })}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Information;
