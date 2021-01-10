import React from 'react';
import { Divider, ListItemIcon, makeStyles, MenuItem } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GroupIcon from '@material-ui/icons/Group';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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
      <MenuItem className={classes.fontRed}>
        <ListItemIcon>
          <ExitToAppIcon color='secondary' />
        </ListItemIcon>
        Logout
      </MenuItem>
    </>
  );
};

export default HeaderMenuItems;
