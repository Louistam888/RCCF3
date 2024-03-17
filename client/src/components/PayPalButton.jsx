import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import{ Stack,Spinner } from "@chakra-ui/react"
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
      // Your code here after create order
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

      {/* causing deploloyment error
       */}
      {/* <PayPalScriptProvider
        options={{ clientId: 
          PAYPAL_CLIENT_ID, 
          components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper
          showSpinner={false}
          disabledStatus={disabledStatus}
          onPaymentError={onPaymentError}
          onPaymentSuccess={onPaymentSuccess}
          total={total}
        />
      </PayPalScriptProvider> */}
    </div>
  );
};

// const PayPalButton = ({ total, onPaymentSuccess, onPaymentError, disabled }) => {
//   const [paypalClient, setPayPalClient] = useState(null);

//   useEffect(() => {
//     const paypalkey = async () => {
//       const { data: clientId } = await axios.get('/api/config/paypal');
//       setPayPalClient(clientId);
//     };
//     paypalkey();
//   }, [paypalClient]);
//   return !paypalClient ? (
//     <Stack direction='row' spacing={4} alignSelf='center'>
//       <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='orange.500' size='xl' />
//     </Stack>
//   ) : (
//     <PayPalScriptProvider
//       options={{
//         'client-id': paypalClient,
//       }}>
//       <PayPalButtons
//         disabled={disabled}
//         forceReRender={[total(), paypalClient]}
//         createOrder={(data, actions) => {
//           return actions.order.create({
//             purchase_units: [
//               {
//                 amount: {
//                   value: total(),
//                 },
//               },
//             ],
//           });
//         }}
//         onApprove={(data, actions) => {
//           return actions.order.capture().then((details) => {
//             onPaymentSuccess(data);
//           });
//         }}
//         onError={(err) => {
//           onPaymentError();
//         }}
//       />
//     </PayPalScriptProvider>
//   );
// };

// export default PayPalButton;

export default PayPalButton;
