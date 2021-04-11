import React from 'react';
import { Layout } from 'antd';
<<<<<<< Updated upstream
import NavigationBar from "../views/NavigationBar/NavigationBar";
=======
import NavigationBar from '../NavigationBar/NavigationBar'
>>>>>>> Stashed changes

const { Footer, Content } = Layout;

const CommonLayout = ({children}) => {
    return (
        <Layout>
            <NavigationBar/>
            <Content style={{backgroundColor:'#FFFF'}}>
                {children}
            </Content>
            <Footer style={{ textAlign: 'center', backgroundColor:'#FFFFEE' }}>
                <h3> Our github : <a href="https://github.com/MapHackers" target="blank">https://github.com/MapHackers</a></h3>
                <h3> User Guide : <a href="/guide/kr"> User Guide </a></h3>
            </Footer>
        </Layout>
    );
};

export default CommonLayout;