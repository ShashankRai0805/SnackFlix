import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserRegister = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/auth/user/register", {
      fullName: firstName + " " + lastName,
      email,
      password
    }, {
      withCredentials: true
    })

    console.log(response.data);

    navigate("/");

  }
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <header className="auth-header">
          <nav className="role-switch" aria-label="Register as">
            <Link className="tab active" to="/user/register">Register as user</Link>
            <Link className="tab" to="/food-partner/register">Register as food partner</Link>
          </nav>
          <h1 className="auth-title">Create your account</h1>
          <p className="auth-subtitle">Sign up as a user to order delicious meals.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="row">
            <div className="field">
              <label className="label" htmlFor="firstName">First name</label>
              <input className="input" id="firstName" name="firstName" placeholder="John" />
            </div>
            <div className="field">
              <label className="label" htmlFor="lastName">Last name</label>
              <input className="input" id="lastName" name="lastName" placeholder="Doe" />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="email">Email</label>
            <input className="input" id="email" name="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="field">
            <label className="label" htmlFor="password">Password</label>
            <input className="input" id="password" name="password" type="password" placeholder="••••••••" />
          </div>

          <div className="actions">
            <button type="submit" className="btn">Create account</button>
            <div className="link-row">
              <span className="muted">Already have an account?</span>
              <Link className="link" to="/user/login">Sign in</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserRegister
