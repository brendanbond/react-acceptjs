import React from 'react';

const RedirectToast = ({
  toastRef,
}: {
  toastRef: React.LegacyRef<HTMLDivElement>;
}) => {
  return (
    <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
      <div
        id="liveToast"
        className="toast bg-light"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        ref={toastRef}
      >
        <div className="toast-header">
          <strong className="me-auto">react-acceptjs</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">
          Looks like you came from the redirect integration! Once the
          redirect&apos;s payment is processed (or the user cancels), the
          redirect integration will redirect you to the URL you passed into the
          getHostedPaymentPage API.
        </div>
      </div>
    </div>
  );
};

export default RedirectToast;
