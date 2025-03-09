
/**
 * Service for handling chat interactions with the n8n webhook
 */
export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatResponse {
  message: string;
  success: boolean;
}

// The webhook URL for the n8n workflow
const N8N_WEBHOOK_URL = 'https://n8n-n8n.et59eq.easypanel.host/webhook/c5c905d8-055b-4df5-a20b-5d822a23a851/chat';

/**
 * Sends a message to the n8n webhook and returns the response
 */
export const sendChatMessage = async (message: string): Promise<ChatResponse> => {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chatInput: message // Send the message as chatInput as required by n8n
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      message: data.message || data.response || data.output || data.text || JSON.stringify(data),
      success: true
    };
  } catch (error) {
    console.error('Error sending message to n8n:', error);
    return {
      message: 'Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, inténtalo de nuevo más tarde.',
      success: false
    };
  }
};

/**
 * Generates a unique ID for chat messages
 */
export const generateMessageId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

/**
 * Creates a new chat message object
 */
export const createChatMessage = (
  content: string, 
  role: 'user' | 'assistant'
): ChatMessage => {
  return {
    id: generateMessageId(),
    content,
    role,
    timestamp: new Date()
  };
};
