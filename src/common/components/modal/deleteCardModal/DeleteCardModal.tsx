import React, { ReactElement, useState } from 'react';

import DialogContentText from '@mui/material/DialogContentText';

import { useAppDispatch } from 'app/store';
import { DeletePackButton } from 'common/components/modal/deletePackModal/DeletePackButton';
import { ModalAction } from 'common/components/modal/modalWrapper/modalComponents/ModalAction';
import { ModalBody } from 'common/components/modal/modalWrapper/modalComponents/ModalBody';
import { ModalTitle } from 'common/components/modal/modalWrapper/modalComponents/ModalTitle';
import { ModalWrapper } from 'common/components/modal/modalWrapper/modalWrapper';
import { deletePackCardTC } from 'features/cards/cards-reducer';

type PropsType = {
  cardId: string;
  packId: string;
};

export const DeleteCardModal = ({ cardId, packId }: PropsType): ReactElement => {
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCloseModal = (): void => setIsOpen(false);

  const handleDeletePack = (): void => {
    dispatch(deletePackCardTC(packId, cardId));
  };
  return (
    <div>
      <DeletePackButton setIsOpen={() => setIsOpen(true)} />

      <ModalWrapper open={isOpen} handleClose={handleCloseModal}>
        <ModalTitle title="Delete pack" onClose={handleCloseModal} />

        <ModalBody>
          <DialogContentText>Do you really want to remove this Card?</DialogContentText>
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
