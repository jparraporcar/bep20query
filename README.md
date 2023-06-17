# bep20query

## Table of Contents
- [Description](#description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contact](#contact)

## Description

`bep20query` is a CLI application that retrieves the asset movements related to a wallet address on the Binance Smart Chain (BSC). Upon execution, the user is prompted to input the wallet address. After confirming, the application displays the quantity of each of the tokens in the queried wallet and a list of all transactions involving the wallet.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed the latest version of [Node.js and npm](https://nodejs.org/)
- You have obtained an API key from [Bscscan](https://bscscan.com/)

## Installation

To install `bep20query`, follow these steps:

1. Clone the repo

```
git clone https://github.com/jparraporcar/bep20-query.git
```

2. Navigate into the project directory:

```
cd bep20query
```

3. Install the dependencies:
```
npm install
```

4. Obtain an API key from Bscscan.

5. Create a .env file and add the API key as a string as follows: 
```
echo "API_KEY='ObtainedKey'" > .env
```

6. Compile the TypeScript files (only necessary if any .ts file is modified):
```
npx tsc
```

7. Run the application:
```
node query.js
```

## Usage

After following the installation steps, you'll be able to use bep20query to get token balances and transaction history for a BSC wallet.

## Technologies

`BEP20Query` uses the following technologies:

- [Node.js](https://nodejs.org/) - An open-source, back-end JavaScript runtime environment.
- [TypeScript](https://www.typescriptlang.org/) - An open-source language which builds on JavaScript by adding static type definitions.
- [node-fetch](https://github.com/node-fetch/node-fetch) - A light-weight module that brings the Fetch API to Node.js.
- [prompt](https://www.npmjs.com/package/prompt) - A beautiful command-line prompt for node.js.
- [dotenv](https://www.npmjs.com/package/dotenv) - A module that loads environment variables from a `.env` file into `process.env`.
- [columnify](https://www.npmjs.com/package/columnify) - Create text-based columns suitable for console output.

## Contact

If you want to contact me you can reach me at:

- **Name**: `Jordi Parra Porcar`
- **Email**: `jordiparraporcar@gmail.com`
- **LinkedIn**: [`Jordi Parra Porcar`](https://www.linkedin.com/in/jordiparraporcar/)

For any additional questions or comments, please feel free to reach out. Contributions, issues, and feature requests are welcome!
