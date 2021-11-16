import * as React from 'react';

import { AcceptHostedRedirectIntegrationProps } from '../../types';

const RedirectIntegration = ({
  formToken,
  postUrl,
  buttonText,
}: AcceptHostedRedirectIntegrationProps) => (
  <form method="post" action={postUrl}>
    <input type="hidden" name="token" value={formToken} />
    <button id="btnContinue">{buttonText}</button>
  </form>
);

export default RedirectIntegration;
