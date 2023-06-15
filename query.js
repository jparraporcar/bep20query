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
const fetch = require('node-fetch');
let pr = require("prompt");
let reqAddress = "";
let dataResult = [];
let assetSymbolList = [];
let reducedTxData = [];
const assetObj = {
    assetSymbol: "",
    assetBalance: 0,
};
const assetObjList = [];
let schema = {
    properties: {
        address: {
            pattern: ADDRESS_REGEX,
            message: "incorrect address pattern, please try again",
            required: true,
        },
    },
};
const initData = (reqAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const qs = new URLSearchParams({
        module: "account",
        action: "tokentx",
        address: reqAddress,
        sort: "asc",
        apikey: process.env.API_KEY,
    });
    const dataFetched = yield fetch(BASE_URL + "?" + qs);
    const data = yield dataFetched.json();
    dataResult = [...data.result];
    const assetListRaw = dataResult.map((txEl) => txEl.tokenSymbol);
    const assetSet = new Set(assetListRaw);
    assetSymbolList = Array.from(assetSet);
    reducedTxData = dataResult.map((txEl) => {
        const txDate = new Date(Number(txEl.timeStamp) * 1000);
        const data = {
            hash: txEl.hash,
            date: txDate,
            tokenSymbol: txEl.tokenSymbol,
            value: txEl.value / Math.pow(10, txEl.tokenDecimal),
        };
        return data;
    });
    for (let i = 0; i < assetSymbolList.length; i++) {
        const assetObj = {
            assetSymbol: assetSymbolList[i],
            assetBalance: 0,
        };
        let filteredDataResult = dataResult.filter((el) => {
            return el.tokenSymbol === assetSymbolList[i];
        });
        let values = [];
        filteredDataResult.forEach((symbol) => {
            if (symbol.from === reqAddress) {
                values.push((-1 * symbol.value) / Math.pow(10, symbol.tokenDecimal));
            }
            else if (symbol.to === reqAddress) {
                values.push(Number(symbol.value) / Math.pow(10, symbol.tokenDecimal));
            }
        });
        assetObj.assetBalance = values.reduce((a, b) => {
            return a + b;
        }, 0);
        console.log(assetObj);
    }
    let columns = columnify(reducedTxData);
    console.log(columns);
});
pr.start();
pr.get(schema, function (err, result) {
    let reqAddress = result.address;
    if (reqAddress != "") {
        initData(reqAddress);
    }
});
// test ...
