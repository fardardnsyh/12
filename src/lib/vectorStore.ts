import { env } from "./config";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";

export const embedAndStoreDocs = async (
  client: Pinecone,
  // @ts-ignore
  docs: Document<Record<string, any>>[]
) => {
  try {
    console.log(env.OPENAI_API_KEY);
    const embeddings = new OpenAIEmbeddings({
      apiKey: env.OPENAI_API_KEY,
    });
    const index = client.index(env.PINECONE_INDEX_NAME);

    await PineconeStore.fromDocuments(docs, embeddings, {
      pineconeIndex: index,
      namespace: "test",
      textKey: "text",
    });
  } catch (error) {
    console.log(error);
    throw new Error("Embedding Error");
  }
};

export const getVectorStore = async (client: Pinecone) => {
  try {
    const embeddings = new OpenAIEmbeddings({
      apiKey: env.OPENAI_API_KEY,
    });
    const index = client.index(env.PINECONE_INDEX_NAME);

    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex: index,
      textKey: "text",
      namespace: "test",
    });

    return vectorStore;
  } catch (error) {
    console.log("error", error);
    throw new Error("Semething went wrong while getting vectore store!");
  }
};
