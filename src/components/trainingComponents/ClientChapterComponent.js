/* eslint-disable */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../../pages/home.scss';
import { useNavigate } from 'react-router-dom';
import { jsonWebService } from 'src/infrastructure/web-service';
import { getCurrentUser } from 'src/services/user/current-user';
import * as eventsService from 'src/infrastructure/sub-pub-events/eventsSystem';
import { NOTIFICATION_TOAST_EVENT } from 'src/infrastructure/sub-pub-events/eventTypes';
import constants from 'src/constants';
import { Button } from '@mui/material';

export const ClientChapterComponent = ({ finalExam, chapters }) => {
  const navigate = useNavigate();
  //   const handleClick = () => {
  //     navigate('/dashboard/chapterDetails', { replace: true, state: chapters });
  //   };
  let status;
  const checkCurrentChapterResult = (currentChapter) => {
    const url = `${constants.URL_WS}/result/${currentChapter._id}`;
    jsonWebService
      .get(url, { userId: getCurrentUser().id })
      .then((response) => {
        const res = response.data.result[0]?.result;
        return res;
      })
      .catch((err) => {});
  };
  const checkPreviousChapter = (index, currentChapter) => {
    let previousChapter = chapters[index - 1];

    const url = `${constants.URL_WS}/result/${previousChapter._id}`;
    jsonWebService
      .get(url, { userId: getCurrentUser().id })
      .then((response) => {
        let res = response.data.result[0]?.result;
        let resPerUser = response.data.result[0]?.user_id;
        let userId = getCurrentUser().id;
        if (userId == resPerUser && res >= constants.MIN_SCORE_TO_PASS_QUIZ) {
          navigate('/dashboard/chapterDetails', {
            replace: true,
            state: { allChapters: chapters, finalExam: finalExam, index: index },
          });
        } else {
          eventsService.publish(NOTIFICATION_TOAST_EVENT, {
            toastMessage: `Please finish the previous chapter with a score more than ${constants.MIN_SCORE_TO_PASS_QUIZ} %`,
            variant: 'INFO',
          });
        }
      })
      .catch((err) => {});
  };
  const handleNavigate = (chapter, index) => {
    if (index === 0) {
      navigate('/dashboard/chapterDetails', {
        replace: true,
        state: { allChapters: chapters, finalExam: finalExam, index: index },
      });
    } else {
      checkPreviousChapter(index, chapter);
    }
  };
  const [chapterStatuses, setChapterStatuses] = useState([]);
  const checkChapterStatus = async (chapter, index) => {
    try {
      let previousChapter = chapters[index];
      const url = `${constants.URL_WS}/result/${previousChapter._id}`;
      const response = await jsonWebService.get(url, { userId: getCurrentUser().id });
      let res = response.data.result[0]?.result;
      let resPerUser = response.data.result[0]?.user_id;
      let userId = getCurrentUser().id;
      if (userId == resPerUser && res >= constants.MIN_SCORE_TO_PASS_QUIZ) {
        return 'This chapter is completed, Your score is : ' + Math.trunc(res) + '%';
      }
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    const fetchChapterStatuses = async () => {
      const statuses = await Promise.all(
        chapters.map(async (chapter, index) => {
          return checkChapterStatus(chapter, index);
        })
      );
      setChapterStatuses(statuses);
    };

    fetchChapterStatuses();
  }, [chapters]);
  const index = chapterStatuses.findIndex((status) => status === undefined);
  return (
    <>
      <div>
        <Button
          variant="contained"
          style={{ width: '195px', backgroundColor: '#86b4ff' }}
          onClick={(e) => {
            if (index !== -1) {
              navigate('/dashboard/chapterDetails', {
                replace: true,
                state: { allChapters: chapters, finalExam: finalExam, index: index },
              });
            } else {
              navigate('/dashboard/trainingExam', { replace: true, state: finalExam });
            }
          }}
        >
          {index === -1 ? 'Pass the exam' : index == 0 ? 'Start' : 'Continue'}
        </Button>
        <div style={{ marginTop: '30%' }}>
          <div className="contentTable">Content Table</div>
          <div className="underlineContent" />
        </div>
        {chapters.map((chapters, i) => (
          <div>
            <div
              role="presentation"
              onClick={() => handleNavigate(chapters, i)}
              className="chapterBanner"
              onKeyDown={() => handleNavigate(chapters, i)}
            >
              <div className="chapterText">
                <span className="chapterName">Chapter {i + 1}</span>
                <br />
                <span className="chapterDesc">{chapters.chapterName}</span>
              </div>
            </div>
            {chapterStatuses[i] && <div className="resultMessage">{chapterStatuses[i]}</div>}
          </div>
        ))}
      </div>
    </>
  );
};
