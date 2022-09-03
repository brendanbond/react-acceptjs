const AuthorizeNet = require('authorizenet');
const cors = require('cors');
const express = require('express');
const https = require('https');
const fs = require('fs');

const ApiContracts = AuthorizeNet.APIContracts;
const ApiControllers = AuthorizeNet.APIControllers;

const fetchFormToken = (amount) => {
  const merchantAuthenticationType =
    new ApiContracts.MerchantAuthenticationType();
  merchantAuthenticationType.setName(process.env.API_LOGIN_ID);
  merchantAuthenticationType.setTransactionKey(process.env.API_TRANSACTION_KEY);

  const transactionRequestType = new ApiContracts.TransactionRequestType();
  transactionRequestType.setTransactionType(
    ApiContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
  );
  transactionRequestType.setAmount(amount);

  const setting1 = new ApiContracts.SettingType();
  setting1.setSettingName('hostedPaymentButtonOptions');
  setting1.setSettingValue('{"text": "Pay"}');

  const setting2 = new ApiContracts.SettingType();
  setting2.setSettingName('hostedPaymentOrderOptions');
  setting2.setSettingValue('{"show": false}');

  const setting3 = new ApiContracts.SettingType();
  setting3.setSettingName('hostedPaymentIFrameCommunicatorUrl');
  setting3.setSettingValue(`{"url": "${process.env.IFRAME_COMMUNICATOR_URL}"}`);

  const setting4 = new ApiContracts.SettingType();
  setting4.setSettingName('hostedPaymentReturnOptions');
  setting4.setSettingValue(
    '{"showReceipt": false, "url": "https://localhost:3000?receipt=true", "urlText": "Continue", "cancelUrl": "https://localhost:3000?cancel=true", "cancelUrlText": "Cancel"}'
  );

  const settingList = [];
  settingList.push(setting1);
  settingList.push(setting2);
  settingList.push(setting3);
  settingList.push(setting4);

  const alist = new ApiContracts.ArrayOfSetting();
  alist.setSetting(settingList);

  const getRequest = new ApiContracts.GetHostedPaymentPageRequest();
  getRequest.setMerchantAuthentication(merchantAuthenticationType);
  getRequest.setTransactionRequest(transactionRequestType);
  getRequest.setHostedPaymentSettings(alist);

  const ctrl = new ApiControllers.GetHostedPaymentPageController(
    getRequest.getJSON()
  );
  return new Promise((resolve, reject) => {
    ctrl.execute(function () {
      const apiResponse = ctrl.getResponse();

      const response = new ApiContracts.GetHostedPaymentPageResponse(
        apiResponse
      );

      if (response != null) {
        if (
          response.getMessages().getResultCode() ===
          ApiContracts.MessageTypeEnum.OK
        ) {
          resolve(response.getToken());
        } else {
          //console.log('Result Code: ' + response.getMessages().getResultCode());
          console.log(
            'Error Code: ' + response.getMessages().getMessage()[0].getCode()
          );
          console.log(
            'Error message: ' + response.getMessages().getMessage()[0].getText()
          );
          reject(response.getMessages().getMessage()[0].getText());
        }
      } else {
        reject('Null response received');
      }
    });
  });
};

const handleFormTokenRequest = async (req, res) => {
  const { amount } = req.query;

  try {
    if (amount) {
      const token = await fetchFormToken(Number(amount));
      res.status(200).send(token);
    }
  } catch (e) {
    res.send(e);
  }
};

const app = express();

const corsOptions = {
  origin: ['https://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

app.get('/form-token', handleFormTokenRequest);

const port = process.env.SERVER_PORT || 3001;

if (process.env.HTTPS === 'true') {
  const cert = fs.readFileSync(process.env.SSL_CRT_FILE);
  const key = fs.readFileSync(process.env.SSL_KEY_FILE);
  const httpsOptions = {
    cert,
    key,
  };
  const server = https.createServer(httpsOptions, app);
  server.listen(port, () => {
    console.log(`(HTTPS) Server is listening on port ${port}`);
  });
} else {
  app.listen(port, () =>
    console.log(`(HTTP) Server is listening on port ${port}`)
  );
}
