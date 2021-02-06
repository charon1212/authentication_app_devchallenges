import React, { useEffect, useState } from 'react';
import Header from './Header';
import {
  TableContainer,
  Typography,
  makeStyles,
  Table,
  TableHead,
  TableBody,
  Paper,
  TableRow,
  TableCell,
  Container,
  Button,
  Avatar,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import Signature from './Signature';
import { selectUser } from '../features/user/userSlice';
import { pathUserInfoEdit } from './common/AppRouter';
import { useHistory } from 'react-router-dom';
import { db } from '../app/firebase/firebase';

const useStyles = makeStyles((theme) => ({
  mainTitle: {
    textAlign: 'center',
  },
  subTitle: {
    textAlign: 'center',
    margin: theme.spacing(1, 0, 4),
  },
  titleCell: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  editButton: {
    alignSelf: 'center',
    textTransform: 'none',
    marginRight: theme.spacing(2),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  tableCellPadding: {
    padding: theme.spacing(2, 2, 2, 4),
  },
  tableColumnHeader: {
    color: 'grey',
  },
}));

const UserInfo: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const history = useHistory();
  const [bio, setBio] = useState('');

  const editButtonOnClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    history.push(pathUserInfoEdit);
  };

  useEffect(() => {
    const userDoc = db.collection('users').doc(user.uid);
    const unSub = userDoc.onSnapshot(
      (snapshot) => {
        if (snapshot.exists) {
          setBio(snapshot.get('bio'));
        } else {
          setBio('');
        }
      },
      (error) => {
        alert('ユーザー情報の取得に失敗しました。');
      }
    );
    return () => {
      unSub();
    };
  }, [user]);

  return (
    <>
      <Header />
      <Typography className={classes.mainTitle} variant='h3'>
        Personal info
      </Typography>
      <Typography className={classes.subTitle} variant='h5'>
        Basic info, like your name and photo
      </Typography>
      <Container maxWidth='md'>
        <TableContainer component={Paper}>
          <Table>
            <colgroup>
              <col style={{ width: '30%' }} />
              <col style={{ width: '70%' }} />
            </colgroup>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <div className={classes.titleCell}>
                    <div>
                      <Typography variant='h5'>Profile</Typography>
                      <Typography>
                        Some info may be visible to other people
                      </Typography>
                    </div>
                    <Button
                      className={classes.editButton}
                      variant='outlined'
                      onClick={editButtonOnClick}
                    >
                      Edit
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell
                  className={clsx(
                    classes.tableCellPadding,
                    classes.tableColumnHeader
                  )}
                >
                  PHOTO
                </TableCell>
                <TableCell className={classes.tableCellPadding}>
                  <Avatar
                    className={classes.avatar}
                    variant='square'
                    alt='photo'
                    src={user.photoUrl}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  className={clsx(
                    classes.tableCellPadding,
                    classes.tableColumnHeader
                  )}
                >
                  NAME
                </TableCell>
                <TableCell className={classes.tableCellPadding}>
                  {user.displayName}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  className={clsx(
                    classes.tableCellPadding,
                    classes.tableColumnHeader
                  )}
                >
                  BIO
                </TableCell>
                <TableCell className={classes.tableCellPadding}>
                  {bio}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  className={clsx(
                    classes.tableCellPadding,
                    classes.tableColumnHeader
                  )}
                >
                  PHONE
                </TableCell>
                <TableCell className={classes.tableCellPadding}>
                  {user.phoneNumber}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  className={clsx(
                    classes.tableCellPadding,
                    classes.tableColumnHeader
                  )}
                >
                  EMAIL
                </TableCell>
                <TableCell className={classes.tableCellPadding}>
                  {user.email}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell
                  className={clsx(
                    classes.tableCellPadding,
                    classes.tableColumnHeader
                  )}
                >
                  PASSWORD
                </TableCell>
                <TableCell className={classes.tableCellPadding}>
                  ************
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Signature />
      </Container>
    </>
  );
};

export default UserInfo;
