/* eslint-disable */
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
// material
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  ThemeProvider,
  DialogTitle,
  Dialog,
  DialogContent,
} from '@mui/material';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// components
import Page from '../components/Page';
import ToggleQuestion from 'src/components/questionComponents/ToggleQuestion';
import RadioQuestion from 'src/components/questionComponents/RadioQuestion';
import RatingQuestion from 'src/components/questionComponents/RatingQuestion';
import TextQuestion from 'src/components/questionComponents/TextQuestion';
import {
  onChangeRadio,
  onChangeCheckbox,
  onChangeRating,
  onChangeText,
  onChangeToggle,
  sendResponsesData,
  resetData,
} from 'src/components/questionComponents/ManageQuizResponse';
import './home.scss';
import CheckboxQuestion from 'src/components/questionComponents/CheckboxQuestion';
import constants from 'src/constants';
// ----------------------------------------------------------------------

export default function TrainingTestPage() {
  const { state } = useLocation();
  const questions = state.allChapters[state.index];
  let nextChapterIndex = state.index + 1;
  let currentChapterIndex = state.index;
  const [disableButton, setDisableButton] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showCorrection, setShowCorrection] = useState(false);
  const [score, setScore] = useState(0);
  const submitResponses = () => {
    setDisableButton(true);
    sendResponsesData(questions._id, questions, setShowResult, setScore);
  };
  const showCorrectionForm = () => {
    setShowCorrection(true);
  };

  const closeCorrectionDialog = () => {
    setShowCorrection(false);
  };
  const navigate = useNavigate();

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Dashboard / TrainingDetail / ChapterDetails / Quiz
          </Typography>
        </Stack>
        <center>
          <div className="quiz-title">
            <strong>Please answer to the following questions </strong>
          </div>
        </center>
        <hr />
        {questions.Quiz?.map((q) => {
          if (q.statement.type === 'Radio')
            return (
              <>
                <div style={{ marginTop: '1%', marginBottom: '1%' }}>
                  <RadioQuestion required radioQuestion={q} onChangeRadio={(e, id) => onChangeRadio(e, id)} />{' '}
                </div>
                <hr />
              </>
            );
          if (q.statement.type === 'Checkbox')
            return (
              <>
                <div style={{ marginTop: '1%', marginBottom: '1%' }}>
                  <CheckboxQuestion
                    required
                    checkboxQuestion={q}
                    onChangeCheckbox={(e, id) => onChangeCheckbox(e, id)}
                  />{' '}
                </div>
                <hr />
              </>
            );
          if (q.statement.type === 'Toggle')
            return (
              <>
                <ToggleQuestion toggleQuestion={q} onChangeToggle={(e, id) => onChangeToggle(e, id)} /> <hr />
              </>
            );
          // if (q.statement.type === 'raiting')
          //   return (
          //     <>
          //       <RatingQuestion rateQuestion={q} onChangeRating={(e, id, data) => onChangeRating(e, id, data)} /> <hr />
          //     </>
          //   );
          if (q.statement.type === 'text')
            return (
              <>
                <TextQuestion textQuestion={q} onChangeText={(e, id) => onChangeText(e, id)} /> <hr />
              </>
            );
        })}
        <center>
          {!showResult ? (
            <Button
              variant="contained"
              style={{ marginTop: '1%', marginBottom: '1%', backgroundColor: '#86b4ff', textAlign: 'center' }}
              onClick={(e) => {
                submitResponses();
              }}
              disabled={disableButton}
            >
              Submit
            </Button>
          ) : (
            <>
              <br />
              {score == 100 && (
                <div>
                  {state.allChapters[nextChapterIndex] ? (
                    <span style={{ color: 'green' }}>You can start the next chapter,&nbsp;&nbsp;&nbsp;</span>
                  ) : (
                    <span style={{ color: 'green' }}>
                      You have successfully completed all chapters, You can take the exam,&nbsp;&nbsp;&nbsp;
                    </span>
                  )}
                  <span style={{ color: 'green', fontWeight: 'bold' }}>Your score is : {score} % </span>
                  <br />
                  {state.allChapters[nextChapterIndex] ? (
                    <Button
                      variant="contained"
                      style={{ marginTop: '1%', marginBottom: '1%', backgroundColor: '#86b4ff', textAlign: 'center' }}
                      onClick={(e) =>
                        navigate('/dashboard/chapterDetails', {
                          replace: true,
                          state: {
                            allChapters: state.allChapters,
                            index: nextChapterIndex,
                            finalExam: state.finalExam,
                          },
                        })
                      }
                    >
                      Start the next chapter
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      style={{ marginTop: '1%', marginBottom: '1%', backgroundColor: '#86b4ff', textAlign: 'center' }}
                      onClick={(e) => navigate('/dashboard/trainingExam', { replace: true, state: state.finalExam })}
                    >
                      Start the final exam
                    </Button>
                  )}
                </div>
              )}
              {score >= constants.MIN_SCORE_TO_PASS_QUIZ && score != 100 && (
                <div>
                  <span style={{ color: 'green' }}>
                    Quiz validated, You can start the next chapter,&nbsp;&nbsp;&nbsp;
                  </span>
                  <span style={{ color: 'green', fontWeight: 'bold' }}>Your score is : {score} % </span>
                  <br />
                  <Button
                    variant="contained"
                    style={{ marginTop: '1%', marginBottom: '1%', backgroundColor: '#86b4ff', textAlign: 'center' }}
                    onClick={(e) => showCorrectionForm()}
                  >
                    Show correction
                  </Button>
                  {state.allChapters[nextChapterIndex] && (
                    <Button
                      variant="contained"
                      style={{
                        marginTop: '1%',
                        marginLeft: '2%',
                        marginBottom: '1%',
                        backgroundColor: '#86b4ff',
                        textAlign: 'center',
                      }}
                      onClick={(e) =>
                        navigate('/dashboard/chapterDetails', {
                          replace: true,
                          state: {
                            allChapters: state.allChapters,
                            index: nextChapterIndex,
                            finalExam: state.finalExam,
                          },
                        })
                      }
                    >
                      Start the next chapter
                    </Button>
                  )}
                </div>
              )}
              {score <= constants.MIN_SCORE_TO_PASS_QUIZ && (
                <div>
                  <span style={{ color: 'red' }}>Quiz failed , Your score is : {score} % </span>
                  <br />
                  <Button
                    variant="contained"
                    style={{ marginTop: '1%', marginBottom: '1%', backgroundColor: '#86b4ff', textAlign: 'center' }}
                    onClick={(e) =>
                      navigate('/dashboard/chapterDetails', {
                        replace: true,
                        state: {
                          allChapters: state.allChapters,
                          index: currentChapterIndex,
                          finalExam: state.finalExam,
                        },
                      })
                    }
                  >
                    Back to chapter
                  </Button>
                </div>
              )}
            </>
          )}
        </center>
        <ThemeProvider>
          <Dialog
            open={showCorrection}
            // TransitionComponent={Transition}
            keepMounted
            onClose={(e) => closeCorrectionDialog()}
            aria-describedby="alert-dialog-slide-description"
            fullWidth
            maxWidth="lg"
          >
            <DialogTitle>
              <IconButton
                aria-label="close"
                onClick={() => closeCorrectionDialog()}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <center>
                <strong>Correction</strong>{' '}
              </center>
              <hr />
              {questions.Quiz?.map((q) => {
                if (q.statement.type === 'Radio')
                  return (
                    <>
                      <RadioQuestion correction radioQuestion={q} onChangeRadio={(e, id) => onChangeRadio(e, id)} />{' '}
                      <hr />
                    </>
                  );
                if (q.statement.type === 'Checkbox')
                  return (
                    <>
                      <CheckboxQuestion
                        correction
                        checkboxQuestion={q}
                        onChangeCheckbox={(e, id) => onChangeCheckbox(e, id)}
                      />{' '}
                      <hr />
                    </>
                  );
                if (q.statement.type === 'Toggle')
                  return (
                    <>
                      <ToggleQuestion correction toggleQuestion={q} onChangeToggle={(e, id) => onChangeToggle(e, id)} />{' '}
                      <hr />
                    </>
                  );
                if (q.statement.type === 'raiting')
                  return (
                    <>
                      <RatingQuestion
                        correction
                        rateQuestion={q}
                        onChangeRating={(e, id, data) => onChangeRating(e, id, data)}
                      />{' '}
                      <hr />
                    </>
                  );
                if (q.statement.type === 'text')
                  return (
                    <>
                      <TextQuestion correction textQuestion={q} onChangeText={(e, id) => onChangeText(e, id)} /> <hr />
                    </>
                  );
              })}

              <div style={{ textAlign: 'center' }}>
                <Button
                  variant="contained"
                  style={{ marginTop: '1%', marginRight: '3%' }}
                  onClick={() => closeCorrectionDialog()}
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </ThemeProvider>
      </Container>
    </Page>
  );
}
