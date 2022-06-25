import React, { useContext } from "react";
import LoginForm from "../components/form/loginForm";
import { SecurityContext } from "../contexts/SecurityContext";
import { Redirect } from "react-router-dom";

const LoginPage = () => {
  const { token, login } = useContext(SecurityContext);

  const submit = async (values) => {
    await login(values);
  };

  if (token) {
    return <Redirect to="/" />;
  }

  return <LoginForm onSubmit={submit} />;
};

export default LoginPage;
