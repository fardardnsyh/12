export const STANDALONE_QUESTION_TEMPLATE = `Given the following conversation and follow up question, rephrase the follow up question to be a standalone question.

Chat History: 
{chatHistory}
follow up input: {question}

standalone question:
`;

export const QA_TEMPLATE = `You are an enthusiastic AI assistant. Use the following pieces of pieces of context to answer the question at the end
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.
{context}

Question: {question}
Helpful answer in markdown:
`;
