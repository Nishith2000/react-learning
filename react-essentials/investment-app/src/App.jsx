import { useState } from "react";
import NumInput from "./components/NumInput";
import ReturnsTable from "./components/ReturnsTable";
import { calculateInvestmentResults } from "./util/investment";

function App() {
  const [initialInvestment, setInitialInvestment] = useState(null);
  const [annualInvestment, setAnnualInvestment] = useState(null);
  const [expectedReturn, setExpectedReturn] = useState(null);
  const [duration, setDuration] = useState(null);

  let resultTableElement;
  let invalidDurationMsgElement;

  const areAllFieldsFilled =
    initialInvestment && annualInvestment && expectedReturn && duration;

  let investmentResults;
  let firstInvestment;
  let isDurationInputValid = duration && duration >= 1;

  if (areAllFieldsFilled && isDurationInputValid) {
    investmentResults = calculateInvestmentResults(
      initialInvestment,
      annualInvestment,
      expectedReturn,
      duration
    );
    firstInvestment =
      investmentResults[0].valueEndOfYear -
      investmentResults[0].interest -
      investmentResults[0].annualInvestment;

    resultTableElement = (
      <ReturnsTable
        investmentResults={investmentResults}
        firstInvestment={firstInvestment}
      />
    );
  }

  if (areAllFieldsFilled && !isDurationInputValid) {
    invalidDurationMsgElement = (
      <p className="center">Please enter valid value for Duration field.</p>
    );
  }

  function handleNumInput(e, fieldName) {
    const inputValue = Number(e.target.value);
    switch (fieldName) {
      case "Initial Investment":
        setInitialInvestment(inputValue);
        break;
      case "Annual Investment":
        setAnnualInvestment(inputValue);
        break;
      case "Expected Return":
        setExpectedReturn(inputValue);
        break;
      case "Duration":
        setDuration(inputValue);
        break;
    }
  }

  return (
    <>
      <div id="user-input">
        <div className="input-group">
          <NumInput
            fieldName="Initial Investment"
            onNumInputChange={handleNumInput}
          />
          <NumInput
            fieldName="Annual Investment"
            onNumInputChange={handleNumInput}
          />
        </div>
        <br />
        <div className="input-group">
          <NumInput
            fieldName="Expected Return"
            onNumInputChange={handleNumInput}
          />
          <NumInput fieldName="Duration" onNumInputChange={handleNumInput} />
        </div>
      </div>
      {invalidDurationMsgElement}
      {resultTableElement}
    </>
  );
}

export default App;
