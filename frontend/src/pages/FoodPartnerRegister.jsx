import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/auth.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const restaurantName = e.target.restaurantName.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:3000/api/auth/foodpartner/register", {
      name: restaurantName,
      contactName,
      phone,
      email,
      password
    }, {
      withCredentials: true
    });

    console.log(response.data);
    navigate("/create-food");
  }
  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <header className="auth-header">
          <nav className="role-switch" aria-label="Register as">
            <Link className="tab" to="/user/register">Register as user</Link>
            <Link className="tab active" to="/food-partner/register">Register as food partner</Link>
          </nav>
          <h1 className="auth-title">Partner sign up</h1>
          <p className="auth-subtitle">Join as a food partner and start receiving orders.</p>
        </header>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label" htmlFor="restaurantName">Restaurant/Brand name</label>
            <input className="input" id="restaurantName" name="restaurantName" placeholder="Tasty Bites" />
          </div>

          <div className="row">
            <div className="field">
              <label className="label" htmlFor="contactName">Contact person</label>
              <input className="input" id="contactName" name="contactName" placeholder="Jane Doe" />
            </div>
            <div className="field">
              <label className="label" htmlFor="phone">Phone</label>
              <input className="input" id="phone" name="phone" placeholder="+1 555 0123" />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="email">Business email</label>
            <input className="input" id="email" name="email" type="email" placeholder="partner@example.com" />
          </div>

          <div className="field">
            <label className="label" htmlFor="password">Password</label>
            <input className="input" id="password" name="password" type="password" placeholder="••••••••" />
          </div>

          <div className="actions">
            <button type="submit" className="btn">Create partner account</button>
            <div className="link-row">
              <span className="muted">Already a partner?</span>
              <Link className="link" to="/food-partner/login">Sign in</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FoodPartnerRegister
