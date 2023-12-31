import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import{ useDisclosure } from "@chakra-ui/react"
import PAYPAL_CLIENT_ID from "../client_id"
import axios from 'axios';
import { useEffect, useState } from 'react';


// This value is from the props in the UI
const style = { layout: "vertical" };

const createOrder = () => {
  // replace this url with your server
  return fetch(
    "https://react-paypal-js-storybook.fly.dev/api/paypal/create-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product ids and quantities
      body: JSON.stringify({
        cart: [
          {
            sku: "1blwyeo8",
            quantity: 2,
          },
        ],
      }),
    }
  )
    .then((response) => response.json())
    .then((order) => {
      // Your code here after create the order
      return order.id;
    });
};
const onApprove = (data) => {
  // replace this url with your server
  return fetch(
    "https://react-paypal-js-storybook.fly.dev/api/paypal/capture-order",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    }
  )
    .then((response) => response.json())
    .then((orderData) => {
      // Your code here after capture the order
    });
};

// Custom component to wrap the PayPalButtons and show loading spinner
const ButtonWrapper = ({
  showSpinner,
  disabledStatus,
  total,
  onPaymentSuccess,
  onPaymentError,
}) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const disabledButton = disabledStatus;

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={disabledButton}
        forceReRender={[style]}
        fundingSource={undefined}
        createOrder={createOrder}
        onApprove={onApprove}
        onPaymentError={onPaymentError}
        onPaymentSuccess={onPaymentSuccess}
        total={total}
      />
    </>
  );
};

const PayPalButton = ({
  total,
  onPaymentSuccess,
  onPaymentError,
  buttonDisabled,
}) => {
  const disabledStatus = buttonDisabled;
  
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{ clientId: PAYPAL_CLIENT_ID, components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper
          showSpinner={false}
          disabledStatus={disabledStatus}
          onPaymentError={onPaymentError}
          onPaymentSuccess={onPaymentSuccess}
          total={total}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default PayPalButton;
