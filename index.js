'use strict';

const program = require('commander');
const {prompt} = require('inquirer');
const BlockChain = require('./lib/main');
const User = require('./lib/user');
const Transaction = require('./lib/Transaction');

class MyPaymentApp{

  constructor(){

    program
      .version('0.0.1')
      .description('A Block Chain Application');

    //create BlockChain object.
    this.myCoin = new BlockChain();

    ///Keep track of user login details.
    this.login = false;
    this.transferMoney();
    this.listAll();
    this.loginUser();
    this.createUser();

    program.parse(process.argv);
  }

  createUser(){
    program
      .command('create <name>')
      .alias('c')
      .description('Create new User')
      .action(name => {
        new User(name, 0);
      });
  }

  loginUser(){
    program
      .command('login <name> <password>')
      .alias('sudo')
      .description('login to your account')
      .action((name, password) => {
        if (name === 'Tushar' && password === '123'){
          this.login = true;       
          this.name = name;   
        }
      });
  }

  //This function will list all blocks bu only to admin.
  listAll(){
    program
      .command('list')
      .alias('l')
      .description('List all blocks')
      .action( () => {
         console.log(JSON.stringify(blockChain, null, 4));   
      });
  }

  //This function is used for transfer of money.
  transferMoney(){
    
    const questions = [
      {
        type:'input',
        name:'name',
        message:'Enter receiver name.'
      },
      {
        type:'input',
        name:'amount',
        message:'Enter amount to be sent.'
      }
    ];

    program
      .command('transfer money')
      .alias('t')
      .description('Transfer Money to another person')
      .action( () => {
        prompt(questions)
          .then(answers => {
             if (User.isExists(name) && this.login === true) {
                this.myCoin.createTransaction(new Trasaction(this.user.sendCoin(name, amount)));
                this.mineTransactions();             
             }else {
               throw new Error('This user does not exists');
             }
          })
          .catch(error => console.log(error));
      });
  }

  mineTransactions(){
    this.myCoin.minePendingTransactions(this.name);
  }
}

const result = new MyPaymentApp();