import React from 'react';
import { AcceptHosted } from 'react-acceptjs';
import ResponseBlock from './ResponseBlock';

const ExampleAcceptHostedIFrame = ({ formToken }: { formToken: string }) => {
  const [response, setResponse] = React.useState('');
  return (
    <div className="row">
      <div className="col-1" />
      <div className="col-5 d-flex align-items-center justify-content-center">
        <AcceptHosted
          formToken={formToken}
          integration="iframe"
          onTransactionResponse={(response) =>
            setResponse(JSON.stringify(response, null, 2) + '\n')
          }
          onCancel={() =>
            setResponse((prevState) => prevState + 'Cancelled!\n')
          }
          onSuccessfulSave={() =>
            setResponse((prevState) => prevState + 'Successful save!\n')
          }
          onResize={(w, h) =>
            setResponse(
              (prevState) =>
                prevState + `Received resize message to ${w} x ${h}!\n`
            )
          }
        >
          <AcceptHosted.Button className="btn btn-primary">
            Continue to IFrame
          </AcceptHosted.Button>
          <AcceptHosted.IFrameBackdrop />
          <AcceptHosted.IFrameContainer>
            <AcceptHosted.IFrame />
          </AcceptHosted.IFrameContainer>
        </AcceptHosted>
      </div>
      <div className="col-6">
        <ResponseBlock response={response} />
      </div>
    </div>
  );
};

export default ExampleAcceptHostedIFrame;
