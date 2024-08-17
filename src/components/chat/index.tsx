"use client";
import ChatBubble from "../chatBubble";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Message } from "ai/react";
import { useChat } from "@ai-sdk/react";
import Spinner from "../spinner";

const Chat = () => {
  const initialMessages: Message[] = [
    { role: "assistant", content: "Hey I am your AI", id: "1" },
  ];

  const sources = ["I am source 1", "I am source 2"];

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      initialMessages,
    });

  return (
    <div className="rounded-2xl border h-[75vh] flex flex-col justify-between">
      <div className="p-6 overflow-auto">
        {messages.map(({ id, role, content }: Message) => (
          <ChatBubble key={id} role={role} content={content} sources={[]} />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="p-4 flex clear-both">
        <Input
          placeholder={"Type to chat with AI..."}
          className="mr-2"
          value={input}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          className="w-24 cursor-pointer"
          disabled={isLoading || !input.length}
        >
          {isLoading ? <Spinner /> : "Ask"}
        </Button>
      </form>
    </div>
  );
};

export default Chat;
