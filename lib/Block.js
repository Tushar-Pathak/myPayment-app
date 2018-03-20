const SHA256 = require('crypto-js/sha256');

class Block{
  constructor(timestamp, transaction, previousHash){
   
   //Get basic details of blocks that are being created.
    this.timestamp = timestamp;
    this.transaction = transaction;
    this.previousHash = previousHash;

    //Add Hash to Genesis Block.
    this.hash = this.calculateHash();

    //This will only be useful in mining purpose.
    this.nonce = 0;
  }

  calculateHash(){
    return SHA256(this.timestamp + JSON.stringify(this.transaction) + this.previousHash + this.nonce, 'Hello world').toString();
  }

  mineBlocks(__difficulty){
    while (this.hash.substring(0, __difficulty) !== Array(__difficulty + 1).join("0")){
      this.nonce ++;
      this.hash = this.calculateHash();
    }
  }
}

module.exports = Block;