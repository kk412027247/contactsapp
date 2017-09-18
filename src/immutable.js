const update = require('react-addons-update');

let originalTicket = {
  company: 'dalta',
  flightNo: '0999',
  arrival:{
    airport:'mia',
    time:'123123'
  }
};

let newTicket = update(originalTicket , {arrival:{
  airport:{$set:'mco'}
}});

console.log(newTicket);
