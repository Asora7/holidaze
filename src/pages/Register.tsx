import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import type { RegisterPayload } from "../api/auth";

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
  general?: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterPayload & { confirm: string }>({
    name: "",
    email: "",
    password: "",
    confirm: "",
    venueManager: false,
  });
  const [errors, setErrors] = useState<FieldErrors>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const toggleAccountType = (isManager: boolean) => {
    setForm((f) => ({ ...f, venueManager: isManager }));
  };

  const validate = (): boolean => {
    const errs: FieldErrors = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.includes("@stud.noroff.no"))
      errs.email = "Must be a stud.noroff.no address";
    if (form.password.length < 8)
      errs.password = "Password must be ≥ 8 characters";
    if (form.password !== form.confirm) errs.confirm = "Passwords must match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const { data } = await registerUser({
        name: form.name,
        email: form.email,
        password: form.password,
        venueManager: form.venueManager,
      });

      localStorage.setItem("token", data.accessToken);

      navigate("/login", {
        state: {
          justRegistered: true,
          isManager: form.venueManager,
        },
      });
    } catch (err: any) {
      if (err.errors) setErrors(err.errors);
      else setErrors({ general: "Registration failed" });
    }
  };

  return (
    <div className="container my-5">
      <div className="mx-auto" style={{ maxWidth: 480 }}>
        <h2 className="mb-4 text-center">Register</h2>

        <div className="btn-group mb-3 w-100">
          <button
            type="button"
            className={
              "btn " +
              (!form.venueManager ? "btn-warning" : "btn-outline-secondary")
            }
            onClick={() => toggleAccountType(false)}
          >
            Customer
          </button>
          <button
            type="button"
            className={
              "btn " +
              (form.venueManager ? "btn-warning" : "btn-outline-secondary")
            }
            onClick={() => toggleAccountType(true)}
          >
            Venue Manager
          </button>
        </div>
        <p className="text-center text-muted mb-4">
          {form.venueManager
            ? "Venue Manager account: For listing and managing venues."
            : "Customer account: For booking venues and managing your trips."}
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {errors.general && (
            <div className="alert alert-danger">{errors.general}</div>
          )}

          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={"form-control " + (errors.name ? "is-invalid" : "")}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={"form-control " + (errors.email ? "is-invalid" : "")}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className={
                "form-control " + (errors.password ? "is-invalid" : "")
              }
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirm"
              value={form.confirm}
              onChange={handleChange}
              className={"form-control " + (errors.confirm ? "is-invalid" : "")}
            />
            {errors.confirm && (
              <div className="invalid-feedback">{errors.confirm}</div>
            )}
          </div>

          <button type="submit" className="btn btn-warning w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
