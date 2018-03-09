const express = require('express');


const pricesController = require('./controllers/prices.js');

const app = express();
const PORT = 3000

app.use(pricesController);

app.listen(PORT, err => {
  if (err) {
    console.log(`Error starting server: ${err}`);
  } else {
    console.log(`App listening on port ${PORT}`);
  }
});