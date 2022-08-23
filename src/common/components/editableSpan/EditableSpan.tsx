import React, { ChangeEvent, useState } from 'react';

import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';

import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  value: string;
  onChange: (newValue: string) => void;
  isDisabled: boolean;
};
export const EditableSpan = React.memo(
  ({ value, isDisabled, onChange }: PropsType): ReturnComponentType => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [title, setTitle] = useState<string>(value);
    const minTitleLength = 2;

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
      setTitle(e.currentTarget.value);
      if (e.currentTarget.value.length < minTitleLength) {
        setError('too short!');
      } else {
        setError(null);
      }
    };
    const saveChangesHandler = (): void => {
      onChange(title);
    };
    const activateEditMode = (): void => {
      setTitle(value);
      setEditMode(true);
    };
    const activateViewMode = (): void => {
      setEditMode(false);
    };
    return (
      <div>
        {editMode ? (
          <TextField
            value={title}
            margin="normal"
            variant="standard"
            label="Nickname"
            error={Boolean(error)}
            helperText={error}
            onChange={onChangeHandler}
            autoFocus
            onBlur={activateViewMode}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    disabled={isDisabled || !!error}
                    size="small"
                    variant="outlined"
                    onMouseDown={saveChangesHandler}
                  >
                    save
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <Typography variant="h6" onDoubleClick={activateEditMode}>
            {value}
            <IconButton size="small" color="default" onClick={activateEditMode}>
              <DriveFileRenameOutlineIcon />
            </IconButton>
          </Typography>
        )}
      </div>
    );
  },
);
