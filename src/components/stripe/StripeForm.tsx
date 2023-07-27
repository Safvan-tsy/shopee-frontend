import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Button } from "react-bootstrap";
import Message from "../ui/Message";
import { useUpdateOrderToPaidMutation } from '../../slices/ordersApiSlice';
import { RootState } from '../../store';

export default function CheckoutForm(props) {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const token = useSelector((state:RootState) => state.auth.token)
  const { orderId } = props;

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const [updateOrderToPaid, { isLoading, error }] = useUpdateOrderToPaidMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: `${window.location.origin}/`,
      },
      redirect: 'if_required'
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    if (!error) {
      await updateOrderToPaid({token,orderId})
      navigate('/')
    }
    setIsProcessing(false);
    
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <Button disabled={isProcessing || !stripe || !elements} type='submit'>
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </Button>
      {/* Show any error or success messages */}
      {message && <Message variant='danger'>{message}</Message>}
    </form>
  );
}