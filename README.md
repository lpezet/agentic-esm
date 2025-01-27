# Install

```bash
npm i
```

# Run

```bash
npm run start
```

Output:

```
$ npm run start

> agentic-esm@1.0.0 start
> ts-node src/index.ts

{}
Hello from CommonJS app!
```

# Test

```bash
npm run test
```

Output:

```
$ npm run test

> agentic-esm@1.0.0 test
> jest

 FAIL  src/index.spec.ts
  ● Test suite failed to run

    Jest encountered an unexpected token

    Jest failed to parse a file. This happens e.g. when your code or its dependencies use non-standard JavaScript syntax, or when Jest is not configured to support such syntax.

    Out of the box Jest supports Babel, which will be used to transform your files into valid JS based on your Babel configuration.

    By default "node_modules" folder is ignored by transformers.

    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.

    You'll find more details and examples of these config options in the docs:
    https://jestjs.io/docs/configuration
    For information about custom transformations, see:
    https://jestjs.io/docs/code-transformation

    Details:

    /home/ubuntu/agentic-esm/node_modules/@agentic/ai-sdk/dist/index.js:2
    import { AIFunctionSet } from "@agentic/core";
    ^^^^^^

    SyntaxError: Cannot use import statement outside a module

    > 1 | import { createAISDKTools } from "@agentic/ai-sdk";
        | ^
      2 | // import { greet } from "esm-lib";
      3 |
      4 |

      at Runtime.createScriptFromCode (node_modules/jest-runtime/build/index.js:1505:14)
      at Object.<anonymous> (src/index.spec.ts:1:1)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |       0 |        0 |       0 |       0 |                   
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 failed, 1 total
Tests:       0 total
Snapshots:   0 total
Time:        0.98 s
Ran all test suites.
```



# Solution (one at least)

WARNING: between tests, MUST run `npx jest --clearCache`.

1. Update jest.config.ts:

```ts
...
  transform: {
    'node_modules/@agentic.+\\.js$': 'babel-jest',
    'node_modules/delay.+\\.js$': 'babel-jest',
    'node_modules/p-map.+\\.js$': 'babel-jest',

    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.spec.json' }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(@agentic|delay|p-map)/)'
  ],
...
```

2. Install `@babel/preset-env`

```bash
npm i -D @babel/preset-env
```

3 Now everything should work:

```bash
npm run start
```

Output:

```
> agentic-esm@1.0.0 start
> ts-node src/index.ts

{}
Hello from CommonJS app!
```

And test too:

```bash
npm run test
```

Output:

```
 PASS  src/index.spec.ts (9.744 s)
  Testing ESM Library
    ✓ should greet the user (3 ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------|---------|----------|---------|---------|-------------------
All files |       0 |        0 |       0 |       0 |                   
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        9.84 s
```


## Findings

### Summary

Three words: it's a nightmare.

More words:

Jest loads script using Node's `vm` package and more specifically using the `Script` class. This class expects CommonJS code. All the `transform[er]` stuff configuration in Jest is to convert anything that is NOT CJS (or just anything) into CJS, prior to loading it into `Script`.
The "conversion" is done through `ts-jest-transformer` which uses `ts-compiler` (anecdotally, both are in the `legacy` folder...).
The latter uses `typescript` (the package) Compiler API (through `createLanguageService()`) to create a compiler instance and then uses it to compile those files into CJS.

So in the end, if that "language service" was perfect, it should just work, no?


### Details (diary-like)

So I get to the point where, I understand things a bit more and I found out where the problem is.
1. `transformIgnorePatterns` is indeed used by Jest for each file it processes, to figure out whether to ignore it or not. It's used here: https://github.com/jestjs/jest/blob/v29.7.0/packages/jest-transform/src/ScriptTransformer.ts#L839, in the `shouldTransform()` function of the ScriptTransformer. It seems there's a default rule: `/\/node_modules\/|\.pnp\.[^\/]+$/`, which will indeed catch anyting in `node_modules`.
2. Provided we specify an "exclusion" (inclusion?) rule in `transformIgnorePatterns`, we still have to specify a transformer in `transform`. The reason is that it will go through the rules here: https://github.com/jestjs/jest/blob/v29.7.0/packages/jest-transform/src/ScriptTransformer.ts#L259.
3. On a side note, the Jest cache intervenes here: https://github.com/jestjs/jest/blob/v29.7.0/packages/jest-transform/src/ScriptTransformer.ts#L493. The transformed code is cached, and if found in the cache, it won't transform the source code again. So calling jest --clearCache is  must when tweaking transform settings for Jest.
4. This is where the "magic" happens: https://github.com/jestjs/jest/blob/v29.7.0/packages/jest-transform/src/ScriptTransformer.ts#L511. At this point: 1) the file should not be ignored, and 2) we have a rules for transformers and 3) one of those transformer rules matches the file of interest, so 4) we have a transformer for it.
5. I'll need to look now into that transformer a bit more because I still have issues which I'll discuss below.

