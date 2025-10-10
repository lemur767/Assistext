import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import "../styles/Signup.css";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country_code, setCountryCode] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { setSession } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      setMessage("You must agree to the Terms of Service and Privacy Policy.");
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
          first_name,
          last_name,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setSession({ token: data.access_token });
      navigate("/dashboard");
    } catch (err: unknown) {
      setMessage((err as Error).message);
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
