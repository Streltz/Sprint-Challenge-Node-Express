const express = require('express');
const router = express.Router();

const STATUS_SUCCESS = 200;
const STATUS_USER_ERROR = 422;

const {
  currentPrice,
  yesterday
} = require('../models/prices.js');


router.get('/compare', (req, res) => {
  if (!currentPrice) {
    getCurrentPrice()
    .then(data => {
    currentPrice = data.bpi.USD.rate_float;
    res.send({ currentDayValue: currentPrice });
  })
    .catch(err => 
      console.log(err));
    } else {
      yesterday()
      .then(data => {
        previousPrice = Object.values(data.bpi)[0];
        difference = currentPrice - previousPrice;
        res.send ({ previousDayValue: previousPrice, difference: difference});
      })
    .catch(err => console.log(err));
    };
});

module.exports = router;