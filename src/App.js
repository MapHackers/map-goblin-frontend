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
import Connect from './hoc/connectStore'
import "antd/dist/antd.css"
import NavBar from './components/views/NavigationBar/NavigationBar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={(<div> Loading ... </div>)}>
          <Switch>
            <Route exact path="/" component={Connect(LandingPage)} />
            <Route exact path="/login" component={Connect(LoginPage)} />
            <Route exact path="/register" component={Connect(RegisterPage)} />
            <Route exact path="/findId" component={Connect(FindIDPage)} />
            <Route exact path="/findPassword" component={Connect(FindPasswordPage)} />
            <Route exact path="/main" component={Connect(MainPage)} />
            <Route exact path="/search" component={SearchPage} />
            <Route exact path="/new" component={CreateMyMapPage} />
            <Route exact path="/nav" component={NavBar} />
            <Route exact path="/:userId" component={MyPage} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
