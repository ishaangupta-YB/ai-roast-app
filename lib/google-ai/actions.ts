"use server";

import { google } from "@ai-sdk/google";
import { generateText, streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { safetySettings } from "../constants";

export async function generate(prompt: string) {
  "use server";

  const stream = createStreamableValue();
  const model = google("models/gemini-pro", {
    safetySettings: safetySettings,
  });

  (async () => {
    const { textStream } = await streamText({
      model: model,
      temperature: 1,
      topP: 0.95,
      prompt: prompt,
    });
    
    for await (const text of textStream) {
      stream.update(text);
    }
    stream.done();
  })().then(() => {});

  return { output: stream.value };
}
