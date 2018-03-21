# myPayment App

A Simple implementation of Payment App with the help of **BlockChain** technology using Javascript.

## Usage

<!-- eslint-disable no-unused-vars -->

```js
 npm install //This will install all dependencies.
```

### Escaping query values

**Usage** 
In order to use this follow following procedures:

```js
 node index.js --help //This will open help menu
```

To create new User use following commands.
```js
 node index.js --create <username>
```

To list all blocks that are currently in blockchain use:
```js
 node index.js --list
```

To transfer Money to other user simply use:

```js
 node index.js transfer
```

**Caution** The data that you are creating is not persistent.This program just deal with the basic implememtation of BlockChain in nodeJs.The aim of this project is to give you an idea of how blockchain works, public and private cryptography, and also to build a command line interface using nodeJs.