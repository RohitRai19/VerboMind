import React, {useState}from 'react'
import {getAuth,createUserWithEmailAndPassword,updateProfile} from 'firebase/auth'
import {app} from '../FireBase/firebase'
import './singup.css'
import Verbomind from '../Verbomind logo.png'
import { useNavigate } from 'react-router-dom'

const auth = getAuth(app)

function SignUp() {
const [email, setEmail]=useState('')
const[password,setPassword]= useState('')
const[name,setName]=useState('')
const navigate = useNavigate()


  const createUser=(e)=>{
    e.preventDefault();
  createUserWithEmailAndPassword(auth,email,password).then((userCredential)=>{
    const user= userCredential.user
    return updateProfile(user,{
      displayName:name
    }).then(()=>{
      return auth.currentUser.reload();
    })
  })
  .then(()=>{
    // alert("Success")
    console.log("Success")
    navigate('/chat')
  })
  .catch((error)=>{
      alert(error.message)
  })}
  return (
    <div className="signup__page">
  <div className="SingUplogo__header">
    <div className="SingUplogo">
      <img src={Verbomind} alt="Logo" />
    </div>
    <div className="icon"></div>
  </div>

  <div className="signup__container">
    
    <h2>Create Your Account</h2>
    <form className="signup__form" onSubmit={createUser}>
      <input type="text" name='Full name'  onChange={(e)=>setName(e.target.value)} value={name} placeholder="Full Name" required />
      <input type="email"  email="Email"onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Email Address" required />
      <input type="password" name="Password"onChange={(e)=>setPassword(e.target.value)} value={password}placeholder="Password" required />
     
      <button type="submit" >Sign Up</button>
      <p className="login__redirect">Already have an account? <a href="/login">Login</a></p>
    </form>
  </div>
</div>

  )
}

export default SignUp