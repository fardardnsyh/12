import { StringOutputParser } from "@langchain/core/output_parsers";
import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { streamingModel } from "./llm";
import { getPineconeClient } from "./pineconeClient";
import { QA_TEMPLATE } from "./promptTemplate";
import { getVectorStore } from "./vectorStore";

type callChainArgs = {
  question: string;
  chatHistory: string;
};

export const callChain = async ({ question, chatHistory }: callChainArgs) => {
  try {
    console.log(question);
    const sanitizedQuestion = question.trim().replaceAll("\n", " ");
    const pineconeClient = await getPineconeClient();

    const vectorStore = await getVectorStore(pineconeClient);

    const retriever = vectorStore.asRetriever({
      k: 6,
      searchType: "similarity",
    });

    const customRagPrompt = PromptTemplate.fromTemplate(QA_TEMPLATE);

    const ragChain = await createStuffDocumentsChain({
      llm: streamingModel,
      prompt: customRagPrompt,
      outputParser: new StringOutputParser(),
    });

    const context = await retriever.invoke(sanitizedQuestion);

    const response = ragChain.invoke({
      question: sanitizedQuestion,
      context,
    });
    console.log("ahahahahahaah =====>", response);

    return response;
  } catch (error) {
    console.log("error", error);
    throw new Error("something went wrong generating LLM response");
  }
};
