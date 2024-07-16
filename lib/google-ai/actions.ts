"use server";

import { google } from "@ai-sdk/google";
import {  streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { safetySettings } from "../constants";

export async function generate(prompt: string) {
  "use server";

  const stream = createStreamableValue();
  const model = google("models/gemini-pro", {
    safetySettings: safetySettings,
  });

  (async () => {
    try {
    const { textStream,usage } = await streamText({
      model: model,
      temperature: 1,
      topP: 0.95, 
      prompt: prompt,
    });
    
    for await (const text of textStream) {
      stream.update(text);
    }
    stream.done();
    console.log({usage})
    // if (!usageMetadata.candidatesTokenCount) {
    //   usageMetadata.candidatesTokenCount = 0; 
    // }
  } catch (error) {
    console.error("Error in generating text:", error);
    stream.error(error);
  }
  })().then(() => {});

  return { output: stream.value };
}
