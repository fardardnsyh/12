"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import Balancer from "react-wrap-balancer";

import { formattedText } from "@/lib/utils";
import { Message } from "ai/react";
import ReactMarkdown from "react-markdown";

interface ChatBubbleProps extends Partial<Message> {
  sources: string[];
}

const wrappedText = (text: string) =>
  text.includes("\n")
    ? text.split("\n").map((line, i) => (
        <span key={i}>
          {line} <br />
        </span>
      ))
    : [
        <span key={text}>
          {text} <br />
        </span>,
      ];

const ChatBubble: React.FC<ChatBubbleProps> = ({
  role = "assistant",
  content,
  sources,
}) => {
  if (!content) {
    return null;
  }

  const formattedMessage = wrappedText(content);

  return (
    <div>
      <Card className="mb-2">
        <CardHeader>
          <CardTitle
            className={role != "assistant" ? "text-amber-500" : "text-blue-500"}
          >
            {role === "assistant" ? "AI" : "You"}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <Balancer>{formattedMessage}</Balancer>
        </CardContent>
        <CardFooter>
          <div className="w-full !text-sm">
            {sources && sources.length ? (
              <Accordion type="single" collapsible className="w-full">
                {sources.map((source, index) => (
                  <AccordionItem value={`source-${index}`} key={index}>
                    <AccordionTrigger className="font-light">{`Source ${
                      index + 1
                    }`}</AccordionTrigger>
                    <AccordionContent>
                      <ReactMarkdown>{formattedText(source)}</ReactMarkdown>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            ) : (
              <></>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ChatBubble;
