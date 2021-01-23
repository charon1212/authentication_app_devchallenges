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
import { MenuProps } from '@material-ui/core/Menu';
import devchallenges from '../resource/devchallenges.svg';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import HeaderMenuItems from './HeaderMenuItems';

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
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const linkClickHandler = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  };

  return (
    <>
      <AppBar color='inherit'>
        <Toolbar className={classes.toolbar}>
          <img src={devchallenges} alt='devchallenges' />
          <Link className={classes.link} href='#' onClick={linkClickHandler}>
            <div>
              <Avatar
                className={classes.avatar}
                variant='square'
                src='https://www.pakutaso.com/shared/img/thumb/00_PP04_PP_TP_V.jpg'
              />
            </div>
            <Typography className={classes.userName}>テスト名</Typography>
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
