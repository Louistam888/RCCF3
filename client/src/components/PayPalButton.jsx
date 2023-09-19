import React from "react";
import PAYPAL_CLIENT_ID from "../client_id";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ total, onPaymentSuccess, onPaymentError }) => {
  const createOrder = () => {
    //replace this url with your srever
    return fetch("/my-server/create-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // use the "body" param to optionally pass additional order information
      // like product ids and quantities
      body: JSON.stringify({
        cart: [
          {
            id: "YOUR_PRODUCT_ID",
            quantity: "YOUR_PRODUCT_QUANTITY",
          },
        ],
      }),
    })
      .then((response) => response.json())
      .then((order) => order.id);
  };

  const onApprove = (data) => {
    //replace this url with your server
    return fetch("/my-server/capture-paypal-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderID: data.orderID,
      }),
    })
      .then((response) => response.json())
      .then((orderData) => {
        const name = orderData.payer.name.given_name;
        alert(`Transaction completed by ${name}`);
      });
  };

  const onError = (error) => {
    onPaymentError(error);
  };

  const initialOptions = {
    clientId: PAYPAL_CLIENT_ID,
    currency: "CAD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons
        forceReRender={[total()]}
        createOrder={createOrder}
        onApprove={onApprove}
        onError={onError}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
