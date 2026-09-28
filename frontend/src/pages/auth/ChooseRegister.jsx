import { Link } from 'react-router-dom'
import '../../styles/auth-sahred.css'

const ChooseRegister = () => {
  return (
    <div className="auth-shell">
      <div className="auth-card auth-card--compact">
        <div className="auth-brand">
          <div className="brand-mark">F</div>
          <span>FoodView</span>
        </div>

        <div className="auth-header">
          <span className="auth-badge">Join</span>
          <h1>Create account</h1>
          <p>Choose how you want to join FoodView.</p>
        </div>

        <div className="account-switcher">
          <Link to="/user/register" className="switch-link active">
            Register as user
          </Link>
          <Link to="/foodpartner/register" className="switch-link">
            Register as food partner
          </Link>
        </div>

        <p className="auth-footer">
          Already have an account? <Link to="/user/login">Log in</Link>
        </p>
      </div>
    </div>
  )
}

export default ChooseRegister
