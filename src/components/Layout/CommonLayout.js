import React from 'react';
import { Layout } from 'antd';
import NavigationBar from '../NavigationBar/NavigationBar';

const { Footer, Content } = Layout;

const CommonLayout = ({ children }) => {
  return (
    <Layout>
      <NavigationBar />
      <Content style={{ backgroundColor: '#FFFF' }}>{children}</Content>
      <Footer style={{ textAlign: 'center', backgroundColor: 'rgba( 160, 208, 253, 0.3 )' }}>
        <h3>
          {' '}
          Our github :{' '}
          <a href="https://github.com/MapHackers" target="blank">
            https://github.com/MapHackers
          </a>
        </h3>
        <h3>
          {' '}
          User Guide :{' '}
          <a
            href="https://drive.google.com/file/d/1ovsthdtrY2N_qILpebn5zf_deiOoEGaw/view"
            target="blank"
          >
            {' '}
            User Guide{' '}
          </a>
        </h3>
      </Footer>
    </Layout>
  );
};

export default CommonLayout;
