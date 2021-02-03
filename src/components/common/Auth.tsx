import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, login, logout } from '../..//features/user/userSlice';
import { Redirect } from 'react-router-dom';
import { auth } from '../../app/firebase/firebase';

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
            uid: authUser.uid,
            displayName: authUser.displayName || '',
            photoUrl: authUser.photoURL || '',
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
  }, []);

  return (
    <>
      {hasChecked ? (
        <>
          {isLogin ? (
            <>{props.children}</>
          ) : (
            <>
              <Redirect to='/login' />
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