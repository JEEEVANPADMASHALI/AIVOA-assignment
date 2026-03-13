import { useState, useRef, useEffect } from 'react';

const AIAssistantChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. I can help you with insights about HCP interactions, analyze trends, and answer questions about your CRM data. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputMessage.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError('');

    try {
      // TODO: Replace with actual API call
      // const response = await axiosInstance.post('/api/ai/chat', {
      //   message: userMessage.content,
      //   history: messages
      // });

      // Simulated API response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const aiResponse = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `I received your message: "${userMessage.content}". This is a simulated response. Connect this to your AI backend to get real responses.`,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (err) {
      setError('Failed to get response from AI assistant. Please try again.');
      console.error('AI Chat error:', err);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        role: 'assistant',
        content: 'Chat cleared. How can I help you?',
        timestamp: new Date()
      }
    ]);
    setError('');
  };

  return (
    <div className="ai-assistant-chat">
      <div className="chat-header">
        <div className="header-content">
          <div className="header-title">
            <svg 
              className="ai-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <h2>AI Assistant</h2>
          </div>
          <button 
            className="clear-btn" 
            onClick={clearChat}
            title="Clear chat history"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`message ${message.role}`}
          >
            <div className="message-avatar">
              {message.role === 'assistant' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              )}
            </div>
            <div className="message-content">
              <div className="message-text">{message.content}</div>
              <div className="message-time">{formatTime(message.timestamp)}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message assistant">
            <div className="message-avatar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/>
              </svg>
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {error && (
        <div className="chat-error">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </div>
      )}

      <form className="chat-input-form" onSubmit={handleSubmit}>
        <div className="input-wrapper">
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about HCP interactions..."
            rows="1"
            disabled={isLoading}
          />
          <button 
            type="submit" 
            disabled={isLoading || !inputMessage.trim()}
            className="send-btn"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </button>
        </div>
      </form>

      <style jsx>{`
        .ai-assistant-chat {
          display: flex;
          flex-direction: column;
          height: 600px;
          max-width: 800px;
          margin: 0 auto;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .chat-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .ai-icon {
          width: 28px;
          height: 28px;
          color: white;
        }

        .chat-header h2 {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .clear-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }

        .clear-btn:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .clear-btn svg {
          width: 18px;
          height: 18px;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1.5rem;
          background: #f8f9fa;
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .message {
          display: flex;
          gap: 0.75rem;
          animation: fadeIn 0.3s ease-in;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .message.user {
          flex-direction: row-reverse;
        }

        .message-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .message.assistant .message-avatar {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
        }

        .message.user .message-avatar {
          background: #4a90e2;
          color: white;
        }

        .message-avatar svg {
          width: 20px;
          height: 20px;
        }

        .message-content {
          flex: 1;
          max-width: 70%;
        }

        .message.user .message-content {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
        }

        .message-text {
          padding: 0.875rem 1rem;
          border-radius: 12px;
          line-height: 1.5;
          word-wrap: break-word;
        }

        .message.assistant .message-text {
          background: white;
          color: #333;
          border-bottom-left-radius: 4px;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }

        .message.user .message-text {
          background: #4a90e2;
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message-time {
          font-size: 0.75rem;
          color: #999;
          margin-top: 0.375rem;
          padding: 0 0.25rem;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 1rem;
          background: white;
          border-radius: 12px;
          border-bottom-left-radius: 4px;
          width: fit-content;
        }

        .typing-indicator span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #999;
          animation: bounce 1.4s infinite ease-in-out;
        }

        .typing-indicator span:nth-child(1) {
          animation-delay: -0.32s;
        }

        .typing-indicator span:nth-child(2) {
          animation-delay: -0.16s;
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          40% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .chat-error {
          background: #fee;
          color: #c33;
          padding: 0.75rem 1rem;
          margin: 0 1rem;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.875rem;
        }

        .chat-error svg {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .chat-input-form {
          padding: 1rem 1.5rem;
          background: white;
          border-top: 1px solid #e5e7eb;
        }

        .input-wrapper {
          display: flex;
          gap: 0.75rem;
          align-items: flex-end;
        }

        .input-wrapper textarea {
          flex: 1;
          padding: 0.75rem 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 0.95rem;
          font-family: inherit;
          resize: none;
          max-height: 120px;
          transition: border-color 0.2s;
        }

        .input-wrapper textarea:focus {
          outline: none;
          border-color: #667eea;
        }

        .input-wrapper textarea:disabled {
          background: #f5f5f5;
          cursor: not-allowed;
        }

        .send-btn {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s, opacity 0.2s;
          flex-shrink: 0;
        }

        .send-btn:hover:not(:disabled) {
          transform: scale(1.05);
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .send-btn svg {
          width: 20px;
          height: 20px;
        }

        @media (max-width: 768px) {
          .ai-assistant-chat {
            height: 100vh;
            max-width: 100%;
            border-radius: 0;
          }

          .message-content {
            max-width: 80%;
          }

          .chat-header {
            padding: 1rem;
          }

          .chat-messages {
            padding: 1rem;
          }

          .chat-input-form {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AIAssistantChat;
