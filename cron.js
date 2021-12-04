const https = require('https');

https.get('http://mp-random.herokuapp.com/', (resp) => {
  let data = '';

  // A chunk of data has been received.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log('CRON', JSON.parse(data).explanation);
    
    process.exit();
  });

}).on("error", (err) => {
  console.log("CRON Error: " + err.message);
  
  process.exit();
});
