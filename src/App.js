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
import { Suspense } from 'react';
import "antd/dist/antd.css"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback={(<div> Loading ... </div>)}>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/findId" component={FindIDPage} />
            <Route exact path="/findPassword" component={FindPasswordPage} />
            <Route exact path="/main" component={MainPage} />
            <Route exact path="/:userId" component={MyPage} />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
