import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
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

import AuthRoute from './util/AuthRoute';
import NotFound from './pages/error/NotFound';

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
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/findId" component={FindIDPage} />
          <Route exact path="/findPassword" component={FindPasswordPage} />
          <AuthRoute exact path="/main" component={MainPage} />
          <AuthRoute exact path="/search" component={SearchPage} />
          <AuthRoute exact path="/new" component={CreateMyMapPage} />
          <AuthRoute
            exact
            path="/:userId/repositories/:repositoryName"
            component={RepositoryPage}
          />
          <AuthRoute
            exact
            path="/:userId/repositories/:repositoryName/requests"
            component={CreateRequestPage}
          />
          <AuthRoute
            exact
            path="/:userId/repositories/:repositoryName/requests/:id"
            component={RequestDetailPage}
          />
          <AuthRoute
            exact
            path="/:userId/repositories/:repositoryName/issues"
            component={CreateIssuePage}
          />
          <AuthRoute
            exact
            path="/:userId/repositories/:repositoryName/issues/:id"
            component={IssueDetailPage}
          />
          <AuthRoute exact path="/:userId" component={MyPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
