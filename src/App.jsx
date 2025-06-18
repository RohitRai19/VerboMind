
import './App.css';
import Chat from './Client/Chat';
import Login from './Login/login';
import SignUp from './SignUp/SignUp';
import Logo from './Verbomind logo.png'
const App = () => {
 return(
  <>
  <div id='App__header'>
 <div className='logo__header'>
   <div className='logo'>
    <img src={Logo} alt="Logo"/>
   </div>
   <div className='icon'>
   </div>

    </div>
      <div className="main__layout">
      <aside className="sidebar">

        <div>User Input</div>
        <div>Settings</div>
        <div>New Chat</div>
      </aside>
      <main className='chat__box'>
            {/* <Chat /> */}
     
      </main>
      </div>
      <Login/>

    {/* <SignUp/> */}
    </div>


  </>
 )
};

export default App;
