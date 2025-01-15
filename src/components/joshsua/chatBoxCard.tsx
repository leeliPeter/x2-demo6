import React from "react";
import JoshuaBall from "./joshuaBall";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import InputBox from "./inputBox";

interface Message {
  id: number;
  sender: "user" | "ai";
  content: string;
  timestamp: string;
}

export default function ChatBoxCard() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      content: "Hi! How can I help you today?",
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);

  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  // Scroll to bottom when messages change
  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Card className=" h-[700px] flex flex-col bg-gray-100">
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="h-full px-4">
          <div className="flex flex-col space-y-4 py-4">
            <div className="w-full flex flex-col gap-4 mt-2 justify-center items-center">
              <JoshuaBall size={10} />
              <p className="text-sm font-semibold text-muted-foreground">
                How can I help you today?
              </p>
            </div>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                <div
                  className={`rounded-lg p-3 max-w-[80%] ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-background"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <time className="text-xs opacity-50 mt-1 block">
                    {message.timestamp}
                  </time>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="p-2">
        <InputBox
          onSend={(content) => {
            const newMessage: Message = {
              id: messages.length + 1,
              sender: "user",
              content,
              timestamp: new Date().toLocaleTimeString(),
            };
            setMessages([...messages, newMessage]);
          }}
        />
      </CardFooter>
    </Card>
  );
}
