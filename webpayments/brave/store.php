<style>
pre {
    white-space: pre-wrap;       /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
}
</style>
<script src="bat.js"></script>
<script>
var response = "";
var request = null;

function generatePaymentRequest() {
  request = buildPaymentRequest();
  document.getElementById('details').innerHTML = JSON.stringify(JSON.parse(request.details), null, 4);
}

function addLogs(log) {
  var list = document.getElementById('logs');
  var entry = document.createElement('li');
  entry.appendChild(document.createTextNode(log));
  list.appendChild(entry);
}

function generateSKUToken() {
  var sku_token = "MDAxY2xvY2F0aW9uIHNob2dha3VrYW4uY29tCjAwMzhpZGVudGlmaWVyIHBrX3Rlc3RfYzQyODZiMzdkOGQzMDM3ZDJjYmE4OWI5MmY1N2E5OTIKMDAxNmNpZCBpZCA9IFNLVS0xMjM0CjAwMTVjaWQgYW1vdW50ID0gMS4wCjAwMTdjaWQgY3VycmVuY3kgPSBCQVQKMDAyZWNpZCBleHBpcmVzX2F0ID0gMjAxOS0xMi0yMFQyMTowNDo1MS4xMDFaCjAwMmZzaWduYXR1cmUg3M5je74-A1KRKcZaUE-6eMj3_FSDcNM1-IjZW0BHlsUK";
  document.getElementById('sku-token-title').innerHTML = "<h3>SKU Token</h3>";
  document.getElementById('sku-token').innerHTML = sku_token;
  addLogs('SKU token generated');
}

function onBuyClicked() {
  if (request.canMakePayment) {
    console.log("Can Make Payment");
  } else {
    console.log("Cannot");
    return;
  }
  addLogs('Showing Payment UI');
  request.show().then(function(instrumentResponse) {
    console.log('Payment Requested');
    console.log(instrumentResponse);
    addLogs('Received Payment Response');
    document.getElementById('payment-response-title').innerHTML = "<h3>Payment Response</h3>";
    document.getElementById('payment-response').innerHTML = JSON.stringify(JSON.parse(instrumentResponse), null, 4);
  })
  .catch(function(err) {
    console.log(err);
  });
}
</script>

<body>
<center>
<?php echo '<h2>Brave Store</h2>'; ?> 
<img src="tshirt.jpg" width="150" height="150"></img><br><br>
<button onclick="onBuyClicked()">Buy 2 BAT | 0.56 USD</button>
</center>

<button onclick="generateSKUToken()">Generate SKU Token</button>
<div id="sku-token-title"></div>
<pre id="sku-token" height=100% width=100%></pre>

<button onclick="generatePaymentRequest()">Build Payment Request</button>
<div id="payment-request-title"><h3>Payment Request</h3></div>
<pre id="details"></pre>

<div id="payment-response-title"></div>
<pre id="payment-response"></pre>

<div id="logs-box" style="background-color: #DCDCDC;height: 200px; width: 280px; border-style: inset;" >
<h3>Logs</h3>
<ul id="logs"></ul>
</div>
</body>
