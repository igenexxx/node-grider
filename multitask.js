const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

process.env.UV_THREADPOOL_SIZE = 5;

const start = Date.now();

const doRequest = () => {
  https.request('https://google.com', res => {
    res.on('data', () => {})
    res.on('end', () => {
      console.log(Date.now() - start);
    });
  }).end();
}

const doHash = () => {
  crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
    console.log(`Hash: ${ Date.now() - start }`);
  });
}

doRequest();

fs.readFile('./multitask.js', 'utf-8', () => {
  console.log('FS:', Date.now() - start);
})

doHash();
doHash();
doHash();
doHash();

// Array.from({ length: 6 }).forEach(() => doRequest())
