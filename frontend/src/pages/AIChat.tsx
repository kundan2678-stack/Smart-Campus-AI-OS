import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './AIChat.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChat: React.FC = () => {
  const user = useSelector((state: any) => state.auth.user);
  const token = useSelector((state: any) => state.auth.token);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [agentType, setAgentType] = useState('academic_advisor');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/ai/chat',
        {
          message: input,
          agentType,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.data.agentResponse || 'AI response received',
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const agentOptions = [
    { value: 'academic_advisor', label: '🎓 Academic Advisor' },
    { value: 'placement_mentor', label: '👨‍💼 Placement Mentor' },
    { value: 'study_planner', label: '📚 Study Planner' },
    { value: 'dsa_mentor', label: '🧮 DSA Mentor' },
    { value: 'wellness', label: '🧑‍⚕️ Wellness' },
  ];

  return (
    <div className="ai-chat">
      <h2>🤖 AI Assistant</h2>

      <div className="chat-container">
        <div className="agent-selector">
          <label>Select AI Agent:</label>
          <select value={agentType} onChange={(e) => setAgentType(e.target.value)}>
            {agentOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="messages-container">
          {messages.length === 0 && (
            <div className="welcome-message">
              <p>👋 Hello, {user?.firstName}!</p>
              <p>How can I help you today?</p>
            </div>
          )}
          {messages.map((msg) => (
            <div key={msg.id} className={`message ${msg.sender}`}>
              <div className="message-content">{msg.text}</div>
              <div className="message-time">{msg.timestamp.toLocaleTimeString()}</div>
            </div>
          ))}
          {loading && (
            <div className="message ai">
              <div className="message-content">Thinking...</div>
            </div>
          )}
        </div>

        <form onSubmit={handleSendMessage} className="input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
          />
          <button type="submit" disabled={loading || !input.trim()}>
            {loading ? '⏳' : '📤 Send'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;