import React, {useEffect, useState} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './StripeForm';

const Stripe = (props) => {
  const [stripePromise, setStripePromise] = useState(null)
  const [clientSecret, setClientSecret] = useState('')

  const options = {clientSecret: clientSecret,appearance: {/*...*/},};

  useEffect(() => {
    const publishableKey = process.env.REACT_APP_STRIPE_KEY
    setStripePromise(loadStripe(publishableKey))

  },[])

  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL + '/orders/secret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ totalPrice: props.totalPrice }), // Pass totalPrice in the request body
      });

      const { client_secret } = await response.json();
      setClientSecret(client_secret);
    };

    fetchClientSecret();
  }, [props.totalPrice]);
  return (
  <>
    {clientSecret  && stripePromise &&(
      <Elements stripe={stripePromise} options={{clientSecret}}>
      <CheckoutForm orderId={props.orderId}/>
    </Elements>
    )}
    </>
  )
}

export default Stripe