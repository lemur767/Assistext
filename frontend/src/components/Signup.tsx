import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Signup.css";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country_code, setCountryCode] = useState("");
  const [state, setState] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });
  const { setSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setPasswordErrors({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    });
  }, [password]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setMessage("You must agree to the Terms of Service and Privacy Policy.");
      return;
    }

    const isPasswordValid = Object.values(passwordErrors).every((v) => v);
    if (!isPasswordValid) {
      setMessage("Please ensure your password meets all the requirements.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const response = await fetch("/api/v1/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          country_code,
          state,
          first_name,
          last_name,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.message && data.message.includes("Password")) {
          throw new Error(data.message);
        } else {
          throw new Error(data.error || "An unknown error occurred.");
        }
      }
      setSession({ token: data.access_token });
      navigate("/dashboard");
    } catch (err: unknown) {
      const errorMessage = (err as Error).message;
      setMessage(errorMessage);
      if (errorMessage.includes("Password")) {
        setPassword("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup_container">
      <div className="signup_card">
        <h2 className="signup_heading">
          Create Account
        </h2>
        <form className="signup_form" onSubmit={handleSignup}>
          <div className="signup_nameFieldsGrid">
            <div className="signup_inputGroup">
              <label htmlFor="first_name" className="signup_label text-neutral-text">
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
            <div className="signup_inputGroup">
              <label htmlFor="last_name" className="signup_label text-neutral-text">
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
          <div className="signup_inputGroup">
            <label htmlFor="email" className="signup_label text-neutral-text">
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
          <div className="signup_inputGroup">
            <label htmlFor="password" className="signup_label text-neutral-text">
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
            <div className="password-requirements">
              <ul>
                <li className={passwordErrors.length ? "valid" : "invalid"}>
                  At least 8 characters
                </li>
                <li className={passwordErrors.uppercase ? "valid" : "invalid"}>
                  At least one uppercase letter
                </li>
                <li className={passwordErrors.lowercase ? "valid" : "invalid"}>
                  At least one lowercase letter
                </li>
                <li className={passwordErrors.number ? "valid" : "invalid"}>
                  At least one number
                </li>
              </ul>
            </div>
          </div>
          <div className="signup_inputGroup">
            <label htmlFor="country_code" className="signup_label text-neutral-text">
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
          <div className="signup_inputGroup">
            <label htmlFor="state" className="signup_label text-neutral-text">
              State/Province
            </label>
            <input
              id="state"
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="form-input"
              placeholder="e.g. NY or ON"
            />
          </div>
          <div className="signup_inputGroup">
            <div className="flex items-center">
              <input
                id="agree-to-terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="form-checkbox"
              />
              <label htmlFor="agree-to-terms" className="ml-2 text-sm text-neutral-text">
                I agree to the <Link to="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link>.
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading || !agreedToTerms}
            className="signup_button btn btn-primary"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        {message && <p className="signup_message text-error">{message}</p>}
        <p className="signup_loginText text-neutral-text/60">
          Already have an account?{" "}
          <Link to="/login" className="signup_loginLink text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
