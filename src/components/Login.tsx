import React, { useState } from 'react';
import {
  Container,
  makeStyles,
  Paper,
  Typography,
  InputAdornment,
  FormControl,
  OutlinedInput,
  Button,
  Grid,
  Link,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import devchallenges from '../resource/devchallenges.svg';
import imageFacebook from '../resource/Facebook.svg';
import imageGithub from '../resource/Github.svg';
import imageGoogle from '../resource/Google.svg';
import imageTwitter from '../resource/Twitter.svg';
import ImageButton from './ImageButton';
import { useHistory } from 'react-router-dom';
import { auth, googleAuthProvider } from '../app/firebase/firebase';
import Signature from './Signature';
import { pathSignUp } from './common/AppRouter';

const useStyles = makeStyles((theme) => ({
  /** レスポンシブ対応。 */
  paper: {
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing(8),
      padding: theme.spacing(6, 8, 6),
    },
    [theme.breakpoints.down('xs')]: {
      marginTop: theme.spacing(2),
      border: 'none',
    },
  },
  boldLabel: {
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
  },
  labelCenter: {
    textAlign: 'center',
    color: 'gray',
  },
  text: {
    marginTop: theme.spacing(1),
  },
  loginButton: {
    margin: theme.spacing(2, 0, 3),
    textTransform: 'none',
  },
  gridContainer: {
    textAlign: 'center',
    margin: theme.spacing(3, 0, 3),
  },
}));

const Login: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  /** registerボタンクリック時の処理。サインアップ画面へ遷移する。 */
  const switchSignUp = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    history.push(pathSignUp);
  };
  /** Password入力欄のKeyDownイベントハンドラ */
  const passwordTextOnKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      loginButtonOnClick();
    }
  };

  /** 認証後の後処理 */
  const afterAuthentication = (
    promise: Promise<firebase.default.auth.UserCredential>
  ) => {
    promise
      .then((credential) => {
        const user = credential.user;
        if (user) {
          history.push('/');
        } else {
          alert('ログインに失敗しました。');
        }
      })
      .catch((error) => {
        const { code, message } = error;
        console.log(code); // 製品としては不要だが、学習用のサンプルとしてエラーコードが取れることを残す。
        alert(message);
      });
  };

  /** ログインボタンクリック時の処理。 */
  const loginButtonOnClick = () => {
    const promise = auth.signInWithEmailAndPassword(mail, password);
    afterAuthentication(promise);
  };

  /** Googleボタンクリック時の処理 */
  const loginGoogleButtonOnClick = () => {
    const promise = auth.signInWithPopup(googleAuthProvider);
    afterAuthentication(promise);
  };

  return (
    <>
      <Container maxWidth='sm'>
        <Paper className={classes.paper} variant='outlined'>
          <img src={devchallenges} alt='devchallenges' />
          <Typography className={classes.boldLabel}>Login</Typography>
          {/** ■■■メールアドレス■■■ */}
          <FormControl fullWidth>
            <OutlinedInput
              className={classes.text}
              placeholder='Email'
              value={mail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setMail(e.target.value);
              }}
              startAdornment={
                <InputAdornment position='start'>
                  <EmailIcon color='action' />
                </InputAdornment>
              }
            />
          </FormControl>
          {/** ■■■パスワード■■■ */}
          <FormControl fullWidth>
            <OutlinedInput
              className={classes.text}
              placeholder='Password'
              value={password}
              type='password'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
              onKeyDown={passwordTextOnKeyDown}
              startAdornment={
                <InputAdornment position='start'>
                  <LockIcon color='action' />
                </InputAdornment>
              }
            />
          </FormControl>
          {/** ■■■ログインボタン■■■ */}
          <FormControl fullWidth>
            <Button
              className={classes.loginButton}
              variant='contained'
              color='primary'
              onClick={loginButtonOnClick}
            >
              Login
            </Button>
          </FormControl>
          <Typography className={classes.labelCenter}>
            or continue with these social profile
          </Typography>
          {/** ■■■SNS認証■■■ */}
          <Grid
            className={classes.gridContainer}
            container
            spacing={2}
            justify='center'
          >
            <Grid item>
              <ImageButton
                src={imageFacebook}
                alt='Facebook'
                onClick={() => {
                  alert('ごめんなさい、Google以外未実装です。。。');
                }}
              />
            </Grid>
            <Grid item>
              <ImageButton
                src={imageGithub}
                alt='Github'
                onClick={() => {
                  alert('ごめんなさい、Google以外未実装です。。。');
                }}
              />
            </Grid>
            <Grid item>
              <ImageButton
                src={imageGoogle}
                alt='Google'
                onClick={() => {
                  loginGoogleButtonOnClick();
                }}
              />
            </Grid>
            <Grid item>
              <ImageButton
                src={imageTwitter}
                alt='Twitter'
                onClick={() => {
                  alert('ごめんなさい、Google以外未実装です。。。');
                }}
              />
            </Grid>
          </Grid>
          <Typography className={classes.labelCenter}>
            Don't have an account yet{' '}
            <Link href='#' onClick={switchSignUp}>
              Register
            </Link>
          </Typography>
        </Paper>
        <Signature />
      </Container>
    </>
  );
};

export default Login;
