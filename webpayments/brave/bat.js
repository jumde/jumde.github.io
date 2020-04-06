function buildPaymentRequest() {
  let supportedInstruments = [{
    supportedMethods: 'bat',
  },{
    supportedMethods: 'basic-card',
    data: {supportedNetworks: ['amex', 'diners'], supportedTypes: ['debit', 'credit']},
  }];

  let details = {
    id: 'MDAxY2xvY2F0aW9uIHNob2dha3VrYW4uY29tCjAwMzhpZGVudGlmaWVyIHBrX3Rlc3RfYzQyODZiMzdkOGQzMDM3ZDJjYmE4OWI5MmY1N2E5OTIKMDAxNmNpZCBpZCA9IFNLVS0xMjM0CjAwMTVjaWQgYW1vdW50ID0gMS4wCjAwMTdjaWQgY3VycmVuY3kgPSBCQVQKMDAyZWNpZCBleHBpcmVzX2F0ID0gMjAxOS0xMi0yMFQyMTowNDo1MS4xMDFaCjAwMmZzaWduYXR1cmUg3M5je74-A1KRKcZaUE-6eMj3_FSDcNM1-IjZW0BHlsUK',
    total: {label: 'Total', amount: {currency: 'BAT', value: '2.00'}},
    displayItems: [
      {
        label: "<script>alert('2')</script>",
        amount: {currency: 'BAT', value: '65.00'},
      },
      {
        label: 'Brave discount',
        amount: {currency: 'BAT', value: '-63.00'},
      },
    ],
  };

  let request = new PaymentRequest(supportedInstruments, details);
  return request;
}
