import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/auth/foodpartner/login", {
      email,
      password
    }, {
      withCredentials: true
    })

    console.log(response.data);
    navigate("/create-food");
  }
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <header className="auth-header">
          <h1 className="auth-title">Partner sign in</h1>
          <p className="auth-subtitle">Access your partner dashboard.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="email">Business email</label>
            <input className="input" id="email" name="email" type="email" placeholder="partner@example.com" />
          </div>
          <div className="field">
            <label className="label" htmlFor="password">Password</label>
            <input className="input" id="password" name="password" type="password" placeholder="••••••••" />
          </div>
          <div className="actions">
            <button type="submit" className="btn">Sign in</button>
            <div className="link-row">
              <span className="muted">New partner?</span>
              <Link className="link" to="/food-partner/register">Create an account</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FoodPartnerLogin
