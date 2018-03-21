const AES = require('crypto-js/aes');

function User(name, amount){
  
  this.public_key = 'hello world';
  this.private_key = 'hello world';
  this.name = name;
  this.amount = amount; 
  this.address = this.name;
}

User.prototype.sendCoin = function(toAddress, amount) {
  const transaction = {
    amount: amount,
    toAddress: toAddress,
    fromAddress: this.address
  }

  ciphertext = AES.encrypt(JSON.stringify(transaction), toAddress.getPublickey());
 
  return ciphertext;
}

User.prototype.receiveCoin = function(data) {
  let plaintext = AES.decrypt(data.toString(), this.private_key);

  plaintext = plaintext.toString(require('crypto-js').enc.Utf8);
  
  console.log(plaintext, '\n this is it');
  return plaintext;
}

User.prototype.getAddress = function(){
  return this.address;
}

User.prototype.getPublickey = function(){
  return this.public_key;
}

module.exports = User;