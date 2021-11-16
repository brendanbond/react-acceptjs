import * as React from 'react';
import { parse } from 'query-string';

import {
  AcceptHostedTransactionResponse,
  AcceptHostedIFrameIntegrationProps,
} from '../../types';
import {
  authorizeNetPopupScreenStyle,
  authorizeNetPopupBottomStyle,
  authorizeNetPopupCloseLinkStyle,
  authorizeNetPopupCloseStyle,
  authorizeNetPopupInnerStyle,
  authorizeNetPopupLogoStyle,
  authorizeNetPopupOuterStyle,
  authorizeNetPopupStyle,
  authorizeNetPopupTopStyle,
} from './styles';

const IFrameIntegration = ({
  formToken,
  postUrl,
  onTransactionResponse,
  onCancel,
  onSuccessfulSave,
  onResize,
}: AcceptHostedIFrameIntegrationProps) => {
  const [popupIsShown, setPopupIsShown] = React.useState(false);
  const popupFormRef = React.useRef<HTMLFormElement>(null);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const iFrameRef = React.useRef<HTMLIFrameElement>(null);

  const handleShowPopup = () => {
    setPopupIsShown(true);
  };

  const handleClosePopup = () => {
    setPopupIsShown(false);
  };

  const centerPopup = () => {
    if (popupRef.current) {
      popupRef.current.style.left = '50%';
      popupRef.current.style.top = '50%';
      const left = -Math.floor(popupRef.current.clientWidth / 2);
      const top = -Math.floor(popupRef.current.clientHeight / 2);
      popupRef.current.style.marginLeft = `${left.toString()}px`;
      popupRef.current.style.marginTop = `${top.toString()}px`;
      popupRef.current.style.zIndex = '2';
      if (popupRef.current.offsetLeft < 16) {
        popupRef.current.style.left = '16px';
        popupRef.current.style.marginLeft = '0px';
      }
      if (popupRef.current.offsetTop < 16) {
        popupRef.current.style.top = '16px';
        popupRef.current.style.marginTop = '0px';
      }
    }
  };

  React.useEffect(() => {
    if (popupIsShown) {
      centerPopup();
    }
  }, [popupIsShown]);

  React.useEffect(() => {
    if (!window.AuthorizeNetIFrame) {
      window.AuthorizeNetIFrame = {
        onReceiveCommunication: (querystr) => {
          var params = parse(querystr);
          console.log('params:', params);
          switch (params['action']) {
            case 'successfulSave':
              onSuccessfulSave && onSuccessfulSave();
              handleClosePopup();
              break;
            case 'cancel':
              onCancel && onCancel();
              handleClosePopup();
              break;
            case 'transactResponse':
              const response = params['response'] as string;
              let parsedResponse: AcceptHostedTransactionResponse;
              if (response) {
                parsedResponse = JSON.parse(response);
                onTransactionResponse(parsedResponse);
              } else {
                console.error(
                  'Did not receive a transaction response despite receiving a transactResponse action!'
                );
              }
              handleClosePopup();
              break;
            case 'resizeWindow':
              const width = params['width'] as string;
              const height = params['height'] as string;
              if (width && height) {
                var w = parseInt(width);
                var h = parseInt(height);
                if (iFrameRef.current) {
                  iFrameRef.current.style.width = `${w.toString()}px`;
                  iFrameRef.current.style.height = `${h.toString()}px`;
                  centerPopup();
                }
                onResize && onResize(w, h);
              }
              break;
          }
        },
      };
    }
  });

  return (
    <div>
      <form
        method="post"
        action={postUrl}
        id="formAuthorizeNetPopup"
        name="formAuthorizeNetPopup"
        target="iframeAuthorizeNet"
        ref={popupFormRef}
        onSubmit={handleShowPopup}
      >
        <input type="hidden" id="popupToken" name="token" value={formToken} />
        <div>
          Trigger Accept Transaction
          <button disabled={popupIsShown}>Open AuthorizeNetPopup</button>
        </div>
      </form>
      <div
        id="divAuthorizeNetPopupScreen"
        style={{
          ...authorizeNetPopupScreenStyle,
          display: popupIsShown ? '' : 'none',
        }}
      />
      <div
        ref={popupRef}
        style={{
          ...authorizeNetPopupStyle,
          display: popupIsShown ? '' : 'none',
        }}
      >
        <div
          className="AuthorizeNetPopupOuter"
          style={authorizeNetPopupOuterStyle}
        >
          <div
            className="AuthorizeNetPopupTop"
            style={authorizeNetPopupTopStyle}
          >
            <div
              className="AuthorizeNetPopupClose"
              style={authorizeNetPopupCloseStyle}
            >
              <a
                onClick={handleClosePopup}
                title="Close"
                style={authorizeNetPopupCloseLinkStyle}
              >
                {' '}
              </a>
            </div>
          </div>
          <div
            className="AuthorizeNetPopupInner"
            style={authorizeNetPopupInnerStyle}
          >
            <iframe
              name="iframeAuthorizeNet"
              id="iframeAuthorizeNet"
              frameBorder="0"
              ref={iFrameRef}
            ></iframe>
          </div>
          <div
            className="AuthorizeNetPopupBottom"
            style={authorizeNetPopupBottomStyle}
          >
            <div
              className="AuthorizeNetPopupLogo"
              style={authorizeNetPopupLogoStyle}
              title="Powered by Authorize.net"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IFrameIntegration;

/*
<script type="text/javascript">
		(function () {
			if (!window.AuthorizeNetPopup) window.AuthorizeNetPopup = {};
			if (!AuthorizeNetPopup.options) AuthorizeNetPopup.options = {
				onPopupClosed: null
				};

			AuthorizeNetPopup.closePopup = function () {
				document.getElementById("divAuthorizeNetPopupScreen").style.display = "none";
				document.getElementById("divAuthorizeNetPopup").style.display = "none";
				document.getElementById("iframeAuthorizeNet").src = "empty.html";
				document.getElementById("btnOpenAuthorizeNetPopup").disabled = false;
				if (AuthorizeNetPopup.options.onPopupClosed) AuthorizeNetPopup.options.onPopupClosed();
				};


			AuthorizeNetPopup.openPopup = function () {
				var popup = document.getElementById("divAuthorizeNetPopup");
				var popupScreen = document.getElementById("divAuthorizeNetPopupScreen");
				var ifrm = document.getElementById("iframeAuthorizeNet");
				var form = document.forms["formAuthorizeNetPopup"];
				$("#popupToken").val($("#inputtoken").val());
				form.action = "https://test.authorize.net/payment/payment";
				ifrm.style.width = "442px";
				ifrm.style.height = "578px";

				form.submit();

				popup.style.display = "";
				popupScreen.style.display = "";
				centerPopup();
				};

			AuthorizeNetPopup.onReceiveCommunication = function (querystr) {
					var params = parseQueryString(querystr);
					switch (params["action"]) {
						case "successfulSave":
							AuthorizeNetPopup.closePopup();
							break;
						case "cancel":
							AuthorizeNetPopup.closePopup();
							break;
						case "transactResponse":
							var response = params["response"];
							document.getElementById("token").value = response;
							AuthorizeNetPopup.closePopup();
							break;
						case "resizeWindow":
							var w = parseInt(params["width"]);
							var h = parseInt(params["height"]);
							var ifrm = document.getElementById("iframeAuthorizeNet");
							ifrm.style.width = w.toString() + "px";
							ifrm.style.height = h.toString() + "px";
							centerPopup();
							break;
						}
				};


			function centerPopup() {
				var d = document.getElementById("divAuthorizeNetPopup");
				d.style.left = "50%";
				d.style.top = "50%";
				var left = -Math.floor(d.clientWidth / 2);
				var top = -Math.floor(d.clientHeight / 2);
				d.style.marginLeft = left.toString() + "px";
				d.style.marginTop = top.toString() + "px";
				d.style.zIndex = "2";
				if (d.offsetLeft < 16) {
					d.style.left = "16px";
					d.style.marginLeft = "0px";
					}
				if (d.offsetTop < 16) {
					d.style.top = "16px";
					d.style.marginTop = "0px";
					}
				}

			function parseQueryString(str) {
					var vars = [];
					var arr = str.split('&');
					var pair;
					for (var i = 0; i < arr.length; i++) {
						pair = arr[i].split('=');
						vars.push(pair[0]);
						vars[pair[0]] = unescape(pair[1]);
					}
					return vars;
				}
		}());

	</script>
  */
