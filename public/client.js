let ws;
function connectWebSocket(){
    ws = new WebSocket("ws://localhost:3006");
    ws.onopen= ()=>{
        console.log("conncted to server");
    };
    ws.onmessage= (rsp)=>{
     const reader = new FileReader();
     reader.onload= ()=>{
        writeMsg(reader.result);
       };
        if(rsp.data instanceof Blob){
            reader.readAsText(rsp.data);
        }
        if(typeof rsp.data ==="string"){
            writeMsg(rsp.data);
        }
    };
    ws.onclose= ()=>{

    };
 
}

function sendWSMessage(msg){
    if(ws.readyState == WebSocket.OPEN){
        $("#chat").append("<div class='me'>"+ msg+ "</div>");
        ws.send(msg);
    }
}
function writeMsg(msg){
    $("#chat").append("<div class='srv'>"+ msg+ "</div>");

}
connectWebSocket();