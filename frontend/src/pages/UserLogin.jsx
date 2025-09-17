import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/auth/user/login", {
      email,
      password
    }, {
      withCredentials: true
    })

    console.log(response.data);

    navigate("/home");
  }
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <header className="auth-header">
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to continue ordering.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="email">Email</label>
            <input className="input" id="email" name="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="field">
            <label className="label" htmlFor="password">Password</label>
            <input className="input" id="password" name="password" type="password" placeholder="••••••••" />
          </div>
          <div className="actions">
            <button type="submit" className="btn">Sign in</button>
            <div className="link-row">
              <span className="muted">New here?</span>
              <Link className="link" to="/user/register">Create an account</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UserLogin
