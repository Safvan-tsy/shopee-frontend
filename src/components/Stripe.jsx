import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './StripeForm';

const stripePromise = loadStripe(
    'pk_test_51NQA0WSBPjsHg7aGTcvYkTtQcG1bV7fzhQgAc3bvY396oijUuLpURxN96w1AtDetguD9Jc9KktX3PUlMgFry2Kob000BvcdoGz'
    );

const Stripe = () => {

    const options = {
        // passing the client secret obtained in step 3
        clientSecret: '',
        // Fully customizable with appearance API.
        appearance: {/*...*/},
      };
  
  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm />
    </Elements>
  )
}

export default Stripe