import { createAISDKTools } from "@agentic/ai-sdk";
// import { greet } from "esm-lib";


describe("Testing ESM Library", () => {
  it("should greet the user", () => {
    const ai = createAISDKTools();
    // expect(greet("ESM Library")).toBe("Hello, ESM Library!");
    expect(ai).toBeDefined();
  });
});
