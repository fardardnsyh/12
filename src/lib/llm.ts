import { ChatOpenAI } from "@langchain/openai";
import { env } from "./config";

export const streamingModel = new ChatOpenAI({
  apiKey: env.OPENAI_API_KEY,
  streaming: true,
  verbose: true,
  temperature: 0,
  modelName: "gpt-3.5-turbo",
});

export const nonStreamingModel = new ChatOpenAI({
  apiKey: env.OPENAI_API_KEY,
  modelName: "gpt-3.5-turbo",
  verbose: true,
  temperature: 0,
});
