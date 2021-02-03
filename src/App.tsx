import React from 'react';
import SignUp from './components/SignUp';
import Login from './components/Login';
import UserInfo from './components/UserInfo';
import UserInfoEdit from './components/UserInfoEdit';
import AppRouter from './components/common/AppRouter';

const App: React.FC = () => {
  return <AppRouter />;
};

export default App;
