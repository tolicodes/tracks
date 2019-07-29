import React from "react";
import LoginRegister from "react-mui-login-register";
import { signIn, register } from "./api";

import * as firebase from "firebase/app";
import "firebase/auth";

export default function LoginForm() {
  const handleLogin = ({ username, password }) => {
    signIn({ username, password });
  };

  const handleLoginWithProvider = providerId => {
    alert(`Logging in with provider '${providerId}'`);
  };

  const handleRegister = content => {
    alert(`Registering with content '${JSON.stringify(content)}'`);
  };

  const handleRegisterWithProvider = providerId => {
    alert(`Registering with provider '${providerId}'`);
  };

  return (
    <div>
      <LoginRegister
        onLogin={handleLogin}
        onLoginWithProvider={handleLoginWithProvider}
        onRegister={handleRegister}
        onRegisterWithProvider={handleRegisterWithProvider}
      />
    </div>
  );
}
