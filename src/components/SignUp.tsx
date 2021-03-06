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
  Link,
} from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import devchallenges from '../resource/devchallenges.svg';
import { useHistory } from 'react-router-dom';
import { auth } from '../app/firebase/firebase';
import Signature from './Signature';
import { pathLogin } from './common/AppRouter';

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
  label: {
    margin: theme.spacing(2, 0, 2),
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

const SignUp: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  /** registerボタンクリック時の処理。サインアップ画面へ遷移する。 */
  const switchLogin = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    history.push(pathLogin);
  };
  /** Password入力欄のKeyDownイベントハンドラ */
  const passwordTextOnKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      signUp();
    }
  };

  /** サインアップ後の処理 */
  const afterSignUp = (
    promise: Promise<firebase.default.auth.UserCredential>
  ) => {
    promise
      .then((credential) => {
        const user = credential.user;
        if (user) {
          alert(
            'ようこそ！サインアップに成功しました。\nホーム画面に移動します。'
          );
          history.push('/');
        } else {
          alert('サインアップに失敗しました。');
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
        alert(errorMessage);
      });
  };

  /** サインアップボタンクリック時の処理。 */
  const signUp = () => {
    const promise = auth.createUserWithEmailAndPassword(mail, password);
    afterSignUp(promise);
  };

  return (
    <>
      <Container maxWidth='sm'>
        <Paper className={classes.paper} variant='outlined'>
          <img src={devchallenges} alt='devchallenges' />
          <Typography className={classes.boldLabel}>
            Join thousands of learners from
            <br />
            around the world
          </Typography>
          <Typography className={classes.label}>
            Master web development by making real-life
            <br />
            projects. There are multiple paths for you
            <br />
            choose
          </Typography>
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
          {/** ■■■サインアップボタン■■■ */}
          <FormControl fullWidth>
            <Button
              className={classes.loginButton}
              variant='contained'
              color='primary'
              onClick={signUp}
            >
              Start coding now
            </Button>
          </FormControl>
          <Typography className={classes.labelCenter}>
            or continue with these social profile
          </Typography>
          <Typography className={classes.labelCenter}>
            Already a member?{' '}
            <Link href='#' onClick={switchLogin}>
              Login
            </Link>
          </Typography>
        </Paper>
        <Signature />
      </Container>
    </>
  );
};

export default SignUp;
