import React, { useContext } from "react";
import LoginForm from "../components/form/loginForm";
import { SecurityContext } from "../contexts/SecurityContext";

const LoginPage = () => {
  const { login } = useContext(SecurityContext);

  const submit = async (values) => {};

  return <LoginForm onSubmit={submit} />;
};

export default LoginPage;
