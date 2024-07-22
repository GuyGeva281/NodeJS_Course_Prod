const http = require('http');
const WebSocket= require('ws');
const path = require('path');

handleChatHandler = (server) => {
const wss = new WebSocket.Server({server});
wss.on('connection', (ws)=>{
    console.log("connection success");
    let id = (new Date).getTime();
    ws.myID = id;

    ws.on('message', (msg)=>{

        console.log(`recived message: from ${ws.myID}: ${msg}`);
       
        wss.clients.forEach((c)=>{
         
            if(c.readyState == WebSocket.OPEN){
               // msg.from = ws.myID;
                c.send(`${ws.myID}: ${msg}`);
            }            
        })
        /*
        if(msg.toString().startsWith("hi")){
            ws.send("hi how are you?");
        }
        else{
            ws.send(randomResponse());
        }*/
    });
    ws.send('welcome to the chat');
});
}

module.exports = { handleChatHandler };


const chatResponses = [
    "Hello!",
    "How can I assist you?",
    "Nice to meet you!",
    "What's on your mind?",
    "I'm here to help!",
    "Ask me anything!",
    "Let's chat!",
    "Tell me more!",
    "Interesting...",
    "I see!",
    "That's cool!",
    "Great question!",
    "I'm listening!",
    "Feel free to share!",
    "Tell me a joke!",
    "I'm all ears!",
    "Keep talking!",
    "I'm ready!",
    "Go ahead!",
    "What's your favorite color?",
  ];
  
  // Get a random response
  const randomResponse = function(){
    return chatResponses[Math.floor(Math.random() * chatResponses.length)]
};

  