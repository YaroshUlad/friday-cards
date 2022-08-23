import React, { ReactElement, useState } from 'react';

import DialogContentText from '@mui/material/DialogContentText';

import { useAppDispatch } from 'app/store';
import defaultCover from 'assets/images/defaultCover.jpg';
import { DeletePackButton } from 'common/components/modal/deletePackModal/DeletePackButton';
import { ModalAction } from 'common/components/modal/modalWrapper/modalComponents/ModalAction';
import { ModalBody } from 'common/components/modal/modalWrapper/modalComponents/ModalBody';
import { ModalTitle } from 'common/components/modal/modalWrapper/modalComponents/ModalTitle';
import { ModalWrapper } from 'common/components/modal/modalWrapper/modalWrapper';
import { deletePack } from 'features/packs/packs-reducer';

type PropsType = {
  packName: string;
  packId: string;
  cover: string | null;
};

export const DeletePackModal = ({ packName, packId, cover }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCloseModal = (): void => setIsOpen(false);

  const handleDeletePack = (): void => {
    dispatch(deletePack(packId));
  };
  return (
    <div>
      <DeletePackButton setIsOpen={() => setIsOpen(true)} />

      <ModalWrapper open={isOpen} handleClose={handleCloseModal}>
        <ModalTitle title="Delete pack" onClose={handleCloseModal} />

        <ModalBody>
          <DialogContentText>
            Are you sure want delete this {packName} pack?
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
        </ModalBody>

        <ModalAction
          onCancel={handleCloseModal}
          buttonAction={handleDeletePack}
          buttonColor="error"
        />
      </ModalWrapper>
    </div>
  );
};
