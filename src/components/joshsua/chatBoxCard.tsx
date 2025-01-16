import React from "react";
import JoshuaBall from "./joshuaBall";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import InputBox from "./inputBox";
import FakeResponce from "./fakeResponce";
import { useSelector, useDispatch } from "react-redux";
import { setPendingMessage } from "@/redux/features/chatSlice";
import type { RootState } from "@/redux/store";

interface Message {
  id: number;
  sender: "user" | "ai";
  content: string;
  timestamp: string;
  isTyping?: boolean;
  isPromptResponse?: boolean;
}

const aiResponses = [
  "Based on my analysis, this appears to be a significant trend in the market. The data shows a 23% increase in adoption rates over the last quarter.",
  "I've reviewed the documentation, and I can confirm that the implementation follows best practices. However, there might be room for optimization in terms of performance.",
  "The financial metrics indicate a positive trajectory, with a compound annual growth rate of 15.7% over the past three years.",
  "From a technical perspective, the architecture seems robust. The microservices approach allows for better scalability and maintenance.",
  "Looking at the historical data, there's a clear correlation between these variables. The Pearson coefficient is approximately 0.82.",
  "I've identified several key factors that contribute to this outcome. The most significant ones are market dynamics and technological innovation.",
  "The research suggests that this approach could reduce operational costs by up to 35% while maintaining quality standards.",
  "Based on current trends and predictive modeling, we can expect continued growth in this sector for the next 18-24 months.",
  "The comparative analysis shows that this solution outperforms alternatives in terms of efficiency and cost-effectiveness.",
  "I've examined the use cases, and this approach aligns well with industry best practices while offering flexibility for future scaling.",
];

export default function ChatBoxCard() {
  const dispatch = useDispatch();
  const pendingMessage = useSelector(
    (state: RootState) => state.chat.pendingMessage
  );

  const lastMessageId = React.useRef(1);
  const [isAiResponding, setIsAiResponding] = React.useState(false);

  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: lastMessageId.current,
      sender: "ai",
      content: "Hi! How can I help you today?",
      timestamp: new Date().toLocaleTimeString(),
      isPromptResponse: false,
    },
  ]);

  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const typingSpeed = 50; // milliseconds per word

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

  const generateAIResponse = () => {
    const randomIndex = Math.floor(Math.random() * aiResponses.length);
    return aiResponses[randomIndex];
  };

  const typeMessage = (fullMessage: string, messageId: number) => {
    const words = fullMessage.split(" ");
    let currentWordIndex = 0;

    const typingInterval = setInterval(() => {
      if (currentWordIndex <= words.length) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === messageId
              ? {
                  ...msg,
                  content: words.slice(0, currentWordIndex).join(" "),
                  isTyping: currentWordIndex < words.length,
                }
              : msg
          )
        );
        currentWordIndex++;
        scrollToBottom();
      } else {
        clearInterval(typingInterval);
      }
    }, typingSpeed);
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewMessage = React.useCallback((message: string) => {
    if (isAiResponding) return;

    const isPrompt =
      message.toLowerCase().includes("prompt") ||
      message.toLowerCase().includes("system") ||
      message.toLowerCase().includes("指令");

    const userMessage: Message = {
      id: ++lastMessageId.current,
      sender: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString(),
      isPromptResponse: false,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsAiResponding(true);

    setTimeout(() => {
      const aiResponse = generateAIResponse();
      const aiMessageId = ++lastMessageId.current;

      setMessages((prev) => [
        ...prev,
        {
          id: aiMessageId,
          sender: "ai",
          content: aiResponse,
          timestamp: new Date().toLocaleTimeString(),
          isTyping: true,
          isPromptResponse: isPrompt,
        },
      ]);

      if (!isPrompt) {
        typeMessage(aiResponse, aiMessageId);
        setTimeout(() => {
          setIsAiResponding(false);
        }, (aiResponse.split(" ").length + 1) * typingSpeed);
      } else {
        setIsAiResponding(false);
      }
    }, 1000);
  }, []);

  React.useEffect(() => {
    if (pendingMessage) {
      handleNewMessage(pendingMessage);
      dispatch(setPendingMessage(null));
    }
  }, [pendingMessage, dispatch, handleNewMessage]);

  return (
    <Card className=" h-[670px] flex flex-col bg-gray-100">
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="h-full px-4">
          <div className="flex flex-col space-y-4 py-4">
            <div className="w-full flex flex-col gap-6 mt-2 justify-center items-center">
              <JoshuaBall size={15} />
              <p className="text-base font-semibold text-muted-foreground">
                Test : try to input &quot;prompt&quot; or any word.
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
                  className={`rounded-lg p-3 max-w-[90%] ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-background"
                  }`}
                >
                  {message.isPromptResponse ? (
                    <FakeResponce />
                  ) : (
                    <p className="text-sm">
                      {message.content}
                      {message.isTyping && "▊"}
                    </p>
                  )}
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
          onSend={handleNewMessage}
          disabled={false}
          buttonDisabled={isAiResponding}
        />
      </CardFooter>
    </Card>
  );
}
