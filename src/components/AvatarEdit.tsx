import { Avatar, Button, makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

type Props = {
  initialImageUrl: string;
  setter: (file: File) => void
}

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  changePhotoButton: {
    marginLeft: theme.spacing(2),
    color: 'gray',
  }
}));

const AvatarEdit: React.FC<Props> = (props) => {
  const classes = useStyles();

  const [previewImageSrc, setPreviewImageSrc] = useState<any>(props.initialImageUrl);

  const onChangeAvatarImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      props.setter(file);
      const reader = new FileReader();
      reader.onload = (f) => {
        const result = f.target?.result;
        if(result) setPreviewImageSrc(result);
      }
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Avatar
        className={classes.avatar}
        variant='square'
        src={previewImageSrc}
      />
      <Button className={classes.changePhotoButton} component='label'>
        CHANGE PHOTO
        <input type='file' hidden onChange={onChangeAvatarImage} />
      </Button>
    </>
  );
};

export default AvatarEdit;
