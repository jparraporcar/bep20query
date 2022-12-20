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
let dataResult = [];
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
    dataResult = [...data.result];
    const assetListRaw = data.result.map((txEl) => txEl.tokenSymbol);
    const assetSet = new Set(assetListRaw);
    const assetList = Array.from(assetSet);
    const assetObj = {
        assetSymbol: "",
        assetBalance: 0,
    };
    const assetObjList = [];
    const calcBalances = (assetList, dataResult) => {
        for (let i = 0; i < assetList.length; i++) {
            const assetObj = { assetSymbol: assetList[i], assetBalance: 0 };
            for (let j = 0; j < dataResult.length; j++) {
                if (dataResult[j].tokenSymbol === assetList[i]) {
                    if (dataResult[j].from === reqAddress) {
                        assetObj.assetBalance +=
                            dataResult[j].value / Math.pow(10, dataResult[j].tokenDecimal);
                        console.log("here");
                        console.log(dataResult[j].value / Math.pow(10, dataResult[j].tokenDecimal));
                    }
                    else if (dataResult[j].to === reqAddress) {
                        assetObj.assetBalance -=
                            dataResult[j].value / Math.pow(10, dataResult[j].tokenDecimal);
                    }
                }
            }
            assetObjList.push(assetObj);
        }
        console.log(assetObjList);
    };
    calcBalances(assetList, dataResult);
    const reducedTxData = data.result.map((txEl) => {
        const txDate = new Date(Number(txEl.timeStamp) * 1000);
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
pr.start();
pr.get(schema, function (err, result) {
    let reqAddress = result.address;
    if (reqAddress != "") {
        fetchTxData(reqAddress);
    }
});
