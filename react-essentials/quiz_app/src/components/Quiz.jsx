import { useCallback, useState } from "react";
import QUESTIONS from "../questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const activeQuestionIndex = userAnswers.length;

  const isQuizComplete = activeQuestionIndex >= QUESTIONS.length;
  
  // NOTE: State updating functions don't need to be added to dependency list
  // as React ensures that they remain constant.
  const handleSelectAnswer = useCallback((answer) => {
    setUserAnswers((prevAnswer) => [...prevAnswer, answer]);
  }, []);

  if (isQuizComplete) {
    return (
      <Summary userAnswers={userAnswers} />
    );
  }

  return (
    <div id="quiz">
      <div id="question">
        <Question
          key={activeQuestionIndex}
          activeQuestionIndex={activeQuestionIndex}
          onSelectAnswer={handleSelectAnswer}
          userAnswers={userAnswers}
        />
      </div>
    </div>
  );
}
