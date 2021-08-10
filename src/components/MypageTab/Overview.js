import React from 'react';
import { Divider, Space, Row, Col, Empty } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import styled from 'styled-components';

import Card from '../CardView/CardView';

const Container = styled.div`
  .title {
    margin-bottom: 20px;
    text-align: left;
    font-size: 20px;
    font-weight: 700;
  }
  .chart-title {
    margin-bottom: 20px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;  }
`;

const Overview = ({ userInfoName, mapList, likeChartData, visitChartData }) => {
  return (
    <Container>
      <div className="title">{userInfoName}님의 지도 목록</div>
      {mapList.length !== 0 ? (
        <Space size="large" style={{ width: '100%' }}>
          {mapList?.map((card) => (
            <Card card={card} />
          ))}
        </Space>
      ) : (
        <Empty />
      )}

      <Divider />
      <Row>
        {likeChartData.labels.length !== 0 && (
          <Col span={12}>
            <div className="chart-title">
              {`${userInfoName}님의 지도별 좋아요 수 TOP ${likeChartData.labels.length}`}
            </div>
            <Doughnut data={likeChartData} />
          </Col>
        )}
        {visitChartData.labels.length !== 0 && (
          <Col span={12}>
            <div className="chart-title">{`${userInfoName}님의 지도별 조회 수 TOP ${visitChartData.labels.length}`}</div>
            <Doughnut data={visitChartData} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Overview;
