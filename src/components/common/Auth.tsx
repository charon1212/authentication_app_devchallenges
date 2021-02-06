import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from '../..//features/user/userSlice';
import { Redirect } from 'react-router-dom';
import { auth } from '../../app/firebase/firebase';
import { pathLogin } from './AppRouter';
import { noname, noImageUrl, noEMail, noPhoneNumber } from '../../app/constant';

type Prop = {
  loginUri: string;
  loadingComponent: React.ComponentType<any>;
};

const Auth: React.FC<Prop> = (props) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [hasChecked, setHasChecked] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const unSub = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // ログインしている
        dispatch(
          login({
            uid: user.uid,
            displayName: user.displayName || noname,
            photoUrl: user.photoUrl || noImageUrl,
            email: user.email || noEMail,
            phoneNumber: user.phoneNumber || noPhoneNumber,
          })
        );
        setIsLogin(true);
      } else {
        // ログインしていない
        dispatch(logout());
        setIsLogin(false);
      }
      setHasChecked(true);
    });
    return () => unSub();
  }, [dispatch]);

  useEffect(() => {
    if (user.uid) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  return (
    <>
      {hasChecked ? (
        <>
          {isLogin ? (
            <>{props.children}</>
          ) : (
            <>
              <Redirect to={pathLogin} />
            </>
          )}
        </>
      ) : (
        <>{props.loadingComponent}</>
      )}
    </>
  );
};

export default Auth;
