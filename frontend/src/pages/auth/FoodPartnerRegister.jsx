import { Link, useNavigate } from 'react-router-dom'
import '../../styles/auth-sahred.css'
import axios from 'axios'

const FoodPartnerRegister = () => {

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const restaurantName = e.target.restaurantName.value;
        const address = e.target.address.value;
        const email = e.target.email.value;
        const password = e.target.password.value;

        const response = await axios.post("http://localhost:4000/api/auth/foodpartner/register", {
                restaurantName,
                address,
                email,
                password
            },
            {
                withCredentials: true
            })
            .then(response => {
                console.log(response.data);
                navigate("/create-food");
            })
            .catch(error => {
                console.error("Error occurred while registering food partner:", error);
            });
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
          <h1>Grow your restaurant</h1>
          <p>Join FoodView and reach more customers every day.</p>
        </div>

        <div className="account-switcher">
          <Link to="/user/register" className="switch-link">
            Register as user
          </Link>
          <Link to="/foodpartner/register" className="switch-link active">
            Register as food partner
          </Link>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label className="field-group">
            <span htmlFor="restaurantName">Restaurant name</span>
            <input type="text" id="restaurantName" placeholder="Your restaurant name" />
          </label>

          <label className="field-group">
            <span htmlFor="address">Address</span>
            <input type="text" id="address" placeholder="Full address" />
          </label>

          <label className="field-group">
            <span htmlFor="email">Email</span>
            <input type="email" id="email" placeholder="restaurant@example.com" />
          </label>

          <label className="field-group">
            <span htmlFor="password">Password</span>
            <input type="password" id="password" placeholder="Create a password" />
          </label>

          <button type="submit" className="primary-btn">
            Create account
          </button>
        </form>

        <p className="auth-footer">
          Already part of us? <Link to="/foodpartner/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default FoodPartnerRegister
