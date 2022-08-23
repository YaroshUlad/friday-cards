import React, { ChangeEvent, useCallback } from 'react';

import { Edit } from '@mui/icons-material';
import { Box, FormControl, Select } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import useState from 'react-usestateref';

import defaultQuestionImage from 'assets/images/defaultQuestionImage.jpg';
import { CardQuestionImage } from 'common/components/modal/createUpdateCardModal/CardQuestionImage';
import { ModalWrapper } from 'common/components/modal/modalWrapper/modalWrapper';
import { CreateUpdateCardPayloadType } from 'features/cards/Cards';
import { ReturnComponentType } from 'types/ReturnComponentType';

type PropsType = {
  createUpdateCard: (payload: CreateUpdateCardPayloadType) => void;
  formTitle: string;
  questionImg: string;
  question: string;
  answer: string;
};

export const CreateUpdateCardModal = React.memo(
  (props: PropsType): ReturnComponentType => {
    const { createUpdateCard, formTitle, questionImg, question, answer } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [newAnswer, setNewAnswer] = useState<string>(answer);
    const [newQuestion, setNewQuestion] = useState<string>(question);
    const [newQuestionImg, setNewQuestionImg, imgRef] = useState<string>(
      questionImg || defaultQuestionImage,
    );
    const [questionFormat, setQuestionFormat] = useState<string>(
      questionImg && questionImg !== 'brokenAva' ? 'picture' : 'text',
    );
    const [showImage, setShowImage] = useState(false);

    const handleCloseModal = useCallback((): void => {
      setIsOpen(false);
    }, []);
    const handleUpdateCard = (): void => {
      if (!showImage) {
        setNewQuestionImg('brokenAva');
      }
      createUpdateCard({
        answer: newAnswer,
        question: newQuestion,
        questionImg: imgRef.current,
      });
      setIsOpen(false);
      if (formTitle === 'add') {
        setNewAnswer('');
        setNewQuestion('');
        setNewQuestionImg('');
      }
    };
    const handleChange = (event: SelectChangeEvent): void => {
      setQuestionFormat(event.target.value);
    };
    const onChangeTextHandler = (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ): void => {
      setNewQuestion(e.currentTarget.value);
      setShowImage(false);
    };

    return (
      <div>
        {formTitle === 'add' ? (
          <Button variant="contained" onClick={() => setIsOpen(true)}>
            Add new card
          </Button>
        ) : (
          <IconButton size="small" onClick={() => setIsOpen(true)}>
            <Edit />
          </IconButton>
        )}
        <ModalWrapper open={isOpen} handleClose={handleCloseModal}>
          <DialogTitle>{formTitle} card</DialogTitle>
          <Box color="gray" marginLeft="10px">
            Choose a question format
          </Box>
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select
              value={questionFormat}
              onChange={handleChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="picture">Picture</MenuItem>
              <MenuItem value="text">Text</MenuItem>
            </Select>
          </FormControl>
          <DialogContent>
            <DialogContentText>
              For {formTitle}ing card you should {formTitle} question and answer of the
              card.
            </DialogContentText>
            {questionFormat === 'text' ? (
              <TextField
                autoFocus
                margin="dense"
                value={newQuestion}
                id="cardQuestion"
                label="Card question"
                type="text"
                onChange={onChangeTextHandler}
                fullWidth
                variant="standard"
              />
            ) : (
              <CardQuestionImage
                setNewQuestionImg={setNewQuestionImg}
                newQuestionImg={newQuestionImg}
                setShowImage={setShowImage}
              />
            )}
            <TextField
              margin="dense"
              id="cardAnsw"
              label="Card answer"
              value={newAnswer}
              type="text"
              onChange={e => setNewAnswer(e.currentTarget.value)}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button
              onClick={handleUpdateCard}
              disabled={!newAnswer || (!newQuestion && !newQuestionImg)}
            >
              {formTitle} card
            </Button>
          </DialogActions>
        </ModalWrapper>
      </div>
    );
  },
);
