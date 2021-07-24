import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import Auth from './hoc/Auth';
import 'antd/dist/antd.css';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FindIDPage from './pages/FindIdPage';
import FindPasswordPage from './pages/FindPasswordPage';
import MyPage from './pages/MyPage';
import SearchPage from './pages/SearchPage';
import CreateMyMapPage from './pages/CreateMyMapPage';
import RepositoryPage from './pages/RepositoryPage';
import RequestDetailPage from './pages/RequestDetailPage';
import IssueDetailPage from './pages/IssueDetailPage';
import CreateIssuePage from './pages/CreateIssuePage';
import CreateRequestPage from './pages/CreateRequestPage';
import LandingPage from './pages/LandingPage';
import MainPage from './pages/MainPage';

import Core from './containers/base/Core';

/* 
option
null => 아무나 출입이 가능한 페이지
true => 로그인한 유저만 출입이 가능한 페이지
false => 로그인한 유저는 출입 불가능한 페이지
*/

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div> Loading ... </div>}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={Auth(RegisterPage, null)} />
          <Route exact path="/findId" component={Auth(FindIDPage, null)} />
          <Route exact path="/findPassword" component={Auth(FindPasswordPage, null)} />
          <Route exact path="/main" component={MainPage} />
          <Route exact path="/search" component={Auth(SearchPage, true)} />
          <Route exact path="/new" component={Auth(CreateMyMapPage, true)} />
          <Route
            exact
            path="/:userId/repositories/:repositoryName"
            component={Auth(RepositoryPage, true)}
          />
          <Route
            exact
            path="/:userId/repositories/:repositoryName/requests"
            component={Auth(CreateRequestPage, true)}
          />
          <Route
            exact
            path="/:userId/repositories/:repositoryName/requests/:id"
            component={Auth(RequestDetailPage, true)}
          />
          <Route
            exact
            path="/:userId/repositories/:repositoryName/issues"
            component={Auth(CreateIssuePage, true)}
          />
          <Route
            exact
            path="/:userId/repositories/:repositoryName/issues/:id"
            component={Auth(IssueDetailPage, true)}
          />
          <Route exact path="/:userId" component={Auth(MyPage, true)} />
        </Switch>
      </Suspense>
      <Core />
    </BrowserRouter>
  );
}

export default App;
