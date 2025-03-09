
import { useEffect, useRef } from "react";
import ChatMessage from "./ChatMessage";
import { ChatMessage as ChatMessageType } from "../../services/chatService";

interface ChatContainerProps {
  messages: ChatMessageType[];
  loading: boolean;
}

const ChatContainer = ({ messages, loading }: ChatContainerProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-message-container">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-center p-6">
          <div className="max-w-md space-y-4">
            <div className="space-y-2">
              <h2 className="text-2xl font-medium tracking-tight">¡Bienvenido al Chat!</h2>
              <p className="text-muted-foreground">
                ¿En qué puedo ayudarte hoy? Envía un mensaje para comenzar la conversación.
              </p>
            </div>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatContainer;
