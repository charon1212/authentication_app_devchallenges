import React from 'react';
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
} from '@material-ui/core';
import clsx from 'clsx';
import Signature from './Signature';

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
  tableCellPadding: {
    padding: theme.spacing(2, 2, 2, 4),
  },
  tableColumnHeader: {
    color: 'grey',
  },
}));

const UserInfo: React.FC = () => {
  const classes = useStyles();

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
                    <Button className={classes.editButton} variant='outlined'>
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
                  データ
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
                  Xanthe Neal
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
                  I am a software developer and a big fan of devchallenges...{' '}
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
                  12345678901
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
                  xanthe.neal@example.com
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
