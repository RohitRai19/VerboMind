
import './App.css';
import {BrowserRouter as Router,Routes,Route, Link,Navigate} from "react-router-dom"
import { getAuth,onAuthStateChanged,signOut } from 'firebase/auth';
import {app} from './FireBase/firebase'
import Chat from './Client/Chat';
import Login from './pages/login';
import SignUp from './pages/SignUp';
import Logo from './Verbomind logo.png'
import { useEffect, useState } from 'react';
import Sidemenu from './Sidebar/Sidemenu';
import {ClearChat} from './DataContext';
const auth = getAuth(app)

const App = () => {

const[userName,setUserName]=useState('');
const[status,setStatus]=useState('')
const[name,setName]=useState('Btn1')

useEffect(()=>{
  const unSubscribe =onAuthStateChanged(auth,async (user)=>{
    if(user){
      await user.reload()
      setUserName(user.displayName)
    }else{
      setUserName('')
    }
  })
  return()=> unSubscribe()
},[])

const logout = () => {
  signOut(auth)
    .then(() => {
      setStatus("Log Out");
      console.log("setStaus",status)
    
    })
    .catch((error) => {
      alert(error.message);
    });
};


 return(
  <>
   <Router>
     <Routes>
       <Route path="/" element={<Navigate to="/chat" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chat" element={
      
          <ClearChat.Provider
           value={name}>
          <div id='App__header'>
 <div className='logo__header'>
   <div className='logo'>
    <img src={Logo} alt="Logo"/>
   </div>
   <div className='icon'>
    <div className="userName">{userName?`${userName}`:""}</div>
    <ul>
{auth.currentUser ? (
  <li id='loginBtn' onClick={logout}>
    <Link to=''>Log Out</Link>
  </li>
) : (
  <li id='loginBtn'>
    <Link to='/login'>Log In</Link>
  </li>
)}
    </ul>
    
   </div>

    </div>
      <div className="main__layout">
      <aside className="sidebar">
                <Sidemenu/>
      </aside>
      <main className='chat__box'>
            <Chat/>

      </main>
      </div>
    </div>
   </ClearChat.Provider>
    }/>

      </Routes>
  

</Router>
  </>
 )
};

export default App;
