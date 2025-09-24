import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      login();
      navigate("/dashboard");
    } catch (err: unknown) {
      setMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.card} glass-morphism`}>
        <h2 className={`${styles.heading} gradient-text-brand`}>
          Login
        </h2>
        <form className={styles.form} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={`${styles.label} text-neutral-text`}>
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
          <div className={styles.inputGroup}>
            <label
              htmlFor="password"
              className={`${styles.label} text-neutral-text`}
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
            className={`${styles.button} btn btn-primary`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && <p className={`${styles.message} text-error`}>{message}</p>}
        <p className={`${styles.signupText} text-neutral-text/60`}>
          Don&apos;t have an account?{" "}
          <Link to="/signup" className={`${styles.signupLink} text-primary hover:underline`}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
