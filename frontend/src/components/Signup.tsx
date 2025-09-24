import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import styles from "./Signup.module.css";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country_code, setCountryCode] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          country_code,
          first_name,
          last_name,
        }),
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
          Create Account
        </h2>
        <form className={styles.form} onSubmit={handleSignup}>
          <div className={styles.nameFieldsGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="first_name" className={`${styles.label} text-neutral-text`}>
                First Name
              </label>
              <input
                id="first_name"
                type="text"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-input"
                placeholder="John"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="last_name" className={`${styles.label} text-neutral-text`}>
                Last Name
              </label>
              <input
                id="last_name"
                type="text"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                className="form-input"
                placeholder="Doe"
              />
            </div>
          </div>
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
            <label htmlFor="password" className={`${styles.label} text-neutral-text`}>
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
          <div className={styles.inputGroup}>
            <label htmlFor="country_code" className={`${styles.label} text-neutral-text`}>
              Country Code
            </label>
            <input
              id="country_code"
              type="text"
              value={country_code}
              onChange={(e) => setCountryCode(e.target.value)}
              className="form-input"
              placeholder="e.g. CA"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`${styles.button} btn btn-primary`}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        {message && <p className={`${styles.message} text-error`}>{message}</p>}
        <p className={`${styles.loginText} text-neutral-text/60`}>
          Already have an account?{" "}
          <Link to="/login" className={`${styles.loginLink} text-primary hover:underline`}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
