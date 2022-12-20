export interface Schema {
  properties: {
    address: {
      pattern: RegExp;
      message: string;
      required: boolean;
    };
  };
}
export interface AllBEP20TokensQS {
  module: "account";
  action: "tokentx";
  address: "string";
  sort: "asc" | "desc";
  apikey: "string";
}
