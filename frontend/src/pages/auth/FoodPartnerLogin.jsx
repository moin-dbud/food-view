import { Link, useNavigate } from 'react-router-dom'
import '../../styles/auth-sahred.css'
import axios from 'axios'

const FoodPartnerLogin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const response = await axios.post("http://localhost:4000/api/auth/foodpartner/login", {
            email,
            password
        },
        {
            withCredentials: true
        });

    console.log(response.data);
    navigate("/create-food");
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="brand-mark">F</div>
          <span>FoodView</span>
        </div>

        <div className="auth-header">
          <span className="auth-badge">Food Partner</span>
          <h1>Partner dashboard</h1>
          <p>Sign in to manage your orders and menu updates.</p>
        </div>

        <div className="account-switcher">
          <Link to="/user/register" className="switch-link">
            Register as user
          </Link>
          <Link to="/foodpartner/register" className="switch-link">
            Register as food partner
          </Link>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="field-group">
            <span htmlFor="email">Email</span>
            <input type="email" id="email" placeholder="restaurant@example.com" />
          </label>

          <label className="field-group">
            <span htmlFor="password">Password</span>
            <input type="password" id="password" placeholder="Enter your password" />
          </label>

          <div className="inline-row">
            <label className="remember-box">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit" className="primary-btn">
            Log in
          </button>
        </form>

        <p className="auth-footer">
          Need an account? <Link to="/foodpartner/register">Register</Link>
        </p>
      </div>
    </div>
  )
}

export default FoodPartnerLogin
