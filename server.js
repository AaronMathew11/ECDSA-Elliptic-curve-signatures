
const express = require("express");
const cors = require("cors")
const { bin2hex, decToBin, fromHexString } = require("./conversion")
const crypto = require("crypto")
const secp256k1 = require('secp256k1')
const keccak256 = require('js-sha3').keccak256;
const sha256 = require('js-sha256');
const EC = require('elliptic').ec;
var ec = new EC('secp256k1');
const app = express();

var jwt = require('jsonwebtoken');



function hex2bin(h) {
    return h.split('').reduce(function (acc, i) {
        return acc + ('000' + parseInt(i, 16).toString(2)).substr(-4, 4);
    }, '')
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.use("/get", (req, res) => {

    //Actual Message
    const msg = req.body.msg;
    const signObj = req.body.signObj
    const pubKey = req.body.pubKey;

    const userId = msg.userId;
    const password = msg.password
    //Check the database with userId and password and get the public key

    //Public Key
    const pubKeyT = Object.values(pubKey)
    const realPubKey = Uint8Array.from(pubKeyT)


    //Signature
    const signObjT = Object.values(signObj.signature);
    const realSignObj = Uint8Array.from(signObjT)

    const d = new Date();
    const time = d.getTime();
    const clientTime = msg.time;

    //Creating some error in message so the signature will be invalid while  verify
    // msg.time="wfesds"

    if (time - clientTime > 100) {

        res.json({
            msg: "Invalid"
        })


    }
    else {

        //sha256 of the message
        const hashOfMessage = sha256(JSON.stringify(msg));
        const bitOfhash = hex2bin(hashOfMessage);
        const byteofHash = Uint8Array.from(bitOfhash.slice(0, 32))

        //With the public key check whether the signature is valid or not
        const msgAuthenticity = secp256k1.ecdsaVerify(realSignObj,byteofHash, realPubKey)

        if(msgAuthenticity){


            var token = jwt.sign({  exp: Math.floor(Date.now() / 1000) + (60 * 60), userId: userId}, 'shtdfgjkzfgxhgjhfcvjhhhhh');


              res.json({
                token,
            msg: "valid"
        })
        }
        else{
            res.json({
                msg: "Invalid"
            })
        }



    }








})


app.listen(4001);