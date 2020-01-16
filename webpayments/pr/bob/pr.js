/**
 * Initializes the payment request object.
 * @return {PaymentRequest} The payment request object.
 */

function fetchUpholdToken() {
  if(document.getElementById("token")) {
    var token = document.getElementById("token").innerHTML
    console.log(token)
    return token;
  }
  return ""
}

function buildPaymentRequest() {
  if (!window.PaymentRequest) {
    return null;
  }

  const upholdToken = fetchUpholdToken();
  if (upholdToken == "") {
    error('Rewards is not available');
    return null;
  }

  const supportedInstruments = [{
    supportedMethods: 'https://batpay.herokuapp.com/pay/'
  },
  {
    supportedMethods: 'interledger'
  }];

  const details = {
    id: upholdToken,
    total: {
      label: 'Donation',
      amount: {
        currency: 'BAT',
        value: '55.00',
      },
    },
    displayItems: [{
      label: 'Original donation amount',
      amount: {
        currency: 'BAT',
        value: '65.00',
      },
    }, {
      label: 'Friends and family discount',
      amount: {
        currency: 'BAT',
        value: '-10.00',
      },
    }],
  };

  console.log(details)

  let request = null;

  try {
    request = new PaymentRequest(supportedInstruments, details);
    if (request.canMakePayment) {
      request.canMakePayment().then(function(result) {
        info(result ? 'Can make payment' : 'Cannot make payment');
      }).catch(function(err) {
        error(err);
      });
    }
    if (request.hasEnrolledInstrument) {
      request.hasEnrolledInstrument().then(function(result) {
        info(result ? 'Has enrolled instrument' : 'No enrolled instrument');
      }).catch(function(err) {
        error(err);
      });
    }
  } catch (e) {
    error('Developer mistake: \'' + e.message + '\'');
  }

  return request;
}

let request = null;

/**
 * Handles the response from PaymentRequest.show().
 */
function handlePaymentResponse(response) {
  window.setTimeout(function() {
    response.complete('success')
      .then(function() {
        done('This is a demo website. No payment will be processed.', response);
      })
      .catch(function(err) {
        error(err);
        request = buildPaymentRequest();
      });
  }, 500);
}

/**
 * Launches payment request for Bob Pay.
 */
function onBuyClicked() { // eslint-disable-line no-unused-vars
  if (!window.PaymentRequest) {
    error('PaymentRequest API is not supported.');
    return;
  }

  request = buildPaymentRequest();

  try {
    request.show()
      .then(handlePaymentResponse)
      .catch(function(err) {
        error(err);
        request = buildPaymentRequest();
      });
  } catch (e) {
    error('Developer mistake: \'' + e.message + '\'');
    request = buildPaymentRequest();
  }
}
