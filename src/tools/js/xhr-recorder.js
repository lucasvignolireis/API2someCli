// XHR Request Recorder
// Paste this in browser console to record all XHR requests
// Use copy(convertToJSON_pretty(requestLog)) to copy to clipboard

const requestLog = [];

// Override XMLHttpRequest.open
const originalOpen = XMLHttpRequest.prototype.open;
XMLHttpRequest.prototype.open = function(method, url, ...args) {
  this._method = method;
  this._url = url;
  this._requestHeaders = {};
  return originalOpen.apply(this, [method, url, ...args]);
};

// Override XMLHttpRequest.setRequestHeader
const originalSetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
XMLHttpRequest.prototype.setRequestHeader = function(header, value) {
  this._requestHeaders[header] = value;
  return originalSetRequestHeader.apply(this, [header, value]);
};

// Override XMLHttpRequest.send
const originalSend = XMLHttpRequest.prototype.send;
XMLHttpRequest.prototype.send = function(body) {
  const self = this;
  
  this.addEventListener('load', function() {
    const request = {
      method: self._method,
      url: self._url,
      headers: self._requestHeaders,
      body: body ? (typeof body === 'string' ? body : JSON.stringify(body)) : null,
      response: {
        status: self.status,
        statusText: self.statusText,
        headers: {},
        data: null
      }
    };

    // Extract response headers
    const headersStr = self.getAllResponseHeaders();
    headersStr.split('\r\n').forEach(line => {
      const [key, val] = line.split(': ');
      if (key) request.response.headers[key] = val;
    });

    // Parse response data
    try {
      request.response.data = JSON.parse(self.responseText);
    } catch (e) {
      request.response.data = self.responseText;
    }

    requestLog.push(request);
    console.log(`[XHR Recorded] ${self._method} ${self._url} (${self.status})`);
  });

  return originalSend.apply(this, [body]);
};

// Utility function to convert to pretty JSON
function convertToJSON_pretty(data) {
  return JSON.stringify(data, null, 2);
}

console.log('✓ XHR Recorder initialized');
console.log('Requests will be logged to: requestLog');
console.log('To copy to clipboard: copy(convertToJSON_pretty(requestLog))');
console.log('To view: console.table(requestLog) or requestLog');
