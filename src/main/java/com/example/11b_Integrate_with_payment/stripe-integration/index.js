import 'dotenv/config'; // loads env variables
import express from 'express';  
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Stripe Integration Running');
});

app.post('/create-checkout-session', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Cool Item',
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      success_url: 'http://localhost:8080/success',
      cancel_url: 'http://localhost:8080/cancel',
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => console.log('Server running on http://localhost:8080'));
