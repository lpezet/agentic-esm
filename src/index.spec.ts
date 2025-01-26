import { createAISDKTools } from "@agentic/ai-sdk";

describe("Testing ESM Library", () => {
  it("should greet the user", () => {
    const ai = createAISDKTools();
    expect(ai).toBeDefined();
  });
});
