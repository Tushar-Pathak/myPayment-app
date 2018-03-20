'use strict'

const SHA256 = require('crypto-js/sha256');
const User = require('./user');
const AES = require('crypto-js/aes');
const Transaction = require('./Transaction');
const Block = require('./Block');

class BlockChain{
  constructor(){
    this.chain = [this.createGenesisBlock()];
    this.__difficulty = 2;
    this.pendingTransactions = [];
    this.miningRewards = 100;
  }

  //Create initial block.
  createGenesisBlock(){
    return new Block('01/01/2017', 'Genesis Block', '0');
  }

  //Return latest block in block chain.
  getLatestBlock(){
    return this.chain[this.chain.length - 1];
  }

  //Add new Transactions.
  createTransaction(transaction){
     console.log('creating transactions.');
     this.pendingTransactions.push(transaction);
  }

  //get Balance of Address.
  getBalance(address){
    let balance = 0;
    for (let block of this.chain){
      for (let trans of block.transaction){
        let receiverAddress = Object(trans.toAddress);
        if (receiverAddress.address === address){
          balance += trans.amount;
         }

        if (trans.fromAddress == address){
          balance -= trans.amount;
        }

      }
    }
    return balance;
  }

  //Mine Transactions.
  minePendingTransactions(mineAddress){
     let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
     block.mineBlocks(this.__difficulty);
     console.log('successfully mined');
     this.chain.push(block);
  //    this.pendingTransactions = [  new Transaction(Admin.sendCoin(mineAddress, 100), 100) ];
  }

  //Calculate if chain is valid.
  ischainValid(){
    for (let i=1; i<this.chain.length; i++){
       if (this.chain[i].previousHash !== this.chain[i-1].hash){
         return false;
       } 
       
       if(this.chain[i].hash !== this.chain[i].calculateHash()){
         console.log(this.chain[i].hash);
         console.log(this.chain[i].calculateHash());         
         return false;
       }
    }
    return true;
  }
}

let myCoin = new BlockChain();

const Admin = new User('Admin', 100000000);
const Anushka = new User('Anushka', 100);
const Tushar = new User('Tushar', 50);

myCoin.createTransaction(new Transaction(Anushka.sendCoin(Tushar, 100), Tushar));

myCoin.createTransaction(new Transaction(Tushar.sendCoin(Anushka, 50), Anushka));

console.log('starting mining');
myCoin.minePendingTransactions('Tushar');

console.log(myCoin.getBalance('Tushar'));

console.log('Again mining');
myCoin.minePendingTransactions('Tushar');

console.log(myCoin.getBalance('Tushar'));

// console.log('Mining first block');
// myCoin.addBlock(new Block('1', new Date(), {amount : 4}));

// console.log('Mining first block');
// myCoin.addBlock(new Block('2', new Date(), {amount : 10}));

// console.log(JSON.stringify(myCoin, null, 4));
// console.log(myCoin.ischainValid());

// myCoin.chain[1].data.amount = {amount: 100};
// console.log(myCoin.ischainValid());

module.exports = BlockChain;