const fetch = require('node-fetch');


const PRICE_SEARCH = 'https://api.coindesk.com/v1/bpi/currentprice.json';
const HISTORY = 'https://api.coindesk.com/v1/bpi/historical/close.json?for=yesterday';

function getCurrentPrice() {
  return new Promise((resolve, reject) => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(err => {
        reject(err);
      });
  });
}


    const yesterday = () => {
      return new Promise((resolve, reject) => {
        fetch(HISTORY)
          .then(res => res.json())
          .then(data => resolve(data))
          .catch(err => reject(err));
      });
    };
    

module.exports = {
  PRICE_SEARCH,
  HISTORY
}