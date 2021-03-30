import { FormControl, TextField, Typography, useTheme } from '@material-ui/core';
import React from 'react'

type InputAreaProp = {
  label: string;
  placeholder: string;
  value: string;
  setter: (newValue: string) => void;
  multiline?: boolean;
  rows?: number;
  type?: string;
};

const InputArea: React.FC<InputAreaProp> = (props: InputAreaProp) => {
  const theme = useTheme();
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    props.setter(e.target.value);
  };

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
            value={props.value}
            onChange={onChangeHandler}
            placeholder={props.placeholder}
            multiline={props.multiline}
            rows={props.rows}
            type={props.type}
          />
        </FormControl>
      </div>
    </>
  );
};

export default InputArea
