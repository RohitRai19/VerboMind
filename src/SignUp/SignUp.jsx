import React from 'react'
import './singup.css'
import Verbomind from '../Verbomind logo.png'
function SignUp() {
  return (
    <div className="signup__page">
  <div className="logo__header">
    <div className="logo">
      <img src={Verbomind} alt="Logo" />
    </div>
    <div className="icon"></div>
  </div>

  <div className="signup__container">
    
    <h2>Create Your Account</h2>
    <form className="signup__form">
      <input type="text" placeholder="Full Name" required />
      <input type="email" placeholder="Email Address" required />
      <input type="password" placeholder="Password" required />
      <input type="password" placeholder="Confirm Password" required />
      <button type="submit">Sign Up</button>
      <p className="login__redirect">Already have an account? <a href="/login">Login</a></p>
    </form>
  </div>
</div>

  )
}

export default SignUp