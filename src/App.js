import React from 'react'

import './App.css';
import {
  Switch,
  Route,
  BrowserRouter
} from 'react-router-dom'

import LandingPage from './components/views/LandingPage/LandingPage'
import LoginPage from './components/views/LoginPage/LoginPage'
import RegisterPage from './components/views/RegisterPage/RegisterPage'
import FindIDPage from './components/views/FindIDPage/FindIDPage'
import FindPasswordPage from './components/views/FindPasswordPage/FindPasswordPage'
import MainPage from './components/views/MainPage/MainPage'
import MyPage from './components/views/MyPage/MyPage'
import SearchPage from './components/views/SearchPage/SearchPage'
import CreateMyMapPage from './components/views/CreateMyMapPage/CreateMyMapPage'
import { Suspense } from 'react';
import Auth from './hoc/Auth'
import "antd/dist/antd.css"
import NavBar from './components/views/NavigationBar/NavigationBar';

import styled from 'styled-components'

function App() {
  return (
    <AppFrame>
      <BrowserRouter>
        <Suspense fallback={(<div> Loading ... </div>)}>
          <Switch>
            <Route exact path="/" component={Auth(LandingPage, false)} />
            <Route exact path="/login" component={Auth(LoginPage, false)} />
            <Route exact path="/register" component={Auth(RegisterPage, null)} />
            <Route exact path="/findId" component={Auth(FindIDPage, null)} />
            <Route exact path="/findPassword" component={Auth(FindPasswordPage, null)} />
            <Route exact path="/main" component={Auth(MainPage, true)} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/new" component={CreateMyMapPage} />
            <Route exact path="/nav" component={Auth(NavBar)} />
            <Route exact path="/:userId" component={MyPage} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </AppFrame>
  );
}

export default App;

const AppFrame = styled.div`

`