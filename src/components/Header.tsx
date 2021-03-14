import React from 'react';
import {
  AppBar,
  Toolbar,
  Avatar,
  makeStyles,
  Menu,
  Link,
  withStyles,
  Typography,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { MenuProps } from '@material-ui/core/Menu';
import devchallenges from '../resource/devchallenges.svg';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import HeaderMenuItems from './HeaderMenuItems';
import { selectUser } from '../features/user/userSlice';
import { useHistory } from 'react-router-dom';
import { noImageUrl, noname } from '../app/constant';

const useStyles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: 'white',
  },
  toolbar: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(10),
      paddingRight: theme.spacing(10),
    },
  },
  avatar: {},
  link: {
    marginLeft: 'auto',
    marginRight: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  userName: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  menuArrowIcon: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  headerBottomMargin: {
    marginBottom: theme.spacing(10),
  },
}));

const StyledMenu = withStyles((theme) => ({
  paper: {
    borderRadius: theme.spacing(1),
    padding: theme.spacing(1),
  },
}))((props: MenuProps) => <Menu {...props} />);

const Header: React.FC = () => {
  const classes = useStyles();
  const user = useSelector(selectUser);
  const history = useHistory();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const linkClickHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  const topIconOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    history.push('/');
  };

  return (
    <>
      <AppBar color='inherit'>
        <Toolbar className={classes.toolbar}>
          <Link href='#' onClick={topIconOnClick}>
            <img src={devchallenges} alt='devchallenges' />
          </Link>
          <Link className={classes.link} href='#' onClick={linkClickHandler}>
            <div>
              <Avatar
                className={classes.avatar}
                variant='square'
                src={user.photoUrl || noImageUrl}
              />
            </div>
            <Typography className={classes.userName}>
              {user.displayName || noname}
            </Typography>
            {open ? (
              <ArrowDropUpIcon className={classes.menuArrowIcon} />
            ) : (
              <ArrowDropDownIcon className={classes.menuArrowIcon} />
            )}
          </Link>
          <StyledMenu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            <HeaderMenuItems />
          </StyledMenu>
        </Toolbar>
      </AppBar>
      <div className={classes.headerBottomMargin} />
    </>
  );
};

export default Header;
