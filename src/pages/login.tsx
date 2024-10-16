import React, { useState, useEffect } from "react";
import { RootState } from "@/lib/store";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import useUserDetails from "@/hooks/useUserDetails";
import { loginUser, getUserDetails } from "@/lib/features/auth/authActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const { data, isLoggedIn } = useUserDetails();
  const { error } = useAppSelector((state: RootState) => state.auth) as {
    error: string;
  };

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (isLoggedIn) {
      console.log("User is logged in");
    }
  }, [isLoggedIn]);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="container">
      <h1>Login Page</h1>

      <div>
        <form onSubmit={submitHandler} className="login-list">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>

      {authState.isLoggedIn && (
        <div>
          <h2>Welcome, {data?.email}</h2>
        </div>
      )}
    </div>
  );
};

export default Login;
