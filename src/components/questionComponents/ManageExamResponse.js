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
  // Clear the stored exam result from local storage
  localStorage.removeItem('examResult');

  newData = [];
};

export const sendResponsesData = (chapterId, questions, setShowResult, setScore) => {
  let result = 0;
  let score = 0;
  questions.finalExam?.map((c) => {
    newData.map((r) => {
      if (c._id === r.id) {
        if (c.response.value == r.value.toString()) {
          score = score + 1;
        }
      }
    });
  });
  result = (score * 100) / questions.finalExam.length;
  setScore(Math.trunc(result));
  setShowResult(true);
  const dataToSend = { chapterId: chapterId, userId: getCurrentUser().id, result: result, date: new Date() };
  const storedResult = { score: Math.trunc(result), data: dataToSend };
  localStorage.setItem('examResult', JSON.stringify(storedResult));
  const url = `${constants.URL_WS}/result/add`;
  jsonWebService
    .post(url, dataToSend)
    .then((response) => {
      // eventsService.publish(NOTIFICATION_TOAST_EVENT, { toastMessage: response.message, variant: response.status });
    })
    .catch((err) => {});
};
