# semux.js (Under Development)

[![Build Status](https://travis-ci.org/semuxproject/semux.js.svg?branch=master)](https://travis-ci.org/semuxproject/semux.js)
[![Coverage Status](https://coveralls.io/repos/github/semuxproject/semux.js/badge.svg?branch=master)](https://coveralls.io/github/semuxproject/semux.js?branch=master)

This library aims to providing javascript utilities for Semux client-side applications, such as web wallet.

Visit [issues](https://github.com/semuxproject/semux.js/issues) page to see planned features or propose a feature request.

# Install

```
npm install --save https://github.com/semuxproject/semux.js.git
```

# Usage

- [Hash](lib/Hash.spec.ts)
- [Key & Signature](lib/Key.spec.ts)
- [Transaction Signing, Encoding or Decoding](lib/Transaction.spec.ts)
- [Byte Encoder](src/lib/SimpleEncoder.spec.ts) / [Byte Decoder](lib/SimpleDecoder.spec.ts)

# Development

## Install Modules

```
npm install
```

## Execute Test Cases

```
npm test
``` 

## Format Source Code

```
npm run format
```

## Check Source Code Formatting

```
npm run format:check
```
