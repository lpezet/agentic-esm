import fs from 'fs';
import { default as tsJest, TsJestTransformOptions } from 'ts-jest';
process

const transformer = tsJest.createTransformer({
  tsconfig: 'tsconfig.spec.json', // Use your spec tsconfig file
});

const filePath = '/home/ubuntu/Work/luc/agentic-esm/node_modules/@agentic/ai-sdk/dist/index.js'; // Adjust the path as needed
const sourceCode = fs.readFileSync(filePath, 'utf8');

const options =
{
  "isInternalModule": false,
  "supportsDynamicImport": false,
  "supportsExportNamespaceFrom": false,
  "supportsStaticESM": false,
  "supportsTopLevelAwait": false,
  "collectCoverage": true,
  "collectCoverageFrom": [],
  "coverageProvider": "v8",
  "instrument": false,
  "cacheFS": {},
  "config": {
    "automock": false,
    "cache": true,
    "cacheDirectory": "/tmp/jest_rs",
    "clearMocks": false,
    "collectCoverageFrom": [],
    "coverageDirectory": "/home/ubuntu/Work/luc/agentic-esm/coverage",
    "coveragePathIgnorePatterns": [
      "/node_modules/"
    ],
    "cwd": "/home/ubuntu/Work/luc/agentic-esm",
    "detectLeaks": false,
    "detectOpenHandles": false,
    "errorOnDeprecated": false,
    "extensionsToTreatAsEsm": [],
    "fakeTimers": {
      "enableGlobally": false
    },
    "forceCoverageMatch": [],
    "globals": {},
    "haste": {
      "computeSha1": false,
      "enableSymlinks": false,
      "forceNodeFilesystemAPI": true,
      "throwOnModuleCollision": false
    },
    "id": "0dbe3732ef52ea5e9408dcae68522e5e",
    "injectGlobals": true,
    "moduleDirectories": [
      "node_modules"
    ],
    "moduleFileExtensions": [
      "js",
      "mjs",
      "cjs",
      "jsx",
      "ts",
      "tsx",
      "json",
      "node"
    ],
    "moduleNameMapper": [],
    "modulePathIgnorePatterns": [],
    "openHandlesTimeout": 1000,
    "prettierPath": "prettier",
    "resetMocks": false,
    "resetModules": false,
    "restoreMocks": false,
    "rootDir": "/home/ubuntu/Work/luc/agentic-esm",
    "roots": [
      "/home/ubuntu/Work/luc/agentic-esm"
    ],
    "runner": "/home/ubuntu/Work/luc/agentic-esm/node_modules/jest-runner/build/index.js",
    "sandboxInjectedGlobals": [],
    "setupFiles": [],
    "setupFilesAfterEnv": [],
    "skipFilter": false,
    "slowTestThreshold": 5,
    "snapshotFormat": {
      "escapeString": false,
      "printBasicPrototype": false
    },
    "snapshotSerializers": [],
    "testEnvironment": "/home/ubuntu/Work/luc/agentic-esm/node_modules/jest-environment-node/build/index.js",
    "testEnvironmentOptions": {},
    "testLocationInResults": false,
    "testMatch": [
      "**/__tests__/**/*.[jt]s?(x)",
      "**/?(*.)+(spec|test).[tj]s?(x)"
    ],
    "testPathIgnorePatterns": [
      "/node_modules/"
    ],
    "testRegex": [],
    "testRunner": "/home/ubuntu/Work/luc/agentic-esm/node_modules/jest-circus/runner.js",
    "transform": [
      [
        "^.+\\.ts$",
        "/home/ubuntu/Work/luc/agentic-esm/node_modules/ts-jest/dist/index.js",
        {
          "tsconfig": "tsconfig.spec.json"
        }
      ],
      [
        "^.+\\.js$",
        "/home/ubuntu/Work/luc/agentic-esm/node_modules/ts-jest/dist/index.js",
        {
          "tsconfig": "tsconfig.spec.json"
        }
      ]
    ],
    "transformIgnorePatterns": [
      "/node_modules/(?!@agentic/ai-sdk)"
    ],
    "watchPathIgnorePatterns": []
  },
  "configString": "{\"automock\":false,\"cache\":true,\"cacheDirectory\":\"/tmp/jest_rs\",\"clearMocks\":false,\"collectCoverageFrom\":[],\"coverageDirectory\":\"/home/ubuntu/Work/luc/agentic-esm/coverage\",\"coveragePathIgnorePatterns\":[\"/node_modules/\"],\"cwd\":\"/home/ubuntu/Work/luc/agentic-esm\",\"detectLeaks\":false,\"detectOpenHandles\":false,\"errorOnDeprecated\":false,\"extensionsToTreatAsEsm\":[],\"fakeTimers\":{\"enableGlobally\":false},\"forceCoverageMatch\":[],\"globals\":{},\"haste\":{\"computeSha1\":false,\"enableSymlinks\":false,\"forceNodeFilesystemAPI\":true,\"throwOnModuleCollision\":false},\"id\":\"0dbe3732ef52ea5e9408dcae68522e5e\",\"injectGlobals\":true,\"moduleDirectories\":[\"node_modules\"],\"moduleFileExtensions\":[\"js\",\"mjs\",\"cjs\",\"jsx\",\"ts\",\"tsx\",\"json\",\"node\"],\"moduleNameMapper\":[],\"modulePathIgnorePatterns\":[],\"openHandlesTimeout\":1000,\"prettierPath\":\"prettier\",\"resetMocks\":false,\"resetModules\":false,\"restoreMocks\":false,\"rootDir\":\"/home/ubuntu/Work/luc/agentic-esm\",\"roots\":[\"/home/ubuntu/Work/luc/agentic-esm\"],\"runner\":\"/home/ubuntu/Work/luc/agentic-esm/node_modules/jest-runner/build/index.js\",\"sandboxInjectedGlobals\":[],\"setupFiles\":[],\"setupFilesAfterEnv\":[],\"skipFilter\":false,\"slowTestThreshold\":5,\"snapshotFormat\":{\"escapeString\":false,\"printBasicPrototype\":false},\"snapshotSerializers\":[],\"testEnvironment\":\"/home/ubuntu/Work/luc/agentic-esm/node_modules/jest-environment-node/build/index.js\",\"testEnvironmentOptions\":{},\"testLocationInResults\":false,\"testMatch\":[\"**/__tests__/**/*.[jt]s?(x)\",\"**/?(*.)+(spec|test).[tj]s?(x)\"],\"testPathIgnorePatterns\":[\"/node_modules/\"],\"testRegex\":[],\"testRunner\":\"/home/ubuntu/Work/luc/agentic-esm/node_modules/jest-circus/runner.js\",\"transform\":[[\"^.+\\\\.ts$\",\"/home/ubuntu/Work/luc/agentic-esm/node_modules/ts-jest/dist/index.js\",{\"tsconfig\":\"tsconfig.spec.json\"}],[\"^.+\\\\.js$\",\"/home/ubuntu/Work/luc/agentic-esm/node_modules/ts-jest/dist/index.js\",{\"tsconfig\":\"tsconfig.spec.json\"}]],\"transformIgnorePatterns\":[\"/node_modules/(?!@agentic/ai-sdk)\"],\"watchPathIgnorePatterns\":[]}",
  "transformerConfig": {
    "tsconfig": "tsconfig.spec.json"
  }
};

// Transform the file
const transformed = transformer.process(sourceCode, filePath, options as unknown as TsJestTransformOptions);

// Output the transformed code
console.log(transformed);