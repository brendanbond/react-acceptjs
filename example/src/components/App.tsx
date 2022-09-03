import React from 'react';

import { FormType, IntegrationType } from '../types';
import Checklist from './Checklist';
import ExampleHookForm from './ExampleHookForm';
import ExampleHostedForm from './ExampleHostedForm';
import ExampleAcceptHostedRedirect from './ExampleAcceptHostedRedirect';
import ExampleAcceptHostedIFrame from './ExampleAcceptHostedIFrame';
import HookFormCodeBlock from './HookFormCodeBlock';
import HostedFormCodeBlock from './HostedFormCodeBlock';
import ResponseBlock from './ResponseBlock';
import CodeBlock from './CodeBlock';
import RedirectToast from './RedirectToast';
import AcceptHostedRedirectCodeBlock from './AcceptHostedRedirectCodeBlock';

const App = () => {
  const [formType, setFormType] = React.useState<FormType | null>(null);
  const [integrationType, setIntegrationType] =
    React.useState<IntegrationType | null>(null);
  const [amount, setAmount] = React.useState<string>('');
  const [formToken, setFormToken] = React.useState<string | null>(null);
  const [formTokenError, setFormTokenError] = React.useState<string | null>(
    null
  );
  const toastRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (window.location.search) {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      if (params.get('receipt') || params.get('cancel')) {
        const toast = toastRef.current;
        const bsToast = window.bootstrap.Toast.getOrCreateInstance(toast, {
          autohide: false,
        });
        bsToast.show();
        window.history.pushState(null, document.title, '/');
      }
    }
  });

  const handleFetchFormToken = async () => {
    event.preventDefault();
    try {
      const res = await fetch(
        `https://localhost:${process.env.SERVER_PORT}/form-token?amount=${amount}`
      );
      const token: string = await res.text();
      setFormToken(token);
    } catch (e) {
      setFormTokenError(JSON.stringify(e, null, 2));
    }
  };
  const checkForCommonEnvVariables = () => {
    return !!(
      process.env.HTTPS &&
      process.env.API_LOGIN_ID &&
      process.env.SSL_KEY_FILE &&
      process.env.SSL_CRT_FILE
    );
  };

  const checkForAcceptJsMethod = () => {
    return formType !== null;
  };

  const checkForTransactionKey = () => {
    return !!process.env.API_TRANSACTION_KEY;
  };

  const checkForAcceptHostedIntegrationMethod = () => {
    return integrationType !== null;
  };

  const checkForFormToken = () => {
    return formToken !== null;
  };

  const checkForIFrameCommunicatorUrl = () => {
    return !!process.env.IFRAME_COMMUNICATOR_URL;
  };

  const handleSelectFormType = (formType: FormType) => {
    setFormType(formType);
    setIntegrationType(null);
  };

  const handleSelectIntegrationType = (integrationType: IntegrationType) => {
    setIntegrationType(integrationType);
  };
  return (
    <div className="container p-4">
      <h1 className="mb-4 text-center">react-acceptjs Example App</h1>
      <RedirectToast toastRef={toastRef} />
      <Checklist completed={checkForCommonEnvVariables()} show={true}>
        <div>
          1. To use this example app, create a <code>.env</code> file in the
          top-level <code>example/</code> directory . Populate it with values
          for your Authorize.net public client key and your API login ID (you
          may have to restart the development server). You&apos;ll also need to
          transact with Authorize.net using HTTPS, so we&apos;ll set{' '}
          <code>HTTPS</code> to <code>true</code>; you&poas;ll need to provide
          your own SSL key and certificate using the <code>SSL_CRT_FILE</code>{' '}
          and the
          <code>SSL_KEY_FILE</code> environment variables (you can read more{' '}
          <a href="https://web.dev/how-to-use-local-https/">here</a>):
        </div>
        <CodeBlock language="bash">
          {`API_CLIENT_KEY='YOUR AUTHORIZE.NET CLIENT KEY HERE'
API_LOGIN_ID='YOUR AUTHORIZE.NET API LOGIN ID HERE'
HTTPS=true
SSL_CRT_FILE='/absolute/path/to/ssl/cert.crt'
SSL_KEY_FILE='/absolute/path/to/ssl/key.key'
SSL_CA_FILE='/absolute/path/to/ssl/ca.pem'`}
        </CodeBlock>
      </Checklist>
      <Checklist
        completed={checkForAcceptJsMethod()}
        show={checkForCommonEnvVariables()}
      >
        <div>2. Choose an Accept.js method for processing payments:</div>
        <div className="d-flex justify-content-between mt-4">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSelectFormType('hook')}
          >
            useAcceptJs() Hook
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSelectFormType('hosted')}
          >
            &lt;HostedForm /&gt; Component
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => handleSelectFormType('accepthosted')}
          >
            &lt;AcceptHosted /&gt; Component
          </button>
        </div>
      </Checklist>
      {formType === 'hook' ? (
        <>
          <div style={{ marginBottom: '40px' }}>
            <ExampleHookForm />
          </div>
          <HookFormCodeBlock />
        </>
      ) : formType === 'hosted' ? (
        <>
          <div style={{ marginBottom: '40px' }}>
            <ExampleHostedForm />
          </div>
          <HostedFormCodeBlock />
        </>
      ) : formType === 'accepthosted' ? (
        <>
          <Checklist completed={checkForTransactionKey()} show={true}>
            <div>
              3. To use the <code>{`<AcceptHosted />`}</code> component,
              you&apos;ll need to obtain a form token using Authorize.net&apos;s{' '}
              <code>getHostedPaymentPageRequest</code> API. This example app
              contains an example <code>server.js</code> file that retrieves a
              form token using Authorize.net&apos;s NodeJS SDK; look it over to
              and read the{' '}
              <a href="https://developer.authorize.net/api/reference/index.html#accept-suite-get-an-accept-payment-page">
                documentation
              </a>{' '}
              to get an idea of some of the options you can pass{' '}
              <code>getHostedPaymentPageRequest</code>. Then, add your
              Authorize.net account&apos;s transaction key to the{' '}
              <code>.env</code> file you created earlier and restart the
              development server.
            </div>
            <CodeBlock language="bash">
              {`API_TRANSACTION_KEY='YOUR AUTHORIZE.NET API TRANSACTION KEY HERE'`}
            </CodeBlock>
          </Checklist>
          <Checklist
            completed={checkForAcceptHostedIntegrationMethod()}
            show={checkForTransactionKey()}
          >
            <div>4. Choose an Accept Hosted integration method:</div>
            <div className="d-flex w-50 m-auto justify-content-between mt-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSelectIntegrationType('redirect')}
              >
                Redirect
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => handleSelectIntegrationType('iframe')}
              >
                IFrame
              </button>
            </div>
          </Checklist>
          {integrationType === 'redirect' ? (
            <>
              <Checklist completed={checkForFormToken()} show={true}>
                <>
                  <div className="mb-4">
                    5. Obtain a form token from the example server using the
                    form below (make sure you&apos;ve started the example server
                    with the <code>yarn serve</code> script):
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <form onSubmit={handleFetchFormToken}>
                        <label className="form-label" htmlFor="amount">
                          Amount
                        </label>
                        <input
                          className="form-control mb-3"
                          name="amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">
                          Get Form Token
                        </button>
                      </form>
                    </div>
                    <div className="col-6">
                      <ResponseBlock
                        response={
                          (formToken && JSON.stringify({ formToken })) ||
                          formTokenError ||
                          ''
                        }
                      />
                    </div>
                  </div>
                </>
              </Checklist>
              {formToken && (
                <>
                  <div style={{ marginBottom: '40px' }}>
                    <ExampleAcceptHostedRedirect formToken={formToken} />
                  </div>
                  <AcceptHostedRedirectCodeBlock />
                </>
              )}
            </>
          ) : integrationType === 'iframe' ? (
            <>
              <Checklist
                completed={checkForIFrameCommunicatorUrl()}
                show={true}
              >
                <div>
                  5. To use the <code>{`<AcceptHosted />`}</code>{' '}
                  component&apos;s iFrame integration, you&apos;ll need to host
                  an iFrame communicator page. This example app should already
                  be hosting it at{' '}
                  <code>https://localhost:3000/iFrameCommunicator.html</code>.
                  Add that URL (or, if you&apos;ve changed the location of the
                  iFrameCommunicator.html file, the new URL) to your .env file
                  and restart the development server.
                </div>
                <CodeBlock language="bash">
                  {`IFRAME_COMMUNICATOR_URL='https://localhost:3000/iFrameCommunicator.html'`}
                </CodeBlock>
              </Checklist>
              <Checklist
                completed={checkForFormToken()}
                show={checkForIFrameCommunicatorUrl()}
              >
                <>
                  <div className="mb-4">
                    6. Obtain a form token using the form below (make sure
                    you&apos;ve started the example server with the{' '}
                    <code>yarn serve</code> script):
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <form onSubmit={handleFetchFormToken}>
                        <label className="form-label" htmlFor="amount">
                          Amount
                        </label>
                        <input
                          className="form-control mb-3"
                          name="amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                        />
                        <button type="submit" className="btn btn-primary">
                          Get Form Token
                        </button>
                      </form>
                    </div>
                    <div className="col-6">
                      <ResponseBlock
                        response={
                          (formToken && JSON.stringify({ formToken })) ||
                          formTokenError ||
                          ''
                        }
                      />
                    </div>
                  </div>
                </>
              </Checklist>
              {formToken && (
                <>
                  <div style={{ marginBottom: '40px' }}>
                    <ExampleAcceptHostedIFrame formToken={formToken} />
                  </div>
                  <HostedFormCodeBlock />
                </>
              )}
            </>
          ) : null}
        </>
      ) : null}
    </div>
  );
};

export default App;
