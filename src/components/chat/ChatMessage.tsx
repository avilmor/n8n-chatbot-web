
import { ChatMessage as ChatMessageType } from "../../services/chatService";
import { cn } from "../../lib/utils";
import { motion } from "framer-motion";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === 'user';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.3, 
        ease: [0.4, 0, 0.2, 1] 
      }}
      className={cn(
        "chat-message",
        isUser ? "user-message" : "bot-message"
      )}
    >
      <p className="whitespace-pre-wrap break-words">{message.content}</p>
    </motion.div>
  );
};

export default ChatMessage;
