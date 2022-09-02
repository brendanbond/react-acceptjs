import { AcceptHosted } from 'react-acceptjs';

const ExampleAcceptHostedRedirect = ({ formToken }: { formToken: string }) => {
  return (
    <div className="row">
      <div className="col-1" />
      <div className="col d-flex align-items-center justify-content-start">
        <AcceptHosted formToken={formToken} integration="redirect">
          Redirect
        </AcceptHosted>
      </div>
    </div>
  );
};

export default ExampleAcceptHostedRedirect;
