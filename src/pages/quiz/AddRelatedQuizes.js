/* eslint-disable */

import React, { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import {
  Container,
  Typography,
  Box,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  Input,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from '@mui/material';
import LoadingSpinner from 'src/components/Spinner/Spinner';

import { QuizItem } from './QuizItem';
// components

export const AddRelatedQuizes = ({ modalForm, loading, onQuizModal, allQuizes, setAllQuizes, withoutTitle }) => {
  const addQuiz = () => {
    setAllQuizes((allQuizes) => [
      ...allQuizes,
      {
        statement: {
          statement: '',
          type: '',
          choices: [],
          answers: [],
        },
        response: {
          value: '',
        },
      },
    ]);
  };
  const onEdit = (e, index) => {
    const _quizes = [...allQuizes];
    setAllQuizes([
      ..._quizes.slice(0, index),
      {
        ..._quizes[index],
        [e.target.name]: e.target.value,
      },
      ..._quizes.slice(index + 1),
    ]);
  };

  return (
    <>
      <div>
        {loading ? (
          <div style={{ paddingTop: '10%' }}>
            <LoadingSpinner type="big" />
          </div>
        ) : (
          <>
            {allQuizes.map((quiz, index) => (
              <QuizItem
                modalForm={modalForm}
                key={index}
                index={index}
                quiz={quiz}
                onEdit={onEdit}
                withoutTitle={withoutTitle}
              />
            ))}
            <center>
              <div style={{ color: '#86B4FF' }}>
                Add new question
                <br />
                <IconButton
                  style={{ backgroundColor: '#86B4FF', color: '#fff' }}
                  aria-label="Add new component"
                  onClick={addQuiz}
                  size="large"
                  component="label"
                >
                  <AddIcon />
                </IconButton>
              </div>
            </center>
          </>
        )}
      </div>
    </>
  );
};
