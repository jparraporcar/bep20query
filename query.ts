import {
  AssetBalance,
  RawData,
  ReducedTxData,
  Schema,
  TxData,
} from "./types/types";
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
let dataResult: TxData[] = [];
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
  dataResult = [...data.result];
  const assetListRaw = data.result.map((txEl) => txEl.tokenSymbol);
  const assetSet = new Set(assetListRaw);
  const assetList = Array.from(assetSet);

  const assetObj: AssetBalance = {
    assetSymbol: "",
    assetBalance: 0,
  };

  const assetObjList: AssetBalance[] = [];

  const calcBalances = (assetList: any, dataResult: any) => {
    for (let i = 0; i < assetList.length; i++) {
      const assetObj = { assetSymbol: assetList[i], assetBalance: 0 };
      for (let j = 0; j < dataResult.length; j++) {
        if (dataResult[j].tokenSymbol === assetList[i]) {
          if (dataResult[j].from === reqAddress) {
            assetObj.assetBalance +=
              dataResult[j].value / Math.pow(10, dataResult[j].tokenDecimal);
            console.log("here");
            console.log(
              dataResult[j].value / Math.pow(10, dataResult[j].tokenDecimal)
            );
          } else if (dataResult[j].to === reqAddress) {
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

  const reducedTxData: ReducedTxData[] = data.result.map((txEl: TxData) => {
    const txDate = new Date(Number(txEl.timeStamp) * 1000);
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

pr.start();
pr.get(schema, function (err: Error, result: { address: string }) {
  let reqAddress = result.address;

  if (reqAddress != "") {
    fetchTxData(reqAddress);
  }
});
