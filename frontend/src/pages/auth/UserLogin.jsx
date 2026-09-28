import { Link, useNavigate } from 'react-router-dom'
import '../../styles/auth-sahred.css'
import axios from 'axios'


const UserLogin = () => {
    
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post("http://localhost:4000/api/auth/user/login", {
                email,
                password
            },
            {
                withCredentials: true
            });

        console.log(response.data);

        navigate("/");
    }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="brand-mark">F</div>
          <span>FoodView</span>
        </div>

        <div className="auth-header">
          <span className="auth-badge">User</span>
          <h1>Welcome back</h1>
          <p>Sign in to continue ordering your favorites.</p>
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
            <input type="email" id="email" name="email" placeholder="you@example.com" />
          </label>

          <label className="field-group">
            <span htmlFor="password">Password</span>
            <input type="password" id="password" name="password" placeholder="Enter your password" />
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
          New here? <Link to="/user/register">Create account</Link>
        </p>
      </div>
    </div>
  )
}

export default UserLogin
