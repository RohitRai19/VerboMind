import React from 'react'
import './login.css'
import VerboMind from './verbomind_left_background.png'
export default function Login() {
  return (
    <div className='Loginpage'>
        <div className="loginRigth">
            <img src={VerboMind} alt="login Image" />
        </div>
        <div className='loginLeft'>
            <h1>Log in</h1>
            <input type="email" className='LogninIntput' name="email"  placeholder='Enter your Email' />
            <input type="password" className='LogninIntput' name="password" placeholder='Enter your Password'/>
            <button type='button' className='LoginBtn'>Login</button>
        </div>
    </div>
  )
}
