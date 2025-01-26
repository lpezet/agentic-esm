import fs from 'fs';
import { Script } from "vm";

const content = fs.readFileSync('/home/ubuntu/Work/luc/agentic-esm/node_modules/@agentic/ai-sdk/dist/index.js', 'utf8');
const script = new Script(content);
const result = script.runInThisContext();
console.log(result);

function simulateJest() {
  const jestModuleWrapper = '({"Object.<anonymous>":function(module,exports,require,__dirname,__filename,jest){' + content + "}});";
  const script = new Script(jestModuleWrapper);
  const result = script.runInThisContext();
  console.log(result);
}

function direct() {
  const script = new Script(content);
  const result = script.runInThisContext();
  console.log(result);
}


// simulateJest();
//direct();