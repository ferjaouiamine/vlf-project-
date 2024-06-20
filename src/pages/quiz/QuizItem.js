/* eslint-disable */
import React, { useState } from 'react';
// @mui
import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  Divider,
  TableHead,
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { LineStyle, LineStyleSharp, SafetyDividerOutlined } from '@mui/icons-material';

export const QuizItem = ({ modalForm, index, quiz, onEdit, withoutTitle }) => {
  const { statement, response } = quiz;
  const [newChoice, setNewChoice] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  const [toggleValue, setToggleValue] = React.useState(quiz.response.value ? quiz.response.value : '');

  const { value } = response;

  const { statement: statementValue, type: statementType, choices, answers } = statement;

  const handleStatementChange = (e) => {
    onEdit({ target: { name: 'statement', value: { ...statement, statement: e.target.value } } }, index);
  };

  const handleStatementTypeChange = (e) => {
    onEdit({ target: { name: 'statement', value: { ...statement, type: e.target.value } } }, index);
  };

  const handleResponseChange = (e) => {
    onEdit({ target: { name: 'response', value: { value: e.target.value } } }, index);
  };
  const changeToggle = (e) => {
    setToggleValue(e.target.value === 'true' ? 'true' : 'false');
    handleResponseChange(e);
  };
  const handleChoiceChange = (e, choiceIndex) => {
    const newChoices = [...choices];
    newChoices[choiceIndex] = { statement: e.target.value };
    onEdit({ target: { name: 'statement', value: { ...statement, choices: newChoices } } }, index);
  };
  const handleAnswerChange = (e, answerIndex) => {
    const newAnswers = [...answers];
    newAnswers[answerIndex] = { statement: e.target.value };
    onEdit({ target: { name: 'statement', value: { ...statement, answers: newAnswers } } }, index);
  };
  const handleDeleteChoice = (choiceIndex) => {
    const newChoices = choices.filter((_, index) => index !== choiceIndex);
    onEdit({ target: { name: 'statement', value: { ...statement, choices: newChoices } } }, index);
  };
  const handleDeleteAnswer = (answerIndex) => {
    const newAnswers = answers.filter((_, index) => index !== answerIndex);
    onEdit({ target: { name: 'statement', value: { ...statement, answers: newAnswers } } }, index);
  };
  const handleAddChoice = () => {
    if (newChoice.trim() === '') return;

    const newChoices = [...choices, newChoice.trim()];
    setNewChoice('');
    onEdit({ target: { name: 'statement', value: { ...statement, choices: newChoices } } }, index);
  };

  const handleAddAnswer = () => {
    if (newAnswer.trim() === '') return;

    const newAnswers = [...answers, newAnswer.trim()];
    setNewAnswer('');
    onEdit({ target: { name: 'statement', value: { ...statement, answers: newAnswers } } }, index);
  };
  return (
    <>
      {!withoutTitle && (
        <Typography variant="h6" color={'#2F95CA'} style={{ position: 'fixed', fontWeight: 'bold', top: '150px' }}>
          Add related Quiz
        </Typography>
      )}

      <div style={{ textAlign: 'center' }}>
        <br />
        <br />
        <br />
        <div style={{ display: 'flex', marginLeft: '15%', width: '70%', flexDirection: 'row', alignItems: 'center' }}>
          {' '}
          <div style={{ flex: 1, height: '1px', backgroundColor: '#b8c6d1' }} />
          <Typography style={{ color: '#2F95CA' }} variant="caption body1">
            Question number ( {index + 1} )
          </Typography>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#b8c6d1' }} />
        </div>

        <FormControl style={{ width: '20%', marginBottom: '1%', marginTop: '5%' }}>
          <InputLabel id="demo-simple-select-label">Question type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="type"
            name="type"
            value={statementType}
            onChange={handleStatementTypeChange}
            label="Question type"
          >
            <MenuItem value={'Toggle'}>Toggle Button</MenuItem>
            {/* <MenuItem value={'Text'}>Text</MenuItem> */}
            <MenuItem value={'Radio'}>Radio Button</MenuItem>
            <MenuItem value={'Checkbox'}>Multiple Answers Button</MenuItem>
            {/* <MenuItem value={'Raiting'}>Raiting</MenuItem> */}
          </Select>
        </FormControl>
        <div style={{ width: '100%', marginBottom: '3%' }}>
          <Grid sx={{ marginBottom: '1%' }}>
            <Input
              style={{ width: '50%' }}
              name="statement"
              id="statement"
              type="text"
              value={statementValue}
              onChange={handleStatementChange}
              placeholder="Add the question"
            />
          </Grid>

          {statementType === 'Toggle' && (
            <div>
              <Typography color={'#86bc28'} variant="caption body1">
                Add the answer :{' '}
              </Typography>
              <ToggleButtonGroup
                color="primary"
                size="small"
                exclusive
                sx={{ height: '25px', marginTop: '2%' }}
                onChange={(e) => changeToggle(e)}
              >
                <ToggleButton
                  value="true"
                  style={
                    toggleValue === 'true'
                      ? { outline: 'none', color: '#258053', backgroundColor: '#A5EAC9 ' }
                      : { outline: 'none', backgroundColor: '#fff', color: 'grey' }
                  }
                  selected={toggleValue === 'true' ? 'true' : 'false'}
                >
                  True
                </ToggleButton>
                <ToggleButton
                  value="false"
                  style={
                    toggleValue === 'false'
                      ? { outline: 'none', backgroundColor: '#F9BCBB', color: 'red' }
                      : { outline: 'none', backgroundColor: '#fff', color: 'grey' }
                  }
                  selected={toggleValue === 'false' ? 'true' : 'false'}
                >
                  False
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          )}
          {statementType === 'Radio' && (
            <div>
              <Grid sx={{ marginBottom: '1%' }}>
                <Input
                  style={{ width: '50%' }}
                  name="response"
                  id="response"
                  type="text"
                  value={response.value}
                  onChange={handleResponseChange}
                  placeholder="Response"
                />
              </Grid>
              <Grid sx={{ marginBottom: '1%' }}>
                <FormControl style={{ width: '50%' }}>
                  <InputLabel>Add Choices</InputLabel>
                  <Input
                    name="newChoice"
                    id="new-choice"
                    type="text"
                    value={newChoice}
                    onChange={(e) => setNewChoice(e.target.value)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={handleAddChoice} edge="end">
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
              {choices?.length > 0 && (
                <Box sx={{ marginTop: '2rem' }}>
                  <Typography color={'#86bc28'} variant="h6">
                    Choices:
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table sx={{ width: '65%', marginLeft: '24%', minWidth: 650 }} aria-label="quiz choices table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Question choices</TableCell>
                          <TableCell>Remove</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {choices.map((choice, index) => (
                          <TableRow key={index}>
                            <TableCell component="th" scope="row">
                              <Input
                                disabled
                                style={{ width: '100%' }}
                                name="choice"
                                id="choice"
                                type="text"
                                value={choice}
                                onChange={(e) => handleChoiceChange(e, index)}
                              />
                            </TableCell>
                            <TableCell>
                              <IconButton onClick={() => handleDeleteChoice(index)}>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </div>
          )}
          {statementType === 'Checkbox' && (
            <div style={{}}>
              <Grid container spacing={2} sx={{ marginBottom: '1%' }}>
                <Grid item xs={6}>
                  <FormControl fullWidth style={{ width: '80%' }}>
                    <InputLabel>Add Choices</InputLabel>
                    <Input
                      name="newChoice"
                      id="new-choice"
                      type="text"
                      value={newChoice}
                      onChange={(e) => setNewChoice(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={handleAddChoice} edge="end">
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth style={{ width: '80%' }}>
                    <InputLabel>Add Answers</InputLabel>
                    <Input
                      name="newAnswer"
                      id="new-answer"
                      type="text"
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton onClick={handleAddAnswer} edge="end">
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <div style={{ display: 'flex', marginLeft: '4.7%' }}>
                {choices?.length > 0 ? (
                  <Box sx={{ width: '40%', marginTop: '2rem', marginRight: modalForm ? '1rem' : '10rem' }}>
                    {' '}
                    <Typography style={{ float: 'left', marginLeft: '35%' }} color={'#86bc28'} variant="h6">
                      Choices:
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table sx={{ width: '45%', minWidth: modalForm ? 350 : 500 }} aria-label="quiz choices table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Question choices</TableCell>
                            <TableCell>Remove</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {choices.map((choice, index) => (
                            <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                <Input
                                  disabled
                                  style={{ width: '100%' }}
                                  name="choice"
                                  id="choice"
                                  type="text"
                                  value={choice}
                                  onChange={(e) => handleChoiceChange(e, index)}
                                />
                              </TableCell>
                              <TableCell>
                                <IconButton onClick={() => handleDeleteChoice(index)}>
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                ) : (
                  <Box sx={{ width: '50%', marginTop: '2rem', marginRight: '1rem' }} />
                )}
                {answers?.length > 0 && (
                  <Box
                    sx={{
                      width: modalForm ? '40%' : '50%',
                      marginTop: '2rem',
                      marginLeft: modalForm ? '8rem' : '1rem',
                    }}
                  >
                    <Typography
                      style={{ float: 'right', marginRight: modalForm ? '40%' : '50%' }}
                      color={'#86bc28'}
                      variant="h6"
                    >
                      Answers:
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table
                        sx={{ width: '45%', float: 'right', minWidth: modalForm ? 350 : 650 }}
                        aria-label="quiz answers table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Question answers</TableCell>
                            <TableCell>Remove</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {answers.map((answer, index) => (
                            <TableRow key={index}>
                              <TableCell component="th" scope="row">
                                <Input
                                  disabled
                                  style={{ width: '100%' }}
                                  name="answer"
                                  id="answer"
                                  type="text"
                                  value={answer}
                                  onChange={(e) => handleAnswerChange(e, index)}
                                />
                              </TableCell>
                              <TableCell>
                                <IconButton onClick={() => handleDeleteAnswer(index)}>
                                  <DeleteIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
