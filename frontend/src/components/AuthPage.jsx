import './AuthPage.css'

const AuthPage = ({
  type,
  title,
  subtitle,
  badge,
  fields,
  footerText,
  footerLink,
  footerHref,
}) => {
  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-brand">
          <div className="brand-mark">F</div>
          <span>FoodView</span>
        </div>

        <div className="auth-header">
          <span className="auth-badge">{badge}</span>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <div className="account-switcher">
          <a href="/user/register" className="switch-link active">
            Register as user
          </a>
          <a href="/foodpartner/register" className="switch-link">
            Register as food partner
          </a>
        </div>

        <form className="auth-form">
          {fields.map((field) => (
            <label key={field.name} className="field-group">
              <span>{field.label}</span>
              <input
                type={field.type || 'text'}
                name={field.name}
                placeholder={field.placeholder}
              />
            </label>
          ))}

          {type === 'login' && (
            <div className="inline-row">
              <label className="remember-box">
                <input type="checkbox" />
                <span>Remember me</span>
              </label>
              <a href="#">Forgot password?</a>
            </div>
          )}

          <button type="button" className="primary-btn">
            {type === 'login' ? 'Log in' : 'Create account'}
          </button>
        </form>

        <p className="auth-footer">
          {footerText}{' '}
          <a href={footerHref}>{footerLink}</a>
        </p>
      </div>
    </div>
  )
}

export default AuthPage
