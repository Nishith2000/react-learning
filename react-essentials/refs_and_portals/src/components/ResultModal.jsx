import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(
  ({ targetTime, remainingTime, onReset }, ref) => {
    const dialog = useRef();
    const result = remainingTime <= 0 ? "lost" : "won";
    const score =
      remainingTime <= 0
        ? 0
        : Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => {
      return {
        open() {
          dialog.current.showModal();
        },
      };
    });
    return createPortal(
      <dialog ref={dialog} className="result-modal" onClose={onReset}>
        <h2>You {result}</h2>
        <h2>Your score: {score}</h2>
        <p>
          The Target time was <strong>{targetTime} second(s)</strong>
        </p>
        <p>
          You stopped the timer with{" "}
          <strong>{(remainingTime / 1000).toFixed(2)} seconds left.</strong>
        </p>
        <form method="dialog" onSubmit={onReset}>
          <button>Close</button>
        </form>
      </dialog>,
      document.getElementById("modal")
    ); // should be in index.html file
  }
);

export default ResultModal;
