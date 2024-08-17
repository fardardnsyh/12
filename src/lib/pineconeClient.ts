import { Pinecone } from "@pinecone-database/pinecone";
import { env } from "./config";
import delay from "delay";

let pineconeClientInstance: Pinecone | null = null;

async function createIndex(client: Pinecone, indexName: string) {
  try {
    await client.createIndex({
      name: indexName,
      dimension: 1536,
      metric: "cosine",
      spec: { serverless: { cloud: "aws", region: "us-east-1" } },
    });
    console.log(
      `waiting ${env.INDEX_INIT_TIMEOUT} seconds for index initialization to complete...`
    );
    await delay(+env.INDEX_INIT_TIMEOUT * 1000);
    console.log("index created!");
  } catch (error) {
    console.log("error", error);
    throw new Error("Index creation failed");
  }
}

async function initPineconeClient() {
  const pineconeClient = new Pinecone({
    apiKey: env.PINECONE_API_KEY,
  });
  const indexName = env.PINECONE_INDEX_NAME;
  const existingIndexes = await pineconeClient.listIndexes();
  const index = existingIndexes?.indexes?.filter(
    (index) => index.name === indexName
  );
  if (!index?.length) {
    createIndex(pineconeClient, indexName);
  } else {
    console.log("Index exists!");
  }
  return pineconeClient;
}

export async function getPineconeClient() {
  if (!pineconeClientInstance) {
    pineconeClientInstance = await initPineconeClient();
  }
  return pineconeClientInstance;
}
