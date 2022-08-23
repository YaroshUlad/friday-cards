import React, { useState } from 'react';

import Button from '@mui/material/Button';

import { ModalAction } from 'common/components/modal/modalWrapper/modalComponents/ModalAction';
import { ModalBody } from 'common/components/modal/modalWrapper/modalComponents/ModalBody';
import { ModalTitle } from 'common/components/modal/modalWrapper/modalComponents/ModalTitle';
import { ModalWrapper } from 'common/components/modal/modalWrapper/modalWrapper';
import { ReturnComponentType } from 'types/ReturnComponentType';

export const ModalWrapperTest = (): ReturnComponentType => {
  const [modalWrapper, setModalWrapper] = useState<boolean>(false);

  const toggleModalHandle = (): void => setModalWrapper(!modalWrapper);

  return (
    <div>
      <Button onClick={toggleModalHandle}>Open Modal</Button>

      <ModalWrapper open={modalWrapper} handleClose={toggleModalHandle}>
        <ModalTitle title="asda" onClose={toggleModalHandle} />
        <ModalBody>
          <h2>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam assumenda
            beatae blanditiis consequatur consequuntur ducimus esse impedit iusto
            laboriosam magnam modi nam nisi non omnis, quam sapiente totam vel?
          </h2>
        </ModalBody>
        <ModalAction
          onCancel={toggleModalHandle}
          buttonAction={() => console.log('action')}
          buttonColor="error"
        />
      </ModalWrapper>
    </div>
  );
};
