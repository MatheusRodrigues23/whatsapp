import './App.css';
import { useEffect, useState } from 'react';
import image from './assets/profissao-programador_f801491a16284b568c89f23520ea8679.jpg'
import SendMessageIcon from './assets/send_4febd72a71c34f3c9c99e5536d44887e.webp'
import  Socket from 'socket.io-client';

const io = Socket('http://localhost:4000');


function App(){

  const [name,setName] = useState("");
  const [joined,setJoined] = useState(false);
  const [users,setUsers] = useState([]);
  const [message,setMessage] = useState('');
  const [messages,setMessages] = useState('');


useEffect(()=> {  
  io.on("users",(users) => setUsers(users));
  io.on("message", (message) => setMessages((messages) => [...messages, message]))
}, [])

const handleJoin = () => {  
  if (name){  
    io.emit("join", name);
    setJoined(true)
  }}

    const handleMessage = () => { 
      if(message){  
        io.emit("message", {message,name})
        setMessage("");
      }
    }


if(!joined){  
  return (  
    <div> 
      <span>Digite seu nome</span>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => handleJoin()}>entrar</button>
    </div>
  )
}


  return (
    <div className='container'>
        <div className='back-ground'></div>
        <div className='chat-container'>


        <div className='chat-contacts'>
        <div className='chat-options'></div>
        <div className='chat-item'> 
        <img src={image} className='image-profile' alt=''/>
        <div className='title-chat-container'>  
           <span className='title-menssage'>Network Profissao progamador</span>
           <span className='last-menssage'>Paulo: Bom dia! </span>
        </div>
        </div>
    </div>


      <div className='chat-messages'> 
        <div className='chat-options'>  
        <div className='chat-item'> 
          <img src={image} className='image-profile' alt=''/>
          <div className='title-chat-container'>  
            <span className='title-menssage'>Network Profissao progamador</span>
            <span className='last-menssage'>  
              {users.map((user, index) => ( 
                <span>{user.name}{index + 1 < users.length? ',' : ' '}</span>
              ))}
              </span>
          </div>
        </div>
      </div>

          <div className='chat-menssages-area'>   
            {messages.map((message,index) => (  
              <span key={index}>{message.name? `${message.name}:` : ''} {message.message}</span>
            ))}
            </div>
          
            <div className='chat-input-area'> 
              <input 
              className='chat-input' 
              placeholder='Mensagem' 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              />
              <img src={SendMessageIcon} className='Send-message-icon' alt='' onClick={() => handleMessage()}/>
            </div>
            </div>



    </div>
  </div>
  );
}

export default App;
