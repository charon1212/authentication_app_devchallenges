import React from 'react';
import { Divider, ListItemIcon, makeStyles, MenuItem } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupIcon from '@material-ui/icons/Group';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { auth } from '../app/firebase/firebase';

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(1, 0, 1),
  },
  fontRed: {
    color: 'red',
  },
}));

const HeaderMenuItems: React.FC = () => {
  const classes = useStyles();

  const logoutOnClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    auth
      .signOut()
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <>
      <MenuItem>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        My Profile
      </MenuItem>
      <MenuItem>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        Group Chat
      </MenuItem>
      <Divider className={classes.divider} variant='inset' component='li' />
      <MenuItem className={classes.fontRed} onClick={logoutOnClick}>
        <ListItemIcon>
          <ExitToAppIcon color='secondary' />
        </ListItemIcon>
        Logout
      </MenuItem>
    </>
  );
};

export default HeaderMenuItems;
