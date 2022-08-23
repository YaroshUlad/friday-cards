import React from 'react';

import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from 'app/store';
import defaultCover from 'assets/images/defaultCover.jpg';
import { BackspaceButton } from 'common/components/backspaceIcon/BackspaceIcon';
import { CreateUpdateCardModal } from 'common/components/modal/createUpdateCardModal/CreateUpdateCardModal';
import styles from 'common/components/titleArea/TitleArea.module.css';
import { RoutePath } from 'common/enums/route-path';
import { CreateUpdateCardPayloadType } from 'features/cards/Cards';
import { ReturnComponentType } from 'types/ReturnComponentType';

type TitleAreaPropsType = {
  packId: string;
  addNewCard: (payload: CreateUpdateCardPayloadType) => void;
};

export const CardsTitleArea = React.memo(
  ({ addNewCard, packId }: TitleAreaPropsType): ReturnComponentType => {
    const cards = useAppSelector(state => state.packCards.cards);
    const packUserId = useAppSelector(state => state.packCards.packUserId);
    const currentUserId = useAppSelector(state => state.login.userInfo._id);
    const packs = useAppSelector(state => state.packs.cardPacks);
    const packName = packs.find(p => p._id === packId)!.name;
    const { deckCover } = packs.find(p => p._id === packId)!;
    const navigate = useNavigate();
    const canUserChangingCard = packUserId === currentUserId;

    const handleClickLearnCard = (): void => {
      navigate(`${RoutePath.Packs}/${packId}/cards/learn`);
    };

    return (
      <div>
        <BackspaceButton />
        <div className={styles.titleArea}>
          <div>{packName}</div>
          {/* eslint-disable-next-line no-nested-ternary */}
          {canUserChangingCard ? (
            cards.length ? (
              <CreateUpdateCardModal
                createUpdateCard={addNewCard}
                formTitle="add"
                questionImg=""
                question=""
                answer=""
              />
            ) : (
              ''
            )
          ) : (
            <Button variant="contained" onClick={handleClickLearnCard}>
              Learn to pack
            </Button>
          )}
        </div>
        <div className={styles.imageContainer}>
          <img className={styles.image} alt="packImage" src={deckCover || defaultCover} />
        </div>
      </div>
    );
  },
);
