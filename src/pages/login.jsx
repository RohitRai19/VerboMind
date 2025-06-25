import React, { useState } from 'react'
import {getAuth,signInWithEmailAndPassword} from 'firebase/auth'
import './login.css'
import {app} from '../FireBase/firebase'
import VerboMind from './verbomind_left_background.png'
import { useNavigate } from 'react-router-dom'

const auth= getAuth(app);
export default function Login() {
  const [email,setEmail]=useState('')
  const[password,setPassword]=useState('')
  const navigate= useNavigate()

  const signIn=()=>{
    signInWithEmailAndPassword(auth,email,password).then((userCredential)=>{
        const user = userCredential.user;
        console.log("User logged in",user.email, "and",user.name) 
        navigate('/chat')}
      )
     
    .catch((error)=>{
      console.log("login error", error.message)
      alert(error.message,"please login again")
    })

  }

    const singnupnavigate=()=>{
          navigate('/signup')
    }

  return (
    <div className='Loginpage'>
        <div className="loginRigth">
            <img src={VerboMind} alt="login Image" />
        </div>
        <div className='loginLeft'>
            <h1>Log in</h1>
            <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className='LogninIntput' name="email"  placeholder='Enter your Email' />
            <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className='LogninIntput' name="password" placeholder='Enter your Password'/>
            <button type='button' onClick={signIn} className='LoginBtn'>Login</button>
            <div>Don't Have an account? <span className="signupbtn" onClick={singnupnavigate}>Sign up</span></div>
        </div>
    </div>
  )
}
