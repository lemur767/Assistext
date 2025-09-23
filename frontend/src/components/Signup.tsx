/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { useAuth } from "../App";
import { Link } from "react-router-dom";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country_code, setCountryCode] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const auth = useAuth();

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
      auth?.setSession({
        token: data.access_token,
        ghost_number: data.user.phone_number,
        trial_expires_at: data.user.trial_expires_at,
      });
    } catch (err: unknown) {
      setMessage((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-8 glass-morphism rounded-2xl shadow-lg">
        <h2 className="text-4xl font-bold text-center gradient-text-brand">
          Create Account
        </h2>
        <form className="space-y-6" onSubmit={handleSignup}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="first_name" className="text-sm font-medium text-neutral-text">
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
            <div className="space-y-2">
              <label htmlFor="last_name" className="text-sm font-medium text-neutral-text">
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
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-neutral-text">
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
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-neutral-text">
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
          <div className="space-y-2">
            <label htmlFor="country_code" className="text-sm font-medium text-neutral-text">
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
            className="w-full btn btn-primary"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        {message && <p className="text-sm text-center text-error">{message}</p>}
        <p className="text-sm text-center text-neutral-text/60">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
