// src/pages/Login.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../auth/AuthContext";
import { toast } from "react-toastify";

interface FieldErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const { state } = useLocation() as {
    state?: { justRegistered?: boolean; isManager?: boolean };
  };
  const { login } = useAuth();

  const [venueManager, setVenueManager] = useState(
    state?.isManager ?? false
  );
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(() => {
    if (state?.justRegistered) {
      toast.success("Registration successful, please log in");
    }
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1) Quick client-side sanity checks
    const errs: FieldErrors = {};
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!form.email.includes("@stud.noroff.no")) {
      errs.email = "Must be a stud.noroff.no address";
    }
    if (!form.password) {
      errs.password = "Password is required";
    }
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    // 2) Call the API
    try {
      const { data } = await loginUser({
        email: form.email,
        password: form.password,
      });

      // 3) Success! persist and redirect
      login({
        token: data.accessToken,
        name: data.name,
        email: data.email,
        venueManager: data.venueManager,
      });
      navigate(
        data.venueManager
          ? "/account/manager"
          : "/account/customer"
      );
    } catch (err: any) {
      // 4) Always generic
      setErrors({ general: "Email or password is incorrect" });
    }
  };

  return (
    <div className="container my-5">
      <div className="mx-auto" style={{ maxWidth: 480 }}>
        <h2 className="mb-4 text-center">Log in</h2>

        {/* account type toggle */}
        <div className="btn-group mb-3 w-100">
          <button
            type="button"
            className={`btn ${
              !venueManager ? "btn-warning" : "btn-outline-secondary"
            }`}
            onClick={() => setVenueManager(false)}
          >
            Customer
          </button>
          <button
            type="button"
            className={`btn ${
              venueManager ? "btn-warning" : "btn-outline-secondary"
            }`}
            onClick={() => setVenueManager(true)}
          >
            Venue Manager
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={`form-control ${
                errors.password ? "is-invalid" : ""
              }`}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-warning w-100">
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}