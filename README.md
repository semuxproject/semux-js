# Semux Javascript SDK

[![NPM Status](https://img.shields.io/npm/v/semux-js.svg)](https://www.npmjs.com/package/semux-js)
[![Travis Build Status](https://travis-ci.com/semuxproject/semux-js.svg?branch=master)](https://travis-ci.com/semuxproject/semux-js)
[![Coverage Status](https://coveralls.io/repos/github/semuxproject/semux-js/badge.svg?branch=master)](https://coveralls.io/github/semuxproject/semux-js?branch=master)

This library aims to providing javascript utilities for Semux client-side applications, such as web wallet.

Visit [issues](https://github.com/semuxproject/semux-js/issues) page to see planned features or propose a feature request.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Example Applications](#example-applications)
- [Development](#development)
- [Maintainers](#maintainers)
- [License](#license)

## Install

```
npm install --save semux-js
```

## Getting Started

**Node.js**

```javascript
// import semux module
const {AccountApi, BlockchainApi, Configuration, DelegateApi, NodeApi, ToolApi, WalletApi} = require("semux-js");

// create an API client
const api = new NodeApi(new Configuration({
    username: "user",
    password: "pass",
    basePath: "http://localhost:5171/v2.5.0"
}));

// call GET /info API
api
  .getInfo({ mode: 'cors', credentials: 'include' })
  .then(response => console.log(response))
  .catch(err => console.error(err));
```

## Usage

- [Hash](https://github.com/semuxproject/semux-js/blob/master/src/lib/Hash.spec.ts)
- [Key & Signature](https://github.com/semuxproject/semux-js/blob/master/src/lib/Key.spec.ts)
- [Transaction Signing, Encoding or Decoding](https://github.com/semuxproject/semux-js/blob/master/src/lib/Transaction.spec.ts)
- [Byte Encoder](https://github.com/semuxproject/semux-js/blob/master/src/lib/SimpleDecoder.spec.ts) / [Byte Decoder](https://github.com/semuxproject/semux-js/blob/master/src/lib/SimpleDecoder.spec.ts)
- [API Client](https://github.com/semuxproject/semux-js/blob/master/src/lib/api/api.spec.ts)

## Example Applications

- Web Wallets
  - https://github.com/witoldsz/semux-light

## Development

### Install Modules

```
npm install
```

### Run Unit Tests

```
npm test
```

### Format Source Code

```
npm run format
```

### Check Source Code Formatting

```
npm run format:check
```

## Maintainers

[@cryptokat](https://github.com/cryptokat/).

## License

[MIT](LICENSE) © [The Semux Developers](https://github.com/semuxproject)