Knowing what matters now, I have the following setup in my jest.config.ts:
transform: {
    '^.+\\.ts$': ['ts-jest', { tsconfig: 'tsconfig.spec.json' }], // Process my own .ts files
    '@agentic.+\\.js$': ['ts-jest', { tsconfig: 'tsconfig.spec.json' }], // Transformer for @agentic files 
  },
  transformIgnorePatterns: [
    '/node_modules/(?!@agentic/ai-sdk)', // i.e. Do not ignore @agentic libs in node_modules 
  ],

I can see the pattern I have defined to transform @agentic files (i.e. '@agentic.+\\.js$') does match the file of interest here (/home/ubuntu/Work/luke/agentic-esm/node_modules/@agentic/ai-sdk/dist/index.js). But maybe the transformer I specified is not right or a little off.

I can see my index.spec.ts source code is transpiled just fine.
From:
```
import { createAISDKTools } from "@agentic/ai-sdk";

describe("Testing ESM Library", () => {
  it("should greet the user", () => {
    const ai = createAISDKTools();
    expect(ai).toBeDefined();
  });
});
```
To:
```
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ai_sdk_1 = require("@agentic/ai-sdk");
describe("Testing ESM Library", () => {
    it("should greet the user", () => {
        const ai = (0, ai_sdk_1.createAISDKTools)();
        expect(ai).toBeDefined();
    });
});
```

But the @agentic/ai-sdk/index.js is transpiled....weird.
From:
```
// src/ai-sdk.ts
import { AIFunctionSet } from "@agentic/core";
import { tool } from "ai";
function createAISDKTools(...aiFunctionLikeTools) {
  const fns = new AIFunctionSet(aiFunctionLikeTools);
  return Object.fromEntries(
    fns.map((fn) => [
      fn.spec.name,
      tool({
        description: fn.spec.description,
        parameters: fn.inputSchema,
        execute: fn.impl
      })
    ])
  );
}
export {
  createAISDKTools
};
//# sourceMappingURL=index.js.map
```

To:
```
"use strict";
// src/ai-sdk.ts
import { AIFunctionSet } from "@agentic/core";
import { tool } from "ai";
function createAISDKTools(...aiFunctionLikeTools) {
    const fns = new AIFunctionSet(aiFunctionLikeTools);
    return Object.fromEntries(fns.map((fn) => [
        fn.spec.name,
        tool({
            description: fn.spec.description,
            parameters: fn.inputSchema,
            execute: fn.impl
        })
    ]));
}
export { createAISDKTools };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJmaWxlIj...truncated here...
```

It seems it just prepended "use strict"; and added another //# sourceMappingURL line at the end.

Now I'm at the point where a "language service" is used to compile the source code. It's defined here: https://github.com/kulshekhar/ts-jest/blob/5ade16edaa2cac9d0bd7b9d32b51a2fe9802f60c/src/legacy/compiler/ts-compiler.ts#L283 (and called, I checked), and then used when `getCompiledOutput()` (https://github.com/kulshekhar/ts-jest/blob/5ade16edaa2cac9d0bd7b9d32b51a2fe9802f60c/src/legacy/compiler/ts-compiler.ts#L174) is called by our previous transformer (https://github.com/kulshekhar/ts-jest/blob/5ade16edaa2cac9d0bd7b9d32b51a2fe9802f60c/src/legacy/ts-jest-transformer.ts#L241).

As far as I can tell, the parameters passed to the language service to compile the code (`getEmitOutput()` function), are the same for both my `index.spec.ts` and @agentic's `index.js` file.
Seems there's some logic inside the language service that's differentiating between .js and .ts.
I tested that theory by renaming the index.js, index.js.map and updating entries in the @agentic/ai-sdk package in my local node_modules folder and I got a different behavior. I got a different error:
```
FAIL  src/index.spec.ts
  ● Test suite failed to run

    node_modules/@agentic/ai-sdk/dist/index.js:4:27 - error TS7019: Rest parameter 'aiFunctionLikeTools' implicitly has an 'any[]' type.

    4 function createAISDKTools(...aiFunctionLikeTools) {
```
The error does not matter. It's just proof the behavior is different.