import React, { useState } from 'react';

import { AcceptHosted } from 'react-acceptjs';

// const authData = {
//   apiLoginID: process.env.REACT_APP_API_LOGIN_ID as string,
//   clientKey: process.env.REACT_APP_API_CLIENT_KEY as string,
// };

// interface BasicCardInfo {
//   cardNumber: string;
//   cardCode: string;
//   expMonth: string;
//   expYear: string;
// }

// const PaymentForm = () => {
//   const { dispatchData, loading, error } = useAcceptJs({ authData });
//   const [cardData, setCardData] = React.useState<BasicCardInfo>({
//     cardNumber: '',
//     expMonth: '',
//     expYear: '',
//     cardCode: '',
//   });

//   const handleSubmit: React.FormEventHandler = async (event) => {
//     event.preventDefault();
//     // Dispatch CC data to Authorize.net and receive payment nonce for use on your server
//     const opaqueData = await dispatchData({ cardData });
//     console.log('Received payment nonce:', opaqueData);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="cardNumber"
//         value={cardData.cardNumber}
//         onChange={(event) =>
//           setCardData({ ...cardData, cardNumber: event.target.value })
//         }
//       />
//       <input
//         type="text"
//         name="expMonth"
//         value={cardData.expMonth}
//         onChange={(event) =>
//           setCardData({ ...cardData, expMonth: event.target.value })
//         }
//       />
//       <input
//         type="text"
//         name="expYear"
//         value={cardData.expYear}
//         onChange={(event) =>
//           setCardData({ ...cardData, expYear: event.target.value })
//         }
//       />
//       <input
//         type="text"
//         name="cardCode"
//         value={cardData.cardCode}
//         onChange={(event) =>
//           setCardData({ ...cardData, cardCode: event.target.value })
//         }
//       />
//       <button type="submit" disabled={loading || error}>
//         Pay
//       </button>
//     </form>
//   );
// };

// const App = () => {
//   return (
//     <HostedForm
//       authData={authData}
//       onSubmit={(response) => console.log('Response received:', response)}
//     />
//   );
// };

const App = () => {
  const [amount, setAmount] = useState<number>(0);
  const [formToken, setFormToken] = useState<string | null>(null);

  const handleGetFormToken = async () => {
    const res = await fetch(
      `https://localhost:3001/form-token?amount=${amount}`
    );
    const token = await res.text();
    setFormToken(token);
  };

  return (
    <div>
      <div>
        <label>
          Amount
          <input
            name="amount"
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </label>
        <button onClick={handleGetFormToken}>Get Form Token</button>
      </div>
      {formToken && (
        <div>
          <AcceptHosted
            formToken={formToken}
            integration="iframe"
            environment="SANDBOX"
            onTransactionResponse={(response) =>
              console.log('Response received:', response)
            }
            onCancel={() => console.log('Canceled!')}
          />
        </div>
      )}
    </div>
  );
};
export default App;
