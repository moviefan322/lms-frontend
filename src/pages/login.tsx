import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { loginUser, getUserDetails } from "@/lib/features/auth/authActions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const authState = useAppSelector((state) => state.auth);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="container">
      <h1>Login Page</h1>

      <div>
        <form onSubmit={submitHandler} className='login-list'>
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

      {authState.token && (
        <div>
          <h2>Token</h2>
          <p>{authState.token}</p>
        </div>
      )}
    </div>
  );
};

export default Login;
