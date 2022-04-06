> **IMPORTANT** This is a placeholder, initial version of the package; **DO NOT USE** this version. Please wait until **v1.0.0** is released!

# gpc-license

![Downloads](https://img.shields.io/npm/dw/gpc-license?style=flat-square) ![Version@npm](https://img.shields.io/npm/v/gpc-license?label=version%40npm&style=flat-square) ![Version@git](https://img.shields.io/github/package-json/v/gherking/gpc-license/master?label=version%40git&style=flat-square) ![CI](https://img.shields.io/github/workflow/status/gherking/gpc-license/CI/master?label=ci&style=flat-square) ![Docs](https://img.shields.io/github/workflow/status/gherking/gpc-license/Docs/master?label=docs&style=flat-square)

This precompiler can be used to inject **License** statement into the feature files.

## Usage

```javascript
'use strict';
const compiler = require('gherking');
const { default: License } = require('gpc-license');

let ast = await compiler.load('./features/src/login.feature');
ast = compiler.process(
  ast,
  new License({
    licenseFile: './LICENSE',
  })
);
await compiler.save('./features/dist/login.feature', ast, {
  lineBreak: '\r\n'
});
```

```typescript
'use strict';
import {load, process, save} from "gherking";
import License from "gpc-license";

let ast = await load("./features/src/login.feature");
ast = process(
  ast,
  new License({
    licenseFile: './LICENSE',
  })
);
await save('./features/dist/login.feature', ast, {
  lineBreak: '\r\n'
});
```

## Other

This package uses [debug](https://www.npmjs.com/package/debug) for logging, use `gpc:license` :

```shell
DEBUG=gpc:license* gherking ...
```

For detailed documentation see the [TypeDocs documentation](https://gherking.github.io/gpc-license/).