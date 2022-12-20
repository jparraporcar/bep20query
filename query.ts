import { StringDecoder } from "string_decoder";
import { Schema } from "./types/types";

// define base url for calling the endpoint defined in https://docs.bscscan.com/api-endpoints/accounts#get-a-list-of-bep-20-token-transfer-events-by-address
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

let reqAddress;

pr.start();
pr.get(schema, function (err: Error, result: { address: string }) {
  if (result) {
    let reqAddress = result.address;
  }
  fetchTxData();
});

const fetchTxData = async () => {};
//

// creating qs object with user input and predefined pattern
// new URLSearchParams({});

// making https request

// handling errors

// showing output to screen

// others:
// add prettier config file
