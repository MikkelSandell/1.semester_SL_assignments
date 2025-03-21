import {WebSocket} from "ws";

const websocetClient = new WebSocket("ws://localhost:8080")

websocetClient.on('open', () =>{
    websocetClient.send("sending a client message from Node.js");

    websocetClient.on("message",(message) =>{
        console.log(`Recives a message fom the server: ${message}`);

        //websocetClient.close();
    });
});