import { RawData, ReducedTxData, Schema, TxData } from "./types/types";
require("dotenv").config();
var columnify = require("columnify");
const BASE_URL = "https://api.bscscan.com/api";
const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/g;

let pr = require("prompt");

let schema: Schema = {
  properties: {
    address: {
      pattern: ADDRESS_REGEX,
      message: "incorrect address pattern, please try again",
      required: true,
    },
  },
};

let reqAddress: string = "";

pr.start();
pr.get(schema, function (err: Error, result: { address: string }) {
  let reqAddress = result.address;

  if (reqAddress != "") {
    fetchTxData(reqAddress);
  }
});

const fetchTxData = async (reqAddress: string) => {
  const qs = new URLSearchParams({
    module: "account",
    action: "tokentx",
    address: reqAddress,
    sort: "asc",
    apikey: process.env.API_KEY as string,
  });
  const dataFetched = await fetch(BASE_URL + "?" + qs);
  const data: RawData = await dataFetched.json();

  const reducedTxData: any = data.result.map((txEl) => {
    const txDate = new Date(Number(txEl.timeStamp) * 1000);
    console.log(10 ^ txEl.tokenDecimal);
    const reducedTxData: ReducedTxData = {
      hash: txEl.hash,
      date: txDate,
      tokenSymbol: txEl.tokenSymbol,
      value: txEl.value / Math.pow(10, txEl.tokenDecimal),
    };

    return reducedTxData;
  });
  let columns = columnify(reducedTxData);
  console.log(columns);
};

//

// creating qs object with user input and predefined pattern
// new URLSearchParams({});

// making https request

// handling errors

// showing output to screen

// others:
// add prettier config file
// define interface for qs paramters object
