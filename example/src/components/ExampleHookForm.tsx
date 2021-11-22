import React from 'react';
import { useAcceptJs } from 'react-acceptjs';
import ResponseBlock from './ResponseBlock';

const authData = {
  apiLoginID: process.env.API_LOGIN_ID as string,
  clientKey: process.env.API_CLIENT_KEY as string,
};

interface BasicCardInfo {
  cardNumber: string;
  cardCode: string;
  expMonth: string;
  expYear: string;
}

const ExampleHookForm = () => {
  const { dispatchData, loading, error } = useAcceptJs({ authData });
  const [cardData, setCardData] = React.useState<BasicCardInfo>({
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cardCode: '',
  });
  const [response, setResponse] = React.useState<string>('');

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    console.log(cardData);
    try {
      // Dispatch CC data to Authorize.net and receive payment nonce for use on your server
      const opaqueData = await dispatchData({
        cardData: {
          ...cardData,
          month: cardData.expMonth,
          year: cardData.expYear,
        },
      });
      setResponse(JSON.stringify(opaqueData, null, 2));
    } catch (e) {
      setResponse(JSON.stringify(e, null, 2));
    }
  };
  return (
    <div className="row mt-4">
      <div className="col-1" />
      <div className="col-5">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="cardNumber" className="form-label">
                Card Number
              </label>
              <input
                type="text"
                className="form-control"
                name="cardNumber"
                value={cardData.cardNumber}
                onChange={(event) =>
                  setCardData({ ...cardData, cardNumber: event.target.value })
                }
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="expMonth" className="form-label">
                Exp. Month
              </label>
              <input
                type="text"
                className="form-control"
                name="expMonth"
                value={cardData.expMonth}
                onChange={(event) =>
                  setCardData({ ...cardData, expMonth: event.target.value })
                }
              />
            </div>
            <div className="col">
              <label htmlFor="expYear" className="form-label">
                Exp. Year
              </label>
              <input
                type="text"
                className="form-control"
                name="expYear"
                value={cardData.expYear}
                onChange={(event) =>
                  setCardData({ ...cardData, expYear: event.target.value })
                }
              />
            </div>
            <div className="col">
              <label htmlFor="cardCode" className="form-label">
                Card Code
              </label>
              <input
                type="text"
                className="form-control"
                name="cardCode"
                value={cardData.cardCode}
                onChange={(event) =>
                  setCardData({ ...cardData, cardCode: event.target.value })
                }
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading || error}
            >
              Pay
            </button>
          </div>
        </form>
      </div>
      <div className="col-6">
        <ResponseBlock response={response} />
      </div>
    </div>
  );
};

export default ExampleHookForm;
