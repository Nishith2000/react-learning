import { useRef } from "react";

export default function Answers({
  question,
  answers,
  answerState,
  selectedAnswer,
  onSelect,
}) {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }
  return (
    <div>
      <h2>{question}</h2>
      <ul id="answers">
        {shuffledAnswers.current.map((answer) => {
          let cssClass = "";
          const isSelected = selectedAnswer === answer;
          
          if (isSelected) {
            cssClass = "selected";
          }
          if (
            (answerState === "correct" || answerState === "wrong") &&
            isSelected
          ) {
            cssClass = answerState;
          }
          return (
            <li key={answer} className="answer">
              <button
                onClick={() => onSelect(answer)}
                className={cssClass}
                disabled={answerState !== ""}
              >
                {answer}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
