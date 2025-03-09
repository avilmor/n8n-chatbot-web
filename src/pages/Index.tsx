
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "sonner";
import ChatContainer from "../components/chat/ChatContainer";
import ChatInput from "../components/chat/ChatInput";
import TypingIndicator from "../components/chat/TypingIndicator";
import { 
  ChatMessage, 
  createChatMessage, 
  sendChatMessage 
} from "../services/chatService";

const Index = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage = createChatMessage(content, "user");
    setMessages((prev) => [...prev, userMessage]);
    
    // Show loading state
    setLoading(true);

    try {
      // Send message to n8n webhook
      const response = await sendChatMessage(content);
      
      // Add bot response
      const botMessage = createChatMessage(
        response.message,
        "assistant"
      );
      
      // Small delay to make the typing indicator more natural
      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);
      }, 800);
      
      // Show error toast if needed
      if (!response.success) {
        toast.error("Ha ocurrido un error al procesar tu mensaje.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setLoading(false);
      toast.error("Ha ocurrido un error al enviar tu mensaje.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 sm:p-6 md:p-8">
      <div className="flex flex-col flex-1 w-full max-w-4xl mx-auto relative overflow-hidden rounded-2xl shadow-glass">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="py-4 px-6 border-b border-border bg-background/80 backdrop-blur-sm z-10"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-xl font-medium">Asistente Virtual</h1>
              <p className="text-sm text-muted-foreground">¿En qué puedo ayudarte hoy?</p>
            </div>
          </div>
        </motion.div>
        
        {/* Main chat area */}
        <div className="flex-1 overflow-hidden flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
          <ChatContainer messages={messages} loading={loading} />
          
          {/* Typing indicator */}
          <div className="px-4 relative">
            <AnimatePresence>
              {loading && <TypingIndicator />}
            </AnimatePresence>
          </div>
          
          {/* Chat input */}
          <div className="chat-input-container">
            <ChatInput onSendMessage={handleSendMessage} disabled={loading} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
