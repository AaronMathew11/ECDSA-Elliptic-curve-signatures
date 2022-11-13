
const {fromHexString } = require("./conversion")
const crypto = require("crypto")
const secp256k1 = require('secp256k1')
const keccak256 = require('js-sha3').keccak256;
const sha256 = require('js-sha256');
const EC = require('elliptic').ec;
var ec = new EC('secp256k1');



function hex2bin(h) {
    return h.split('').reduce(function (acc, i) {
        return acc + ('000' + parseInt(i, 16).toString(2)).substr(-4, 4);
    }, '')
}




const privKey = "26530535e8828242a168a4980aacdc6be50f66db45e73b57fef7b53840b8a7f7";
const privKeyByte = fromHexString(privKey)

const pubKey = secp256k1.publicKeyCreate(privKeyByte);


const userId = "Aaron";
const password = "Hello";

const d = new Date();
const time = d.getTime();

const obj = {
    userId,
    password,
    time
}


const hashOfMessage = sha256(JSON.stringify(obj));
const bitOfhash = hex2bin(hashOfMessage);
 const byteofHash = Uint8Array.from(bitOfhash.slice(0,32))
//Sign the Message
const signObj = secp256k1.ecdsaSign(byteofHash, privKeyByte)

const data={

    signObj,
    pubKey,
    msg:obj

}

async function login(){


    const reqS = await fetch("http://localhost:4001/get",{

        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },

    })

    const res =  await reqS.json()
    console.log(res)


}

login()