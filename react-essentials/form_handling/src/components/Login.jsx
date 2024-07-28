import Input from "./Input";
import { isEmail, isNotEmpty, hasMinLength } from "../util/validation.js";
import { useInput } from "../hooks/useInput.js";

export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
  } = useInput("", (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
  } = useInput("", (value) => hasMinLength(value, 6));

  function handleSubmission(event) {
    event.preventDefault();
    if (emailHasError || passwordHasError) {
      return;
    }
    console.log(emailValue, passwordValue);
  }
  return (
    <form onSubmit={handleSubmission}>
      <h2>Login</h2>

      <div className="control-row">
        <Input
          id="email"
          label="email"
          type="email"
          name="email"
          value={emailValue}
          error={emailHasError && "Email is Invalid"}
          onBlur={handleEmailBlur}
          onChange={handleEmailChange}
        />

        <Input
          id="password"
          label="password"
          type="password"
          name="password"
          value={passwordValue}
          error={passwordHasError && "Password is Invalid"}
          onBlur={handlePasswordBlur}
          onChange={handlePasswordChange}
        />
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        {/* Add type as button in order to prevent form submission and reload */}
        <button className="button" onClick={handleSubmission}>
          Login
        </button>
      </p>
    </form>
  );
}
