import React from 'react';
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

const useStyles = makeStyles((theme) => ({
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

const SignIn: React.FC = () => {
  const classes = useStyles();
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
          <FormControl fullWidth>
            <OutlinedInput
              className={classes.text}
              placeholder='Email'
              startAdornment={
                <InputAdornment position='start'>
                  <EmailIcon color='action' />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth>
            <OutlinedInput
              className={classes.text}
              placeholder='Password'
              startAdornment={
                <InputAdornment position='start'>
                  <LockIcon color='action' />
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth>
            <Button
              className={classes.loginButton}
              variant='contained'
              color='primary'
            >
              Start coding now
            </Button>
          </FormControl>
          <Typography className={classes.labelCenter}>
            or continue with these social profile
          </Typography>
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
            Already a member?{' '}
            <Link
              href='#'
              onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                e.preventDefault();
              }}
            >
              Login
            </Link>
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default SignIn;
