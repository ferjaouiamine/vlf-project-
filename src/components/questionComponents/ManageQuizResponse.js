/* eslint-disable */
import constants from 'src/constants';
import { jsonWebService } from 'src/infrastructure/web-service';
import * as eventsService from 'src/infrastructure/sub-pub-events/eventsSystem';
import { NOTIFICATION_TOAST_EVENT } from 'src/infrastructure/sub-pub-events/eventTypes';
import { getCurrentUser } from 'src/services/user/current-user';

/* eslint-disable */
let newData = [];
export const onChangeToggle = (e, id) => {
  let data = { id: id, value: e.target.value === 'true' ? true : false };
  editedData(data);
};

export const onChangeRadio = (e, id) => {
  let data = { id: id, value: e.target.value };
  editedData(data);
};
export const onChangeCheckbox = (e, id) => {
  const value = e.target.value;
  const isChecked = e.target.checked;

  const alreadyEditedQuestion = newData.find((e) => e.id === id);
  if (alreadyEditedQuestion) {
    // If the question has already been edited, update the value array
    let newValue = alreadyEditedQuestion.value;
    if (isChecked) {
      newValue.push(value);
    } else {
      newValue = newValue.filter((v) => v !== value);
    }
    newData.find((e) => e.id === id).value = newValue;
  } else {
    // If the question has not been edited yet, create a new entry in newData
    newData.push({ id: id, value: [value] });
  }
};
export const onChangeRating = (e, id, ratingValues) => {
  let newRatingValues = { id: id, value: ratingValues };
  editedData(newRatingValues);
};

export const onChangeText = (e, id) => {
  let data = { id: id, value: e.target.value };
  editedData(data);
};

export const editedData = (data) => {
  const alreadyEditedQuestion = newData.filter((e) => e.id === data.id);
  if (alreadyEditedQuestion.length > 0) {
    newData.filter((e) => e.id === data.id)[0].value = data.value;
  } else {
    newData.push(data);
  }
};

export const resetData = () => {
  newData = [];
};
export const equalsCheck = (a, b) => {
  // check the length
  if (a.length != b.length) {
    return false;
  }
  const sortedA = a.slice().sort();
  const sortedB = b.slice().sort();

  // Compare each element of the sorted arrays
  for (let i = 0; i < sortedA.length; i++) {
    if (sortedA[i] !== sortedB[i]) {
      return false;
    }
  }

  return true;
};

export const sendResponsesData = (chapterId, questions, setShowResult, setScore) => {
  let result = 0;
  let score = 0;
  questions.Quiz?.map((c) => {
    newData.map((r) => {
      if (c._id === r.id) {
        if (c.response.value === r.value.toString()) {
          score = score + 1;
        } else if (typeof r.value === 'object' && equalsCheck(r.value, c.statement.answers)) {
          score = score + 1;
        }
      }
    });
  });
  result = (score * 100) / questions.Quiz.length;
  setScore(Math.trunc(result));
  setShowResult(true);
  const dataToSend = { chapterId: chapterId, userId: getCurrentUser().id, result: result, date: new Date() };
  const url = `${constants.URL_WS}/result/add`;
  jsonWebService
    .post(url, dataToSend)
    .then((response) => {
      resetData();
      // eventsService.publish(NOTIFICATION_TOAST_EVENT, { toastMessage: response.message, variant: response.status });
    })
    .catch((err) => {});
};
