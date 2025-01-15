import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, Paperclip, ArrowRight } from "lucide-react";

interface InputBoxProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  buttonDisabled?: boolean;
}

export default function InputBox({
  onSend,
  disabled,
  buttonDisabled,
}: InputBoxProps) {
  const [input, setInput] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (input.trim()) {
      onSend(input.trim());
      setInput("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!buttonDisabled && input.trim()) {
        handleSend();
      }
    }
  };

  const adjustHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;
    textarea.style.height = "auto";
    const scrollHeight = textarea.scrollHeight;

    // Limit max height to 120px for better UX
    if (scrollHeight > 120) {
      textarea.style.height = "120px";
      textarea.style.overflowY = "auto";
    } else {
      textarea.style.height = `${scrollHeight}px`;
      textarea.style.overflowY = "hidden";
    }

    setInput(textarea.value);
  };

  return (
    <div className="flex rounded-md flex-col w-full gap-2 relative bg-background p-2">
      <Textarea
        ref={textareaRef}
        placeholder={
          disabled ? "Please wait for AI response..." : "Type a message..."
        }
        value={input}
        onChange={adjustHeight}
        onKeyDown={handleKeyDown}
        className="min-h-[20px] max-h-[120px] shadow-none bg-background rounded-md border-none focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 resize-none [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full"
        disabled={disabled}
      />
      <div className="flex flex-row justify-between w-[95%] mx-auto">
        <Button
          size="icon"
          className="shrink-0 -rotate-45 rounded-full w-8 h-8"
        >
          <Paperclip />
        </Button>
        <div className="flex flex-row gap-2">
          <Button size="icon" className="shrink-0 rounded-full w-8 h-8">
            <Mic className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            className="bg-foreground rounded-full w-8 h-8"
            onClick={handleSend}
            disabled={!input.trim() || buttonDisabled}
          >
            <ArrowRight className="h-10 w-10" />
          </Button>
        </div>
      </div>
    </div>
  );
}
