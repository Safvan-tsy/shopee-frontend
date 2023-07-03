import React from 'react'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './StripeForm';

const stripePromise = loadStripe(
    'pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3'
    );

const Stripe = () => {

    const options = {
        // passing the client secret obtained in step 3
        clientSecret: '{{CLIENT_SECRET}}',
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