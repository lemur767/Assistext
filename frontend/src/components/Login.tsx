import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, AlertCircle } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { GlassCard } from "./common/GlassCard";
import { api } from "../services/api";
import "../styles/Login_auth.css";

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
      const data = await api.post("/auth/login", { email, password });
      setSession({ token: data.token });
      navigate("/dashboard");
    } catch (err: unknown) {
      setMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-container">
      {/* Background gradient effects */}
      <div className="auth-glow-blob top-left" />
      <div className="auth-glow-blob bottom-right" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-content-wrapper"
      >
        <GlassCard variant="solid" className="auth-card-padding">
          {/* Logo */}
          <div className="auth-header">
            <img src="assets/logonew.png" alt="Logo" className="auth-logo" />
            <h2 className="auth-title">
              Welcome Back
            </h2>
            <p className="auth-subtitle">
              Sign in to your Assistext account
            </p>
          </div>
          {/* Error Message */}
          {
            message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="auth-error-message"
              >
                <AlertCircle className="auth-error-icon" />
                <p className="auth-error-text">{message}</p>
              </motion.div>
            )
          }

          {/* Form */}
          <form onSubmit={handleLogin} className="auth-form">
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
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="btn-primary auth-submit-btn"
            >
              {loading ? "Signing in..." : "Sign In"}
            </motion.button>
          </form>

          {/* Sign up link */}
          <p className="auth-footer-text">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="auth-footer-link"
            >
              Sign up
            </Link>
          </p>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default Login;
