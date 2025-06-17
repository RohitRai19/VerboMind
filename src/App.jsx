
import './App.css';
import Chat from './Client/Chat';



const App = () => {

 return(
  <>
  <div id='App__header'>
 <div className='logo__header'>
   <h1 className='Logo'>VerboMind </h1>
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
            <Chat />
      </main>
      </div>


   
    </div>


  </>
 )
};

export default App;
