import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";

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
  console.log("secondDrill", disabledButton)

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
  console.log("firstdrill", disabledStatus)
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
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
