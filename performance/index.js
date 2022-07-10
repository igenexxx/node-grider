const {
  Worker, isMainThread, parentPort, workerData
} = require('worker_threads');

if (isMainThread) {
  const express = require('express');
  const crypto = require('crypto');
  const app = express();

  app.get('/', (req, res) => {
    const worker = new Worker(__filename, {
      workerData: 'Fuck you'
    });

    worker.on('message', data => console.log(`main thread: `,data));
    worker.on('error', err => console.error(err));
    worker.on('exit', code => {
      if (code !== 0) {
        return new Error(`Worker stopped with exit code ${code}`);
      }
    });
  });

  app.get('/fast', (req, res) => {
    res.send('This was fast');
  });

  app.listen(3000);

} else {
  const response = workerData;
  let counter = 0;
  while (counter < 1e9) {
    counter++;
  }
  parentPort.postMessage(`${response}, ${counter}`);
}


