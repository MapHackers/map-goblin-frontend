import React from 'react';
import styled from 'styled-components';
import { DownloadOutlined, LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { Space, List, Image } from 'antd';

import Api from '../../util/Api';

const Container = styled.div`
  .title {
    margin-bottom: 20px;
    text-align: left;
    font-size: 20px;
    font-weight: 700;
  }
`;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const Maps = ({ userInfoName, mapList, userInfoId }) => {
  return (
    <Container>
      <div className="title">{userInfoName}님의 지도 목록</div>
      <div className="demo-infinite-container" style={{ height: '700px', overflow: 'auto' }}>
        <List
          itemLayout="horizontal"
          size="large"
          layout="vertical"
          dataSource={mapList}
          pagination={{
            onChange: (page) => {},
            pageSize: 7,
          }}
          renderItem={(item) => (
            <List.Item
              actions={[
                <IconText icon={LikeOutlined} text={item.likeCount} key="list-vertical-star-o" />,
                <IconText
                  icon={DislikeOutlined}
                  text={item.dislikeCount}
                  key="list-vertical-like-o"
                />,
                <IconText icon={DownloadOutlined} text="2" key="list-vertical-message" />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Image
                    width="2rem"
                    height="2rem"
                    alt="example"
                    src={
                      item.thumbnail
                        ? Api.defaults.baseURL + '/files/' + item.thumbnail
                        : 'no-image3.png'
                    }
                    style={{ borderRadius: '10%' }}
                    preview={false}
                  />
                }
                title={
                  <a href={`/${userInfoId}/repositories/${item.name}`} style={{ fontSize: '16px' }}>
                    {item.name}
                  </a>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </Container>
  );
};

export default Maps;
