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
import { auth } from '../app/firebase/firebase';
import { useDispatch } from 'react-redux';
import { login } from '../features/user/userSlice';

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
  const dispatch = useDispatch();

  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  /** registerボタンクリック時の処理。サインアップ画面へ遷移する。 */
  const switchSignUp = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    history.push('/signup');
  };

  /** ログインボタンクリック時の処理。 */
  const loginButtonOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(mail, password)
      .then((credential) => {
        const user = credential.user;
        if (user) {
          dispatch(
            login({
              uid: user.uid,
              displayName: user.displayName ?? '',
              photoUrl: user.photoURL ?? '',
            })
          );
          history.push('/');
        } else {
          alert('ログインに失敗しました。');
        }
      })
      .catch((error) => {
        const { code, message } = error;
        console.log(code); // 製品としては不要だが、学習用のサンプルとしてエラーコードが取れることを残す。使わないとターミナルに警告が出る。
        alert(message);
      });
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                e.preventDefault();
                setPassword(e.target.value);
              }}
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
                  console.log('clicked');
                }}
              />
            </Grid>
            <Grid item>
              <ImageButton
                src={imageGithub}
                alt='Github'
                onClick={() => {
                  console.log('clicked');
                }}
              />
            </Grid>
            <Grid item>
              <ImageButton
                src={imageGoogle}
                alt='Google'
                onClick={() => {
                  console.log('clicked');
                }}
              />
            </Grid>
            <Grid item>
              <ImageButton
                src={imageTwitter}
                alt='Twitter'
                onClick={() => {
                  console.log('clicked');
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
      </Container>
    </>
  );
};

export default Login;
