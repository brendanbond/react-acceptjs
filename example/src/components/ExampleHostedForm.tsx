import React from 'react';
import { HostedForm, HostedFormDispatchDataResponse } from 'react-acceptjs';
import ResponseBlock from './ResponseBlock';

const authData = {
  apiLoginID: process.env.API_LOGIN_ID,
  clientKey: process.env.API_CLIENT_KEY,
};

const ExampleHostedForm = () => {
  const [response, setResponse] = React.useState<string>('');
  const handleSubmit = (hostedFormResponse: HostedFormDispatchDataResponse) => {
    setResponse(JSON.stringify(hostedFormResponse, null, 2));
  };

  return (
    <div className="row">
      <div className="col-1" />
      <div className="col-5 d-flex align-items-center justify-content-center">
        <HostedForm
          authData={authData}
          onSubmit={handleSubmit}
          buttonClassName="btn btn-primary"
          containerClassName="text-center"
        />
      </div>
      <div className="col-6">
        <ResponseBlock response={response} />
      </div>
    </div>
  );
};

export default ExampleHostedForm;
