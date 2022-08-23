import React, { ChangeEvent, ReactElement, useState } from 'react';

import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { Badge, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import DialogContentText from '@mui/material/DialogContentText';

import styles from './UpdatePackCover.module.css';

import { useAppDispatch } from 'app/store';
import defaultCover from 'assets/images/defaultCover.jpg';
import { ModalAction } from 'common/components/modal/modalWrapper/modalComponents/ModalAction';
import { ModalBody } from 'common/components/modal/modalWrapper/modalComponents/ModalBody';
import { ModalTitle } from 'common/components/modal/modalWrapper/modalComponents/ModalTitle';
import { ModalWrapper } from 'common/components/modal/modalWrapper/modalWrapper';
import { convertFileToBase64 } from 'common/utils/convertFileToBase64';
import { updatePack } from 'features/packs/packs-reducer';

type PropsType = {
  packName: string;
  packId: string;
  deckCover: string | null;
};

const zeroIndex = 0;
const maxSizeOfImage = 4000000;

export const UpdatePackCoverModal = ({
  packName,
  packId,
  deckCover,
}: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [cover, setCover] = useState(deckCover);
  const [error, setError] = useState('');

  const handleCloseModal = (): void => setIsOpen(false);

  const uploadHandler = (ev: ChangeEvent<HTMLInputElement>): void => {
    if (ev.target.files && ev.target.files.length) {
      const file = ev.target.files[zeroIndex];
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

  const handleUpdatePack = (): void => {
    if (cover && cover !== defaultCover && cover !== deckCover) {
      dispatch(updatePack(packId, packName, cover));
      setIsOpen(false);
    } else {
      setError('Choose new file');
    }
  };

  return (
    <div>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <PhotoCameraIcon
            className={styles.cover}
            color="disabled"
            onClick={() => setIsOpen(true)}
          />
        }
      >
        <Avatar
          alt="User"
          src={deckCover || defaultCover}
          sx={{ width: 50, height: 50 }}
        />
      </Badge>
      <ModalWrapper open={isOpen} handleClose={handleCloseModal}>
        <ModalTitle title="Update pack name" onClose={handleCloseModal} />

        <ModalBody>
          <DialogContentText>
            For updating pack you should upload new cover of pack.
          </DialogContentText>
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
              src={cover || defaultCover}
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
        </ModalBody>

        <ModalAction
          onCancel={handleCloseModal}
          buttonAction={handleUpdatePack}
          buttonColor="success"
        />
      </ModalWrapper>
    </div>
  );
};
