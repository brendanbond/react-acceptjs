import CodeBlock from './CodeBlock';

const AcceptHostedRedirectCodeBlock = () => {
  return (
    <div className="row">
      <div className="col-1" />
      <div className="col">
        <CodeBlock language="tsx">
          {`import { AcceptHosted } from 'react-acceptjs';

const App = ({ formToken }: { formToken: string | null }) => {
  return formToken ? (
    <AcceptHosted formToken={formToken} integration="redirect">
      Continue to Redirect
    </AcceptHosted>
  ) : (
    <div>
      You must have a form token. Have you made a call to the
      getHostedPaymentPageRequestAPI?
    </div>
  );
};

export default App;`}
        </CodeBlock>
      </div>
    </div>
  );
};

export default AcceptHostedRedirectCodeBlock;
