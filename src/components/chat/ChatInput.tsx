
import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SendIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

const ChatInput = ({ onSendMessage, disabled }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje..."
        className="flex-1 py-6 bg-transparent border-0 border-t border-border focus-visible:ring-0 focus-visible:ring-offset-0 rounded-lg"
        disabled={disabled}
      />
      <motion.div
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          type="submit" 
          size="icon" 
          disabled={!message.trim() || disabled}
          className="rounded-full aspect-square"
        >
          <SendIcon className="h-5 w-5" />
        </Button>
      </motion.div>
    </form>
  );
};

export default ChatInput;
