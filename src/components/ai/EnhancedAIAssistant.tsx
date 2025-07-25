import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Mic, X, Bot, User, FileText, Calendar, Mail, Search, BrainCircuit } from 'lucide-react';
import { blink } from '../../blink/client';

interface ExecutiveAICopilotProps {
  activeTab: string;
}

const ExecutiveAICopilot: React.FC<ExecutiveAICopilotProps> = ({ activeTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getContextualPrompt = () => {
    switch (activeTab) {
      case 'Dashboard':
        return 'Summarize the latest AI trends for executives.';
      case 'Training':
        return 'Which training module is best for understanding AI ethics?';
      case 'Companies':
        return 'Compare the top 3 AI platform companies.';
      case 'Advisory':
        return 'Find me an advisor specializing in AI for finance.';
      case 'Jobs':
        return 'What are the most sought-after AI roles right now?';
      case 'Events':
        return 'Are there any upcoming AI governance workshops?';
      case 'Forum':
        return 'What are the most active discussions this week?';
      case 'News':
        return 'What is the latest news on generative AI regulation?';
      default:
        return 'How can I leverage AI for my business?';
    }
  };

  const contextualSuggestions = [
    { icon: <FileText size={18} />, text: 'Summarize recent AI news' },
    { icon: <Calendar size={18} />, text: 'Find relevant upcoming events' },
    { icon: <Search size={18} />, text: "Analyze a company's AI strategy" },
    { icon: <Mail size={18} />, text: 'Draft an email to my team' },
  ];

  useEffect(() => {
    if (isOpen) {
      setMessages([
        {
          role: 'assistant',
          content: `Welcome to your Executive AI Copilot. I can help you with strategic insights, data analysis, and platform actions. How can I assist you today?`,
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    const userMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const stream = await blink.ai.streamText({
        model: 'gpt-4.1-mini',
        messages: [...messages, userMessage],
      });

      let assistantResponse = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      for await (const chunk of stream) {
        assistantResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = assistantResponse;
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Error streaming AI response:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'I seem to be having trouble connecting. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-br from-gray-900 to-gray-700 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 z-[100]"
        aria-label="Open AI Copilot"
      >
        <Sparkles size={28} />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-8 right-8 bg-gray-900 text-white rounded-2xl shadow-2xl transition-all duration-500 ease-in-out z-[100] ${isExpanded ? 'w-[600px] h-[700px]' : 'w-96 h-auto'}`}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-gray-800 rounded-t-2xl cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center space-x-3">
          <Sparkles className="text-yellow-400" />
          <h3 className="font-semibold text-lg">Executive AI Copilot</h3>
        </div>
        <button onClick={(e) => { e.stopPropagation(); setIsOpen(false); }} className="p-1 text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="p-4 h-[calc(100%-150px)] overflow-y-auto" ref={messagesEndRef}>
        <div className="space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-start space-x-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && <Bot size={24} className="flex-shrink-0 text-yellow-400" />}
              <div className={`px-4 py-3 rounded-2xl max-w-md ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-800 text-gray-300 rounded-bl-none'}`}>
                <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
              </div>
              {msg.role === 'user' && <User size={24} className="flex-shrink-0 text-gray-400" />}
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start space-x-3">
              <Bot size={24} className="flex-shrink-0 text-yellow-400" />
              <div className="px-4 py-3 rounded-2xl bg-gray-800 text-gray-300 rounded-bl-none">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-150"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-300"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-gray-800 rounded-b-2xl absolute bottom-0 w-full">
        {messages.length <= 1 && (
          <div className="grid grid-cols-2 gap-2 mb-3">
            {contextualSuggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(suggestion.text)}
                className="flex items-center space-x-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-left text-xs text-gray-300 transition-colors"
              >
                {suggestion.icon}
                <span>{suggestion.text}</span>
              </button>
            ))}
          </div>
        )}
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="Ask a strategic question..."
            className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-full py-3 pl-5 pr-20 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
            <button className="p-2 text-gray-400 hover:text-white">
              <Mic size={18} />
            </button>
            <button
              onClick={() => handleSendMessage(inputValue)}
              className="p-2 bg-yellow-400 text-gray-900 rounded-full hover:bg-yellow-300 disabled:bg-gray-600"
              disabled={isLoading || !inputValue.trim()}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveAICopilot;
