import CodeBlock from './CodeBlock';

const HostedFormCodeBlock = () => {
  return (
    <div className="row">
      <div className="col-1" />
      <div className="col">
        <CodeBlock language="tsx">
          {`import React from 'react';
import { HostedForm } from 'react-acceptjs';

const authData = {
  apiLoginID: 'YOUR AUTHORIZE.NET API LOGIN ID',
  clientKey: 'YOUR AUTHORIZE.NET PUBLIC CLIENT KEY',
};

const App = () => {
  const handleSubmit = (response) => {
    console.log('Received response:', response);
  };
  return <HostedForm authData={authData} onSubmit={handleSubmit} />;
};

export default App;`}
        </CodeBlock>
      </div>
    </div>
  );
};

export default HostedFormCodeBlock;
