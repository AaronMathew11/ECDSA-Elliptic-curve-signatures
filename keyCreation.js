
const { bin2hex, decToBin,fromHexString } = require("./conversion")
const crypto = require("crypto")
const secp256k1 = require('secp256k1')
const keccak256 = require('js-sha3').keccak256;
const EC = require('elliptic').ec;
var ec = new EC('secp256k1');



// let privKey
// do {
//   privKey = crypto.randomBytes(32)
// } while (!secp256k1.privateKeyVerify(privKey))
// console.log(privKey)
// const privKeyHex = privKey.toString('hex')
// console.log( "Private Key",privKeyHex)

const privKey = "26530535e8828242a168a4980aacdc6be50f66db45e73b57fef7b53840b8a7f7";

//Priveky in byte
const privKeyByte = fromHexString(privKey)

const pubKey = secp256k1.publicKeyCreate(privKeyByte);


// K=k*G

// x="wefhe"
// y='efwsdghb'
// uncompress = x+y;
// compress=x;


