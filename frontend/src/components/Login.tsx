import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import "../styles/Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { setSession } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setSession({ token: data.token });
      navigate("/dashboard");
    } catch (err: unknown) {
      setMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login_container">
      <div className="login_gradientBallspurple"></div>
        <div className="login_gradientBallscyan"></div>
        <div className="login_gradientBallspink"></div>
      
        <div className="login_card glass-morphism">
          <div className="login_logoContainer">
            <img src="/assets/logo3333.png" alt="Assistext Logo" width="180px" height="180px" className="login_logoImage" />
          </div>
       
        <form className="login_form" onSubmit={handleLogin}>
          <div className="login_inputGroup">
            <label htmlFor="email" className="login_label text-neutral-text">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              placeholder="you@example.com"
            />
          </div>
          <div className="login_inputGroup">
            <label
              htmlFor="password"
              className="login_label text-neutral-text"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="login_button btn btn-primary"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && <p className="login_message text-error">{message}</p>}
        <p className="login_signupText text-neutral-text/60">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="login_signupLink text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
