# XHR Recorder

Capture all XMLHttpRequest calls from your browser and export as JSON.

## Usage

1. Open browser DevTools (F12) and go to Console
2. Copy and paste the entire contents of `src/tools/js/xhr-recorder.js`
3. You'll see: `✓ XHR Recorder initialized`
4. Perform your API calls in the application
5. In console, run: `copy(convertToJSON_pretty(requestLog))`
6. Paste into your editor

## Commands

- `requestLog` - View all recorded requests
- `console.table(requestLog)` - Pretty print as table
- `requestLog.length` - Count recorded requests
- `copy(convertToJSON_pretty(requestLog))` - Copy to clipboard

## Example Output

```json
[
  {
    "method": "GET",
    "url": "https://api.example.com/data",
    "headers": { "Authorization": "Bearer token..." },
    "body": null,
    "response": {
      "status": 200,
      "statusText": "OK",
      "headers": { "content-type": "application/json" },
      "data": { "result": "..." }
    }
  }
]
```
