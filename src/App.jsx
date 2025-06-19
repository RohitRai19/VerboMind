
import './App.css';
import {BrowserRouter as Router,Routes,Route, Link} from "react-router-dom"
import Chat from './Client/Chat';
import Login from './pages/login';
import SignUp from './pages/SignUp';
import Logo from './Verbomind logo.png'
const App = () => {



 return(
  <>
   <Router>
     <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chat" element={<div id='App__header'>
 <div className='logo__header'>
   <div className='logo'>
    <img src={Logo} alt="Logo"/>
   </div>
   <div className='icon'>
    <ul>
<li id='loginBtn'><Link to=''>logout</Link></li>
    </ul>
    
   </div>

    </div>
      <div className="main__layout">
      <aside className="sidebar">

        <div>User Input</div>
        <div>Settings</div>
        {/* <li><Link to={'/Chat'}>New Chat</Link></li> */}
      </aside>
      <main className='chat__box'>
            <Chat />
     
      </main>
      </div>
      {/* <Login/> */}

    {/* <SignUp/> */}
    </div>}/>

      </Routes>
  

</Router>
  </>
 )
};

export default App;
