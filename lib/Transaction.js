const AES = require('crypto-js/aes');

class Transaction {

  constructor(data, toAddress) {

    const return_data = toAddress.receiveCoin(data);
    if (data !== false) {
      const plain_data = JSON.parse(return_data);
     
      this.toAddress = toAddress;
      this.fromAddress = plain_data.fromAddress;
      this.amount = plain_data.amount;
    }
  }
}

module.exports = Transaction;