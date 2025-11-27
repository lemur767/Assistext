import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, User, MapPin, Globe, AlertCircle, Check, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { GlassCard } from "./common/GlassCard";

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

  const isPasswordValid = Object.values(passwordErrors).every((v) => v);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--background)',
      padding: '2rem 1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background gradient effects */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '10%',
        width: '20rem',
        height: '20rem',
        background: 'radial-gradient(circle, rgba(236, 155, 59, 0.15), transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        left: '10%',
        width: '20rem',
        height: '20rem',
        background: 'radial-gradient(circle, rgba(71, 228, 187, 0.15), transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        pointerEvents: 'none'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '32rem', position: 'relative', zIndex: 1 }}
      >
        <GlassCard variant="solid" style={{ padding: '2.5rem' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{
              width: '4rem',
              height: '4rem',
              margin: '0 auto 1rem',
              borderRadius: '1rem',
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles style={{ width: '2rem', height: '2rem', color: 'white' }} />
            </div>
            <h2 style={{ fontSize: '1.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              Create Account
            </h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: '0.938rem' }}>
              Get started with Assistext today
            </p>
          </div>

          {/* Error Message */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.75rem',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <AlertCircle style={{ width: '1.25rem', height: '1.25rem', color: '#EF4444', flexShrink: 0 }} />
              <p style={{ fontSize: '0.875rem', color: '#EF4444', margin: 0 }}>{message}</p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Name Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label htmlFor="first_name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--foreground)' }}>
                  First Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User style={{
                    position: 'absolute',
                    left: '0.875rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1.125rem',
                    height: '1.125rem',
                    color: 'var(--muted-foreground)',
                    pointerEvents: 'none'
                  }} />
                  <input
                    id="first_name"
                    type="text"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="form-input"
                    style={{ width: '100%', paddingLeft: '2.75rem' }}
                    placeholder="John"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="last_name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--foreground)' }}>
                  Last Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User style={{
                    position: 'absolute',
                    left: '0.875rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1.125rem',
                    height: '1.125rem',
                    color: 'var(--muted-foreground)',
                    pointerEvents: 'none'
                  }} />
                  <input
                    id="last_name"
                    type="text"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="form-input"
                    style={{ width: '100%', paddingLeft: '2.75rem' }}
                    placeholder="Doe"
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--foreground)' }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail style={{
                  position: 'absolute',
                  left: '0.875rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1.125rem',
                  height: '1.125rem',
                  color: 'var(--muted-foreground)',
                  pointerEvents: 'none'
                }} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="form-input"
                  style={{ width: '100%', paddingLeft: '2.75rem' }}
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--foreground)' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock style={{
                  position: 'absolute',
                  left: '0.875rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '1.125rem',
                  height: '1.125rem',
                  color: 'var(--muted-foreground)',
                  pointerEvents: 'none'
                }} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-input"
                  style={{ width: '100%', paddingLeft: '2.75rem' }}
                  placeholder="••••••••"
                />
              </div>

              {/* Password Requirements */}
              {password && (
                <div style={{
                  marginTop: '0.75rem',
                  padding: '0.75rem',
                  borderRadius: '0.5rem',
                  backgroundColor: isPasswordValid ? 'rgba(71, 228, 187, 0.1)' : 'var(--muted)',
                  border: `1px solid ${isPasswordValid ? 'rgba(71, 228, 187, 0.3)' : 'var(--border)'}`
                }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.75rem' }}>
                    {[
                      { key: 'length', label: '8+ characters' },
                      { key: 'uppercase', label: 'Uppercase' },
                      { key: 'lowercase', label: 'Lowercase' },
                      { key: 'number', label: 'Number' }
                    ].map(({ key, label }) => (
                      <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        {passwordErrors[key as keyof typeof passwordErrors] ? (
                          <Check style={{ width: '0.875rem', height: '0.875rem', color: 'var(--secondary)' }} />
                        ) : (
                          <X style={{ width: '0.875rem', height: '0.875rem', color: 'var(--muted-foreground)' }} />
                        )}
                        <span style={{ color: passwordErrors[key as keyof typeof passwordErrors] ? 'var(--secondary)' : 'var(--muted-foreground)' }}>
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Location Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label htmlFor="country_code" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--foreground)' }}>
                  Country Code
                </label>
                <div style={{ position: 'relative' }}>
                  <Globe style={{
                    position: 'absolute',
                    left: '0.875rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1.125rem',
                    height: '1.125rem',
                    color: 'var(--muted-foreground)',
                    pointerEvents: 'none'
                  }} />
                  <input
                    id="country_code"
                    type="text"
                    value={country_code}
                    onChange={(e) => setCountryCode(e.target.value)}
                    required
                    className="form-input"
                    style={{ width: '100%', paddingLeft: '2.75rem' }}
                    placeholder="US"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="state" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 500, color: 'var(--foreground)' }}>
                  State/Province
                </label>
                <div style={{ position: 'relative' }}>
                  <MapPin style={{
                    position: 'absolute',
                    left: '0.875rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '1.125rem',
                    height: '1.125rem',
                    color: 'var(--muted-foreground)',
                    pointerEvents: 'none'
                  }} />
                  <input
                    id="state"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    required
                    className="form-input"
                    style={{ width: '100%', paddingLeft: '2.75rem' }}
                    placeholder="NY"
                  />
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
              <input
                id="agree-to-terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                style={{
                  width: '1.125rem',
                  height: '1.125rem',
                  marginTop: '0.125rem',
                  cursor: 'pointer',
                  accentColor: 'var(--primary)'
                }}
              />
              <label htmlFor="agree-to-terms" style={{ fontSize: '0.875rem', color: 'var(--foreground)', cursor: 'pointer', lineHeight: 1.5 }}>
                I agree to the{" "}
                <Link to="/terms-of-service" style={{ color: 'var(--primary)', fontWeight: 500, textDecoration: 'none' }}>
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link to="/privacy-policy" style={{ color: 'var(--primary)', fontWeight: 500, textDecoration: 'none' }}>
                  Privacy Policy
                </Link>
              </label>
            </div>

            <motion.button
              type="submit"
              disabled={loading || !agreedToTerms}
              whileHover={{ scale: (loading || !agreedToTerms) ? 1 : 1.02 }}
              whileTap={{ scale: (loading || !agreedToTerms) ? 1 : 0.98 }}
              className="btn-primary"
              style={{
                width: '100%',
                padding: '0.875rem',
                borderRadius: '0.75rem',
                fontSize: '0.938rem',
                fontWeight: 500,
                marginTop: '0.5rem',
                opacity: (loading || !agreedToTerms) ? 0.5 : 1,
                cursor: (loading || !agreedToTerms) ? 'not-allowed' : 'pointer'
              }}
            >
              {loading ? "Creating account..." : "Create Account"}
            </motion.button>
          </form>

          {/* Login link */}
          <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.938rem', color: 'var(--muted-foreground)' }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ color: 'var(--primary)', fontWeight: 500, textDecoration: 'none' }}
              onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
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
