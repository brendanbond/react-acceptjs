import CodeBlock from './CodeBlock';

const AcceptHostedIFrameCodeBlock = () => {
  return (
    <div className="row">
      <div className="col-1" />
      <div className="col">
        <CodeBlock language="tsx">
          {`const App = ({ formToken }: { formToken: string | null }) => {
return formToken ? (
  <AcceptHosted
    formToken={formToken}
    integration="iframe"
    onTransactionResponse={(response) =>
      setResponse(JSON.stringify(response, null, 2) + '\n')
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

export default AcceptHostedIFrameCodeBlock;
