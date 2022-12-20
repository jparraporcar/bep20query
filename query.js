"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var columnify = require("columnify");
const BASE_URL = "https://api.bscscan.com/api";
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/g;
let pr = require("prompt");
let schema = {
    properties: {
        address: {
            pattern: ADDRESS_REGEX,
            message: "incorrect address pattern, please try again",
            required: true,
        },
    },
};
let reqAddress = "";
pr.start();
pr.get(schema, function (err, result) {
    let reqAddress = result.address;
    if (reqAddress != "") {
        fetchTxData(reqAddress);
    }
});
const fetchTxData = (reqAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const qs = new URLSearchParams({
        module: "account",
        action: "tokentx",
        address: reqAddress,
        sort: "asc",
        apikey: process.env.API_KEY,
    });
    const dataFetched = yield fetch(BASE_URL + "?" + qs);
    const data = yield dataFetched.json();
    const reducedTxData = data.result.map((txEl) => {
        const txDate = new Date(Number(txEl.timeStamp) * 1000);
        console.log(10 ^ txEl.tokenDecimal);
        const reducedTxData = {
            hash: txEl.hash,
            date: txDate,
            tokenSymbol: txEl.tokenSymbol,
            value: txEl.value / Math.pow(10, txEl.tokenDecimal),
        };
        return reducedTxData;
    });
    let columns = columnify(reducedTxData);
    console.log(columns);
});
//
// creating qs object with user input and predefined pattern
// new URLSearchParams({});
// making https request
// handling errors
// showing output to screen
// others:
// add prettier config file
// define interface for qs paramters object
