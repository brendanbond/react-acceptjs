import React from 'react';

import { HostedForm } from 'react-acceptjs';
import { HostedFormResponseHandlerFn } from '../../dist/types';

const authData = {
  apiLoginID: process.env.REACT_APP_API_LOGIN_ID as string,
  clientKey: process.env.REACT_APP_API_CLIENT_KEY as string,
};

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

const App = () => {
  const handleSubmit: HostedFormResponseHandlerFn = (opaqueData) => {
    console.log('Received response:', opaqueData);
  };
  return <HostedForm authData={authData} onSubmit={handleSubmit} />;
};

export default App;
