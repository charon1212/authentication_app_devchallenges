import {
  Button,
  Container,
  Link,
  Paper,
  Typography,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { noEMail, noImageUrl, noname, noPhoneNumber } from '../app/constant';
import { auth } from '../app/firebase/firebase';
import uploadFile from '../app/firebase/uploadFile';
import { getUserInfo, updateUserInfo } from '../app/firebase/user';
import { selectUser, update } from '../features/user/userSlice';
import AvatarEdit from './AvatarEdit';
import { pathTop } from './common/AppRouter';
import Header from './Header';
import InputArea from './InputArea';
import Signature from './Signature';

const useStyles = makeStyles((theme) => ({
  backLink: {},
  paper: {
    margin: theme.spacing(2, 0, 0),
    padding: theme.spacing(2, 4, 2),
  },
  innerContainer: {
    marginLeft: theme.spacing(0),
    padding: theme.spacing(2, 0, 0),
  },
  saveButton: {
    margin: theme.spacing(0, 0, 3),
  },
}));

const UserInfoEdit: React.FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [avatarImage, setAvatarImage] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unSub = getUserInfo(
      user,
      (userInfo) => {
        setName(userInfo.displayName || noname);
        setBio(userInfo.bio || '');
        setPhone(userInfo.phoneNumber || noPhoneNumber);
        setEmail(userInfo.email || noEMail);
      },
      (error) => {
        alert('ユーザー情報の取得に失敗しました。');
      }
    );

    return () => {
      unSub();
    };
  }, [user]);

  /** ■■■■保存処理■■■■ */
  const validate = () => {
    return true;
  };

  const save = (photoUrl?: string) => {
    const promise = updateUserInfo(user.uid, {
      photoUrl: photoUrl,
      displayName: name,
      bio: bio,
      phoneNumber: phone,
      email: email,
      password: password,
    });
    if(!promise){
      alert('認証情報の取得に失敗しました。');
      auth.signOut();
      return;
    }
    promise.then(() => {
      dispatch(update({
        displayName: name,
        photoUrl: photoUrl,
        email: email
      }));
      history.push(pathTop);
    });
  };

  const saveButtonClicked = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!validate()) return;

    if (avatarImage) {
      uploadFile(avatarImage, user.uid).then(async (snapshot) => {
        const url = await snapshot.ref.getDownloadURL();
        save(url);
      }).catch((error) => {
        alert('画像ファイルのアップロードに失敗しました。')
      });
    } else {
      save();
    }
  };

  const backButtonClicked = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    history.push(pathTop);
  }

  return (
    <>
      <Header />
      <Container maxWidth='md'>
        <Link className={classes.backLink} href='#' onClick={backButtonClicked}>
          <Typography variant='h6'>{'<  '}Back</Typography>
        </Link>
        <Paper className={classes.paper}>
          <Container className={classes.innerContainer} maxWidth='sm'>
            <Typography variant='h5'>Change Info</Typography>
            <Typography>Changes will be reflected to every services</Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                alignItems: 'center',
                margin: theme.spacing(2, 0, 2),
              }}
            >
              <AvatarEdit
                setter={setAvatarImage}
                initialImageUrl={user.photoUrl || noImageUrl}
              />
            </div>
            <InputArea
              label='Name'
              value={name}
              setter={setName}
              placeholder='Enter your name...'
            />
            <InputArea
              label='Bio'
              value={bio}
              setter={setBio}
              placeholder='Enter your bio...'
              multiline
              rows={3}
            />
            <InputArea
              label='Phone'
              value={phone}
              setter={setPhone}
              placeholder='Enter your phone...'
            />
            <InputArea
              label='Email'
              value={email}
              setter={setEmail}
              placeholder='Enter your email...'
            />
            <InputArea
              label='Password'
              value={password}
              setter={setPassword}
              placeholder='Enter your password...'
              type='password'
            />
            <Button
              className={classes.saveButton}
              variant='contained'
              color='primary'
              onClick={saveButtonClicked}
            >
              Save
            </Button>
          </Container>
        </Paper>
        <Signature />
      </Container>
    </>
  );
};

export default UserInfoEdit;
