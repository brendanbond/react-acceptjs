import { AcceptHostedRedirectIntegrationProps } from '../../types';

export const RedirectIntegration = ({
  formToken,
  postUrl,
  children,
  className,
  style,
}: AcceptHostedRedirectIntegrationProps) => (
  <form method="post" action={postUrl}>
    <input type="hidden" name="token" value={formToken} />
    <button className={className} style={className ? {} : style}>
      {children}
    </button>
  </form>
);

export default RedirectIntegration;
