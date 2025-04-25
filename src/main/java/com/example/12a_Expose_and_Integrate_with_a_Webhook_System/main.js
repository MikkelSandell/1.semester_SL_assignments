import express from 'express';
import bodyParser from 'body-parser';
import webhookRoutes from './routes/webhooks.js';


//lt --port 8080 -s ticketmaster-webhook 
const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(bodyParser.json());
app.use('/webhooks', webhookRoutes);


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});