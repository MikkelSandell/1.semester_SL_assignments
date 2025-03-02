import express from "express";

const app = express();

app.use(express.static("public"));

//console.log(process.env.PORT); PORT=9090 node app.js

app.get("/synchronizetime", (req, res) =>{
    res.writeHead(200,{
        "Connection": "keep-alive", //det kan være der er et biliotek som skal have med stort
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache"
    });

    setInterval(() => sendTimeToClient(res), 1000);
});

function sendTimeToClient(res){
    const time = new Date().toISOString();
    res.write(`data: ${time} \n\n`); //det er vigit den heder data
}


const PORT = Number(process.env.PORT) || 8080;
app.listen(PORT,() => console.log("server runnung on", PORT))