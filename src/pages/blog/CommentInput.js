import React from 'react';
import { Button, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  commentInput: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#86b4ff',
      },
      '&:hover fieldset': {
        borderColor: '#ffadad',
      },
    },
  },
  sendButton: {
    marginLeft: '1rem',
    backgroundColor: '#b02a37',
    color: '#ffffff',
  },
}));

const CommentInput = ({ comment, handleCommentChange, submitComment }) => {
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      submitComment();
    }
  };
  const classes = useStyles();

  return (
    <form onSubmit={submitComment}>
      <TextField
        id="commentField"
        label="Add your comment ..."
        className={classes.commentInput}
        rows={3}
        variant="outlined"
        value={comment}
        onKeyPress={handleKeyPress}
        onChange={handleCommentChange}
        fullWidth
        InputProps={{
          endAdornment: (
            <Button variant="contained" className={classes.sendButton} onClick={submitComment}>
              Send
            </Button>
          ),
        }}
      />
    </form>
  );
};

export default CommentInput;
