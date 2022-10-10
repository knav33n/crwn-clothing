import { AuthError } from "firebase/auth";
import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import Button, {
  BUTTON_TYPE_CLASSES,
} from "../../components/button/button.component";
import FormInput from "../../components/form-input/form-input.component";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../store/user/user.action";
import { ButtonsContainer, SignInContainer } from "./sign-in-form.styles";
import "./sign-in-form.styles.tsx";

const defaultFormFields = {
  email: "",
  password: "",
};

export default function SignInForm() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const resetFormFields = () => setFormFields(defaultFormFields);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      dispatch(emailSignInStart(email, password));
      resetFormFields();
    } catch (error) {
      switch ((error as AuthError).code) {
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        default:
          console.error("user creation encountered error", error);
          break;
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInWithGoogle}
          >
            Google sign in
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}
