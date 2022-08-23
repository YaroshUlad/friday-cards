import React, { ChangeEvent, useCallback } from 'react';

import Button from '@mui/material/Button';
import useState from 'react-usestateref';

import { setAppSnackbarAC } from 'app/app-reducer';
import { useAppDispatch } from 'app/store';
import defaultQuestionImage from 'assets/images/defaultQuestionImage.jpg';
import { convertFileToBase64 } from 'common/utils/convertFileToBase64';
import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  setNewQuestionImg: (value: string) => void;
  newQuestionImg: string;
  setShowImage: (value: boolean) => void;
};

export const CardQuestionImage = ({
  setNewQuestionImg,
  newQuestionImg,
  setShowImage,
}: PropsType): ReturnComponentType => {
  const [isAvaBroken, setIsAvaBroken] = useState(false);
  const dispatch = useAppDispatch();
  const zeroIndex = 0;
  const maxSizeOfImage = 4000000;

  const errorHandler = useCallback((): void => {
    setIsAvaBroken(true);
  }, []);

  const uploadHandler = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[zeroIndex];

      if (file.size < maxSizeOfImage) {
        convertFileToBase64(file, (file64: string) => {
          setIsAvaBroken(false);
          setNewQuestionImg(file64);
          setShowImage(true);
        });
      } else {
        dispatch(setAppSnackbarAC('error', 'Image is too big'));
      }
    }
  }, []);

  return (
    <label
      htmlFor="cardQuestionIMG"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <img
        style={{ maxWidth: '250px' }}
        onError={errorHandler}
        alt="questionImage"
        src={isAvaBroken ? defaultQuestionImage : newQuestionImg}
      />
      <input
        id="cardQuestionIMG"
        type="file"
        onChange={uploadHandler}
        style={{ display: 'none' }}
        accept="image/*"
      />
      <Button variant="contained" component="span">
        Upload
      </Button>
    </label>
  );
};
