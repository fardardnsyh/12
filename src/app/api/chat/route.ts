import { NextResponse, NextRequest } from "next/server";
import { callChain } from "@/lib/langchain";
import { Message } from "ai";

const formatMessage = (message: Message) => {
  return `${message.role === "user" ? "Human" : "Assistant"}: ${
    message.content
  }`;
};

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const messages: Message[] = body.messages ?? [];

    const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
    const question = messages[messages.length - 1].content;

    if (!question) {
      return NextResponse.json({ message: "No message" }, { status: 400 });
    }

    const streamingResponse = await callChain({
      question,
      chatHistory: formattedPreviousMessages.join("\n"),
    });
    return NextResponse.json(streamingResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
