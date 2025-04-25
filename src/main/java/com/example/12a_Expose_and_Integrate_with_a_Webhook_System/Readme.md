🎟️ TicketMaster Webhook Receiver
A simple Express app to receive webhook events for testing TicketMaster integrations.

📦 Requirements
Node.js

express (npm install express)

localtunnel (npm install -g localtunnel)

🛠️ Setup
you wil need a project like this
javascript
import express from 'express';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/ticketwebhookjson", (req, res) => {
    console.log('🎟️ Webhook received:', req.body);
    res.sendStatus(204);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

then you need to make a local tunnel:
something like this
lt --port 8080 -s teammate123
Public URL example:
https://teammate123.loca.lt/ticketwebhookjson

🖐️ Usage with Postman

it is important that every where you use "url": "https://teammate123.loca.lt/ticketwebhookjson", it matches that same as in you javascript so if you call the app.post("/ticketwebhookjson", (req, res) somethine else you need to repalce it

Register the webhook at https://ticketmaster-webhook.loca.lt/webhooks/register remember to set it to POST

insert this in Body then raw and then choose json

{
  "url": "https://teammate123.loca.lt/ticketwebhookjson",
  "events": ["ping", "ticket.purchased"]
}

Trigger an event at https://ticketmaster-webhook.loca.lt/webhooks/trigger remember to set it to POST

insert this in Body then raw and then choose json

json
{
  "event": "ticket.purchased",
  "payload": {
    "userId": "user001",
    "eventId": "concert999",
    "ticketId": "tkt555"
  }
}

https://ticketmaster-webhook.loca.lt/webhooks/ping remember to set it to POST


https://ticketmaster-webhook.loca.lt/webhooks/unregister remember to set it to POST

insert this in Body then raw and then choose json

{
  "url": "https://teammate123.loca.lt/ticketwebhookjson"
}