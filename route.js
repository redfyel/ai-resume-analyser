const express = require('express');
const router = express.Router();
const stripe = require('stripe')('your-secret-key'); 

// Route to create a payment intent
router.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body; 
    if (!amount) {
      return res.status(400).json({ error: 'Amount is required' });
    }
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
