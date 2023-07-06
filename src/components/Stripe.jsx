import React, {useEffect, useState} from 'react';
import { UseSelector } from 'react-redux/es/hooks/useSelector';
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
  console.log('stripePromise',stripePromise)

  useEffect(() => {
    const fetchClientSecret = async () => {
      const response = await fetch(process.env.REACT_APP_API_URL + '/orders/secret', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ totalPrice: props.totalPrice }), // Pass totalPrice in the request body
      });

      const { client_secret } = await response.body
      setClientSecret(client_secret);
    };

    fetchClientSecret();
  }, [props.totalPrice]);
  console.log('clientSecret',clientSecret)
  return (
  <>
    {clientSecret  && stripePromise &&(
      <Elements stripe={stripePromise} options={{clientSecret}}>
      <CheckoutForm />
    </Elements>
    )}
    </>
  )
}

export default Stripe