import { Schema } from "./types/types";
require("dotenv").config();
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
  const data = await dataFetched.json();
  console.log(data);
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
