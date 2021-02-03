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
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={SignUp} />
          <Auth loginUri='' loadingComponent={LoginLoading}>
            <Switch>
              <Route exact path='/edit' component={UserInfoEdit} />
              <Route component={UserInfo} />
            </Switch>
          </Auth>
        </Switch>
      </Router>
    </>
  );
};

export default AppRouter;
