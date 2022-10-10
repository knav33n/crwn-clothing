import { AuthError, AuthErrorCodes } from "firebase/auth";
import { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import { signUpStart } from "../../store/user/user.action";
import { SignUpContainer } from "./sign-up-form.styles";
import "./sign-up-form.styles.tsx";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUpForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const dispatch = useDispatch();

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      dispatch(signUpStart(email, password, displayName));
      resetFormFields();
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        alert("Cannot create user, email already in use");
      }
      console.error("user creation encountered error", error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <SignUpContainer>
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          onChange={handleChange}
          type="text"
          required
          value={displayName}
          name="displayName"
        />

        <FormInput
          label="Email"
          onChange={handleChange}
          type="email"
          required
          value={email}
          name="email"
        />

        <FormInput
          label="Password"
          onChange={handleChange}
          type="password"
          required
          value={password}
          name="password"
        />

        <FormInput
          label="Confirm Password"
          onChange={handleChange}
          type="password"
          required
          value={confirmPassword}
          name="confirmPassword"
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </SignUpContainer>
  );
}
