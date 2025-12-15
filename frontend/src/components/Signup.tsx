import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, User, MapPin, Globe, AlertCircle, Check, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { GlassCard } from "./common/GlassCard";
import { api } from "../services/api";
import "../styles/Signup_auth.css";

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
      const data = await api.post("/auth/register", {
        email,
        password,
        country_code,
        state,
        first_name,
        last_name,
      });
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

  const isPasswordValid = Object.values(passwordErrors).every((v) => v);

  return (
    <div className="auth-page-container">
      {/* Background gradient effects */}
      <div className="auth-glow-blob top-right" />
      <div className="auth-glow-blob bottom-left" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-content-wrapper"
      >
        <GlassCard variant="solid" className="auth-card-padding">
          {/* Logo */}
          <div className="auth-header">
            <div className="auth-icon-wrapper">
              <Sparkles className="auth-icon-svg" />
            </div>
            <h2 className="auth-title">
              Create Account
            </h2>
            <p className="auth-subtitle">
              Get started with Assistext today
            </p>
          </div>

          {/* Error Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="auth-error-message"
            >
              <AlertCircle className="auth-error-icon" />
              <p className="auth-error-text">{message}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} className="auth-form">
            {/* Name Fields */}
            <div className="auth-form-grid">
              <div className="auth-form-group">
                <label htmlFor="first_name" className="auth-label">
                  First Name
                </label>
                <div className="auth-input-wrapper">
                  <User className="auth-input-icon" />
                  <input
                    id="first_name"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="form-input auth-input"
                    placeholder="John"
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="last_name" className="auth-label">
                  Last Name
                </label>
                <div className="auth-input-wrapper">
                  <User className="auth-input-icon" />
                  <input
                    id="last_name"
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="form-input auth-input"
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="auth-form-group">
              <label htmlFor="email" className="auth-label">
                Email
              </label>
              <div className="auth-input-wrapper">
                <Mail className="auth-input-icon" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input auth-input"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="auth-form-group">
              <label htmlFor="password" className="auth-label">
                Password
              </label>
              <div className="auth-input-wrapper">
                <Lock className="auth-input-icon" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input auth-input"
                  placeholder="••••••••"
                />
              </div>

              {/* Password Requirements */}
              {password && (
                <div className={`auth-password-requirements ${isPasswordValid ? 'valid-border' : ''}`}>
                  <div className="auth-password-req-grid">
                    {[
                      { key: 'length', label: '8+ characters' },
                      { key: 'uppercase', label: 'Uppercase' },
                      { key: 'lowercase', label: 'Lowercase' },
                      { key: 'number', label: 'Number' }
                    ].map(({ key, label }) => (
                      <div key={key} className="auth-password-req-item">
                        {passwordErrors[key as keyof typeof passwordErrors] ? (
                          <Check className="auth-req-icon valid" />
                        ) : (
                          <X className="auth-req-icon" />
                        )}
                        <span className={`auth-req-text ${passwordErrors[key as keyof typeof passwordErrors] ? 'valid' : ''}`}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Location Fields */}
            <div className="auth-form-grid">
              <div className="auth-form-group">
                <label htmlFor="country_code" className="auth-label">
                  Country Code
                </label>
                <div className="auth-input-wrapper">
                  <Globe className="auth-input-icon" />
                  <input
                    id="country_code"
                    type="text"
                    value={country_code}
                    onChange={(e) => setCountryCode(e.target.value)}
                    required
                    className="form-input auth-input"
                    placeholder="US"
                  />
                </div>
              </div>

              <div className="auth-form-group">
                <label htmlFor="state" className="auth-label">
                  State/Province
                </label>
                <div className="auth-input-wrapper">
                  <MapPin className="auth-input-icon" />
                  <input
                    id="state"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="form-input auth-input"
                    placeholder="NY"
                  />
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="auth-terms-wrapper">
              <input
                id="agree-to-terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="auth-terms-checkbox"
              />
              <label htmlFor="agree-to-terms" className="auth-terms-label">
                I agree to the{" "}
                <Link to="/terms-of-service" className="auth-link">
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link to="/privacy-policy" className="auth-link">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={loading || !agreedToTerms}
              whileHover={{ scale: (loading || !agreedToTerms) ? 1 : 1.02 }}
              whileTap={{ scale: (loading || !agreedToTerms) ? 1 : 0.98 }}
              className="btn-primary auth-submit-btn"
            >
              {loading ? "Creating account..." : "Create Account"}
            </motion.button>
          </form>

          {/* Login link */}
          <p className="auth-footer-text">
            Already have an account?{" "}
            <Link
              to="/login"
              className="auth-link"
            >
              Log in
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Signup;
