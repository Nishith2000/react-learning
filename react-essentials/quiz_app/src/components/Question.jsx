import { useCallback, useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from "../questions.js";

export default function Question({ activeQuestionIndex, onSelectAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timeToWait = 10 * 1000; // 10 seconds
  if (answer.selectedAnswer) {
    timeToWait = 1 * 1000; // 1 second
  }
  if (answer.isCorrect !== null) {
    timeToWait = 2 * 1000; // 2 second
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[activeQuestionIndex].answers[0] === answer,
      });
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";
  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  const skipQuestionHandling = useCallback(
    () => onSelectAnswer(null),
    [onSelectAnswer]
  );

  return (
    <>
      <QuestionTimer
        key={timeToWait}
        timeout={timeToWait}
        mode={answerState}
        onTimeout={answer.selectedAnswer === "" ? skipQuestionHandling : null}
      />
      <Answers
        question={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        answerState={answerState}
        selectedAnswer={answer.selectedAnswer}
        onSelect={handleSelectAnswer}
      />
    </>
  );
}
