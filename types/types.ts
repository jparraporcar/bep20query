export interface Schema {
  properties: {
    address: {
      pattern: RegExp;
      message: string;
      required: boolean;
    };
  };
}
