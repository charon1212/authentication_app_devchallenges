import { makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  input: {
    opacity: 0.6,
    transition: '.3s',
    '&:hover': {
      opacity: 1,
    },
  },
}));

type Props = {
  src?: string;
  alt: string;
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
};

const ImageButton: React.FC<Props> = (props) => {
  const classes = useStyles();
  return (
    <input
      className={classes.input}
      type='image'
      src={props.src}
      alt={props.alt}
      onClick={props.onClick}
    />
  );
};

export default ImageButton;
