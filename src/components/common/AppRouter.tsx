import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../Login';
import SignUp from '../SignUp';
import Auth from './Auth';
import LoginLoading from '../LoginLoading';
import UserInfoEdit from '../UserInfoEdit';
import UserInfo from '../UserInfo';

const AppRouter: React.FC = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path={pathLogin} component={Login} />
          <Route exact path={pathSignUp} component={SignUp} />
          <Auth loginUri={pathLogin} loadingComponent={LoginLoading}>
            <Switch>
              <Route exact path={pathUserInfoEdit} component={UserInfoEdit} />
              <Route component={UserInfo} />
            </Switch>
          </Auth>
        </Switch>
      </Router>
    </>
  );
};

export const pathTop = '/';
export const pathLogin = '/login';
export const pathSignUp = '/signup';
export const pathUserInfoEdit = '/edit';
export default AppRouter;
