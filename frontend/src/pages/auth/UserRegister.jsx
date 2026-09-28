import { Link, useNavigate } from 'react-router-dom'
import '../../styles/auth-sahred.css'
import axios from 'axios'

const UserRegister = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => { 
        e.preventDefault();

        const fullName = e.target.fullName.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await   axios.post("http://localhost:4000/api/auth/user/register", {
                fullName,
                email,
                password
            },
            {
                withCredentials: true
            });

        console.log(response.data);

        navigate("/");

    };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="brand-mark">F</div>
          <span>FoodView</span>
        </div>

        <div className="auth-header">
          <span className="auth-badge">User</span>
          <h1>Create your account</h1>
          <p>Start exploring food experiences made for you.</p>
        </div>

        <div className="account-switcher">
          <Link to="/user/register" className="switch-link active">
            Register as user
          </Link>
          <Link to="/foodpartner/register" className="switch-link">
            Register as food partner
          </Link>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="field-group">
            <span htmlFor="fullName">Full name</span>
            <input type="text" id="fullName" name="fullName" placeholder="Enter your full name" />
          </label>

          <label className="field-group">
            <span htmlFor="email">Email</span>
            <input type="email" id="email" name="email" placeholder="you@example.com" />
          </label>

          <label className="field-group">
            <span htmlFor="password">Password</span>
            <input type="password" id="password" name="password" placeholder="Create a password" />
          </label>

          <button type="submit" className="primary-btn">
            Create account
          </button>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/user/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default UserRegister
