import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthPage from '../components/AuthPage'

const userRegisterFields = [
  { name: 'fullName', label: 'Full name', type: 'text', placeholder: 'Enter your full name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a password' },
]

const userLoginFields = [
  { name: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' },
]

const partnerRegisterFields = [
  { name: 'restaurantName', label: 'Restaurant name', type: 'text', placeholder: 'Your restaurant name' },
  { name: 'ownerName', label: 'Owner name', type: 'text', placeholder: 'Full owner name' },
  { name: 'email', label: 'Email', type: 'email', placeholder: 'restaurant@example.com' },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Create a password' },
]

const partnerLoginFields = [
  { name: 'email', label: 'Email', type: 'email', placeholder: 'restaurant@example.com' },
  { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter your password' },
]

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/user/register"
          element={
            <AuthPage
              type="register"
              badge="User"
              title="Create your account"
              subtitle="Start exploring food experiences made for you."
              fields={userRegisterFields}
              footerText="Already have an account?"
              footerLink="Log in"
              footerHref="/user/login"
            />
          }
        />

        <Route
          path="/user/login"
          element={
            <AuthPage
              type="login"
              badge="User"
              title="Welcome back"
              subtitle="Sign in to continue ordering your favorites."
              fields={userLoginFields}
              footerText="New here?"
              footerLink="Create account"
              footerHref="/user/register"
            />
          }
        />

        <Route
          path="/foodpartner/register"
          element={
            <AuthPage
              type="register"
              badge="Food Partner"
              title="Grow your restaurant"
              subtitle="Join FoodView and reach more customers every day."
              fields={partnerRegisterFields}
              footerText="Already part of us?"
              footerLink="Log in"
              footerHref="/foodpartner/login"
            />
          }
        />

        <Route
          path="/foodpartner/login"
          element={
            <AuthPage
              type="login"
              badge="Food Partner"
              title="Partner dashboard"
              subtitle="Sign in to manage your orders and menu updates."
              fields={partnerLoginFields}
              footerText="Need an account?"
              footerLink="Register"
              footerHref="/foodpartner/register"
            />
          }
        />
      </Routes>
    </Router>
  )
}

export default AppRoutes