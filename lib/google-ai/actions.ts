"use server";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  SafetySetting,
} from "@google/generative-ai";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";
import { safetySettingsValues } from "../constants";

// Using the latest Gemini 2.0 Flash model for faster responses
export async function generate(prompt: string) {
  "use server";

  const stream = createStreamableValue();

  // Get API key from environment variables - ensure it's set in your .env.local file
  // and on Vercel environment variables
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY;
  
  if (!apiKey) {
    console.error("Missing GEMINI_API_KEY environment variable");
    stream.error(new Error("API key not configured"));
    return { output: stream.value };
  }
  
  const genAI = new GoogleGenerativeAI(apiKey);

  const safetySettings = [
    {
      category: "HARM_CATEGORY_HARASSMENT",
      threshold: "BLOCK_NONE"
    },
    {
      category: "HARM_CATEGORY_HATE_SPEECH",
      threshold: "BLOCK_NONE"
    },
    {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_NONE"
    },
    {
      category: "HARM_CATEGORY_DANGEROUS_CONTENT",
      threshold: "BLOCK_NONE"
    }
  ] as unknown as SafetySetting[];

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    safetySettings: safetySettings,
    generationConfig: {
      temperature: 0.8,
      topP: 0.95,
    }
  });

  (async () => {
    try {
      // The streamText function expects a LanguageModelV1 type, but we have a GenerativeModel
      // const { textStream, usage } = await streamText({
      //   model,
      //   temperature: 0.8, // Lower temperature for more consistent and focused responses
      //   topP: 0.95,
      //   prompt: prompt,
      // });

      // for await (const text of textStream) {
      //   stream.update(text);
      // }

      // Using the native Google AI method instead
      const result = await model.generateContentStream(prompt);

      for await (const chunk of result.stream) {
        const text = chunk.text();
        if (text) {
          stream.update(text);
        }
      }

      stream.done();
    } catch (error) {
      console.error("Error in generating text:", error);

      // Provide more specific error information to help with debugging
      const errorMessage =
        error instanceof Error
          ? `${error.name}: ${error.message}`
          : "Unknown error occurred";

      console.error(errorMessage);
      stream.error(new Error(`Failed to generate response: ${errorMessage}`));
    }
  })().then(() => {});

  return { output: stream.value };
}
