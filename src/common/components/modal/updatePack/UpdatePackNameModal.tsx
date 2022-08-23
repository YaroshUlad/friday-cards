import React, { ReactElement, useState } from 'react';

import { TextField } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';

import { useAppDispatch } from 'app/store';
import defaultCover from 'assets/images/defaultCover.jpg';
import { ModalAction } from 'common/components/modal/modalWrapper/modalComponents/ModalAction';
import { ModalBody } from 'common/components/modal/modalWrapper/modalComponents/ModalBody';
import { ModalTitle } from 'common/components/modal/modalWrapper/modalComponents/ModalTitle';
import { ModalWrapper } from 'common/components/modal/modalWrapper/modalWrapper';
import { UpdatePackButton } from 'common/components/modal/updatePack/UpdatePackButton';
import { updatePack } from 'features/packs/packs-reducer';

type PropsType = {
  packName: string;
  packId: string;
  cover: string | null;
};

export const UpdatePackNameModal = ({
  packName,
  packId,
  cover,
}: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = React.useState<string>(packName);

  const handleCloseModal = (): void => setIsOpen(false);

  const handleUpdatePack = (): void => {
    if (value) {
      dispatch(updatePack(packId, value));
    }
    setIsOpen(false);
  };
  return (
    <div>
      <UpdatePackButton setIsOpen={() => setIsOpen(true)} />

      <ModalWrapper open={isOpen} handleClose={handleCloseModal}>
        <ModalTitle title="Update pack name" onClose={handleCloseModal} />

        <ModalBody>
          <DialogContentText>
            For updating pack you should add new name of pack.
          </DialogContentText>
          <div
            style={{
              marginTop: '10px',
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}
          >
            <img src={cover || defaultCover} style={{ width: '60px' }} alt="cover" />
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="newPackName"
            label="New pack's name"
            type="text"
            value={value}
            onChange={e => setValue(e.currentTarget.value)}
            fullWidth
            variant="standard"
          />
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
