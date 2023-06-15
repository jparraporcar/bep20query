import { Asset, RawData, ReducedTxData, Schema, TxData } from "./types/types";
require("dotenv").config();
var columnify = require("columnify");
const BASE_URL = "https://api.bscscan.com/api";
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/g;
const fetch = require('node-fetch');

let pr = require("prompt");
let reqAddress: string = "";
let dataResult: TxData[] = [];
let assetSymbolList: string[] = [];
let reducedTxData: ReducedTxData[] = [];
const assetObj: Asset = {
  assetSymbol: "",
  assetBalance: 0,
};
const assetObjList: Asset[] = [];

let schema: Schema = {
  properties: {
    address: {
      pattern: ADDRESS_REGEX,
      message: "incorrect address pattern, please try again",
      required: true,
    },
  },
};

const initData = async (reqAddress: string) => {
  const qs = new URLSearchParams({
    module: "account",
    action: "tokentx",
    address: reqAddress,
    sort: "asc",
    apikey: process.env.API_KEY as string,
  });
  const dataFetched = await fetch(BASE_URL + "?" + qs);
  const data: RawData = await dataFetched.json();
  dataResult = [...data.result];
  const assetListRaw = dataResult.map((txEl) => txEl.tokenSymbol);
  const assetSet = new Set(assetListRaw);
  assetSymbolList = Array.from(assetSet);
  reducedTxData = dataResult.map((txEl: TxData) => {
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
    const assetObj: Asset = {
      assetSymbol: assetSymbolList[i],
      assetBalance: 0,
    };
    let filteredDataResult: TxData[] = dataResult.filter((el) => {
      return el.tokenSymbol === assetSymbolList[i];
    });
    let values: number[] = [];
    filteredDataResult.forEach((symbol) => {
      if (symbol.from === reqAddress) {
        values.push((-1 * symbol.value) / Math.pow(10, symbol.tokenDecimal));
      } else if (symbol.to === reqAddress) {
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
};

pr.start();
pr.get(schema, function (err: Error, result: { address: string }) {
  let reqAddress = result.address;

  if (reqAddress != "") {
    initData(reqAddress);
  }
});

// test ...
