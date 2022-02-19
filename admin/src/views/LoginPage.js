import React, { useContext } from "react";
import LoginForm from "../components/form/loginForm";
import { AuthContext } from "../contexts/AuthContext";

const LoginPage = () => {
  const { token, isLoading, isError, error, user } = useContext(AuthContext);

  const submit = async (values) => {
    // await login(values);
  };

  // if (token) {
  //   return <Redirect to="/" />;
  // }

  return <LoginForm onSubmit={submit} />;
};

export default LoginPage;
