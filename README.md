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

### License text

You can set the license text to the feature files in 3 ways:

1. **License file** - you can set the `licenseFile` option to the file's path where the license is stored, then it is added to each feature file as a comment.
2. **License test** - yan can set the `licenseText` option to the exact license text, and it is added to each feature file as a comment.
3. If **both** a license file and a license text is set, then the tool will merge these and add to each feature file. **Important**, that to merge these, the tool will use the `${LICENSE}` token in the license text, to inject the content of the license file, thus it must be added to the license text!

> You can find a proper **License** in the following site for your project: https://choosealicense.com/licenses.

### License placement

The license text can be placed either in the start or the end of the feature file. By default it is placed in the start of the feature file. It can be set via the `placement` coonfiguration option, with one of the `LicensePlacement` enum values.

## Other

This package uses [debug](https://www.npmjs.com/package/debug) for logging, use `gpc:license` :

```shell
DEBUG=gpc:license* gherking ...
```

For detailed documentation see the [TypeDocs documentation](https://gherking.github.io/gpc-license/).