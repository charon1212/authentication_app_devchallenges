import {
  Avatar,
  Button,
  Container,
  Link,
  Paper,
  Typography,
  makeStyles,
  useTheme,
  TextField,
  FormControl,
} from '@material-ui/core';
import React from 'react';
import Header from './Header';
import Signature from './Signature';

const useStyles = makeStyles((theme) => ({
  backLink: {},
  paper: {
    margin: theme.spacing(2, 0, 0),
    padding: theme.spacing(2, 4, 2),
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  changePhotoButton: {
    marginLeft: theme.spacing(2),
    color: 'gray',
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

  return (
    <>
      <Header />
      <Container maxWidth='md'>
        <Link className={classes.backLink} href='#'>
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
              <Avatar
                className={classes.avatar}
                variant='square'
                src='https://www.pakutaso.com/shared/img/thumb/00_PP04_PP_TP_V.jpg'
              />
              <Button className={classes.changePhotoButton} component='label'>
                CHANGE PHOTO
                <input type='file' hidden />
              </Button>
            </div>
            <InputArea label='Name' placeholder='Enter your name...' />
            <InputArea
              label='Bio'
              placeholder='Enter your bio...'
              multiline
              rows={3}
            />
            <InputArea label='Phone' placeholder='Enter your phone...' />
            <InputArea label='Email' placeholder='Enter your email...' />
            <InputArea label='Password' placeholder='Enter your password...' />
            <Button
              className={classes.saveButton}
              variant='contained'
              color='primary'
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

type inputAreaProp = {
  label: string;
  placeholder: string;
  multiline?: boolean;
  rows?: number;
};
const InputArea: React.FC<inputAreaProp> = (props: inputAreaProp) => {
  const theme = useTheme();

  return (
    <>
      <div
        style={{
          margin: theme.spacing(0, 0, 3),
        }}
      >
        <Typography>{props.label}</Typography>
        <FormControl fullWidth>
          <TextField
            variant='outlined'
            placeholder={props.placeholder}
            multiline={props.multiline}
            rows={props.rows}
          />
        </FormControl>
      </div>
    </>
  );
};

export default UserInfoEdit;
