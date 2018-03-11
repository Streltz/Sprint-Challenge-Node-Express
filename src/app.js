const express = require('express');
const bodyParser = require('body-parser');
const app = express();


const fetch = require('node-fetch');

const PORT = 3000
const STATUS_ERROR = 422
const STATUS_SUCCESS = 200


const API_CURRENT = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const API_YESTERDAY = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';


app.use(bodyParser.json());


let CURRENT_PRICE = {};
let YESTERDAY_PRICE = {}


app.get('/current' , (req, res) => {
    fetch(API_CURRENT)
    .then(res => res.json())
    .then(json => {
        res.status(STATUS_SUCCESS);
        res.json(json);
    })
    .catch(err => {
        res.status(STATUS_ERROR);
        res.json({ error: err });
      });
  });

app.get('/yesterday', (req, res) => {
    fetch(API_YESTERDAY)
    .then(res => res.json())
    .then(json => {
        res.status(STATUS_SUCCESS);
      res.json(json);
    })
    .catch(err => {
      res.status(STATUS_ERROR);
      res.json({ error: err });
    });
});

app.get('/compare', (req, res) => {
    fetch(API_CURRENT)
    .then(res => res.json())
    .then(json => {
        currentPrice = json.bpi.USD.rate_float;
    fetch(API_YESTERDAY)
    .then(res => res.json())
    .then(difference => {
        difference = Object.values(difference.bpi)[0];
        const result = Number(currentPrice - difference);
        res.status(STATUS_SUCCESS);
        if (result < 0) {
            res.json({ lost: result });
        } else { 
            res.json ({ gained: result });
        }
    });
})
.catch(err => {
    res.status(STATUS_ERROR);
    res.send({ error: err });
    });
});

app.listen(PORT, err => {
  if (err) {
    console.log(`Error starting server: ${err}`);
  } else {
    console.log(`App listening on port ${PORT}`);
  }
});