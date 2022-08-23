import React, { ChangeEvent, ReactElement, useState } from 'react';

import { Button, Checkbox, FormControlLabel } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';

import { useAppDispatch } from 'app/store';
import defaultCover from 'assets/images/defaultCover.jpg';
import { AddNewPackButton } from 'common/components/modal/addNewPackModal/AddNewPackButton';
import { ModalAction } from 'common/components/modal/modalWrapper/modalComponents/ModalAction';
import { ModalBody } from 'common/components/modal/modalWrapper/modalComponents/ModalBody';
import { ModalTitle } from 'common/components/modal/modalWrapper/modalComponents/ModalTitle';
import { ModalWrapper } from 'common/components/modal/modalWrapper/modalWrapper';
import { convertFileToBase64 } from 'common/utils/convertFileToBase64';
import { createNewPack } from 'features/packs/packs-reducer';

const zeroIndex = 0;
const maxSizeOfImage = 4000000;

export const AddNewPackModal = (): ReactElement => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [cover, setCover] = useState(defaultCover);
  const [error, setError] = useState('');

  const handleCloseModal = (): void => setIsOpen(false);

  const handleAddNewPack = (): void => {
    const coverString = cover === defaultCover ? '' : cover;
    dispatch(createNewPack(value, isChecked, coverString));
    setIsOpen(false);
    setValue('');
    setIsChecked(false);
    setCover(defaultCover);
  };

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[zeroIndex];
      if (file.size < maxSizeOfImage) {
        if (error) {
          setError('');
        }
        convertFileToBase64(file, (file64: string) => {
          setCover(file64);
        });
      } else {
        setError('File is too big');
      }
    }
  };

  const errorHandler = (): void => {
    setError('Bad image');
  };

  return (
    <div>
      <AddNewPackButton setIsOpen={() => setIsOpen(true)} />

      <ModalWrapper open={isOpen} handleClose={handleCloseModal}>
        <ModalTitle title="Add new pack" onClose={handleCloseModal} />

        <ModalBody>
          <DialogContentText>
            For adding new pack you should add name of new pack.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="newPackName"
            label="New pack name"
            type="text"
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
            fullWidth
            variant="standard"
          />
          <DialogContentText>You can choose cover for new pack.</DialogContentText>
          <hr />
          <div
            style={{
              marginTop: '10px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <img
              src={error ? defaultCover : cover}
              style={{ width: '60px' }}
              onError={errorHandler}
              alt="cover"
            />
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label>
              <input
                type="file"
                accept="image/png, image/jpg, image/svg, image/jpeg"
                onChange={uploadHandler}
                style={{ display: 'none' }}
              />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
            {!!error && <span style={{ color: 'red' }}>{error}</span>}
          </div>
          <hr />
          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked}
                name="privatePack"
                onChange={e => setIsChecked(e.currentTarget.checked)}
              />
            }
            label="set private property for this pack"
          />
        </ModalBody>

        <ModalAction
          onCancel={handleCloseModal}
          buttonAction={handleAddNewPack}
          buttonColor="success"
        />
      </ModalWrapper>
    </div>
  );
};
