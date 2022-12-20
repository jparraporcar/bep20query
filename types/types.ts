export interface Schema {
  properties: {
    address: {
      pattern: RegExp;
      message: string;
      required: boolean;
    };
  };
}

export interface ReducedTxData {
  hash: string;
  date: Date;
  tokenSymbol: string;
  value: number;
}

export interface TxData {
  blockNumber: number;
  timeStamp: number;
  hash: string;
  nonce: number;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: number;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: number;
  transactionIndex: number;
  gas: number;
  gasPrice: number;
  gasUsed: number;
  cumulativeGasUsed: number;
  input: string;
  confirmations: number;
}

export interface RawData {
  status: number;
  message: string;
  result: TxData[];
}
