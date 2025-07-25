import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, Send, X, Minimize2, Maximize2, Bot, User, Sparkles, Mic, MicOff } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { ScrollArea } from '../ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  isTyping?: boolean
}

interface AIAssistantProps {
  currentPage?: string
  contextData?: any
}

const AIAssistant: React.FC<AIAssistantProps> = ({ currentPage = 'dashboard', contextData }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hello! I'm your AI assistant for the Executive AI Club. I can help you with insights about ${currentPage}, answer questions about AI trends, suggest relevant connections, and assist with platform navigation. How can I help you today?`,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getContextualSuggestions = () => {
    switch (currentPage) {
      case 'dashboard':
        return [
          "What are the trending AI topics this week?",
          "Show me upcoming events I should attend",
          "Who are the most active members in my network?"
        ]
      case 'training':
        return [
          "Recommend courses based on my role",
          "What's the latest in AI implementation?",
          "Find training on AI governance"
        ]
      case 'companies':
        return [
          "Which AI companies are trending?",
          "Show me companies with executive discounts",
          "Compare enterprise AI platforms"
        ]
      case 'advisory':
        return [
          "Find advisors for AI strategy",
          "Book a session on AI ethics",
          "Connect me with implementation experts"
        ]
      case 'jobs':
        return [
          "Show me AI executive opportunities",
          "Find referral bonuses in my network",
          "What skills are most in demand?"
        ]
      case 'events':
        return [
          "Find AI conferences near me",
          "What events match my interests?",
          "Show me networking opportunities"
        ]
      case 'forum':
        return [
          "What are the hot discussion topics?",
          "Find experts discussing AI governance",
          "Show me trending conversations"
        ]
      case 'news':
        return [
          "Summarize today's AI news",
          "What regulatory changes should I know?",
          "Show me enterprise AI trends"
        ]
      default:
        return [
          "What's new in AI this week?",
          "Help me navigate the platform",
          "Connect me with relevant experts"
        ]
    }
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        `Based on your question about "${inputValue}", I can provide insights specific to the ${currentPage} section. Let me analyze the current trends and data...`,
        `Great question! In the context of ${currentPage}, here's what I recommend: This aligns with current AI executive best practices and industry trends.`,
        `I understand you're looking for information about "${inputValue}". From the Executive AI Club perspective, this is particularly relevant for senior leaders because...`,
        `Excellent point! This relates to several ongoing discussions in our forum and recent developments in the AI space. Let me break this down for you...`
      ]

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
  }

  const toggleListening = () => {
    setIsListening(!isListening)
    // In a real implementation, this would start/stop speech recognition
  }

  const suggestions = getContextualSuggestions()

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="neomorphic-button w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 border-2 border-amber-300 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        {/* Notification Badge */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-3 h-3 text-white" />
        </div>
      </div>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <div className="neomorphic-card bg-white rounded-2xl border-2 border-amber-200 shadow-2xl h-full flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className="w-8 h-8 neomorphic-inset">
                <AvatarImage src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=32&h=32&fit=crop" />
                <AvatarFallback>
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Assistant</h3>
              <p className="text-xs text-gray-600">Executive AI Club</p>
            </div>
            <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200 text-xs">
              {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-8 h-8 p-0 hover:bg-gray-100"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 p-0 hover:bg-gray-100"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'assistant' && (
                      <Avatar className="w-8 h-8 neomorphic-inset flex-shrink-0">
                        <AvatarFallback>
                          <Bot className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white neomorphic-button'
                          : 'bg-gray-50 text-gray-900 neomorphic-inset'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.type === 'user' && (
                      <Avatar className="w-8 h-8 neomorphic-inset flex-shrink-0">
                        <AvatarFallback>
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <Avatar className="w-8 h-8 neomorphic-inset flex-shrink-0">
                      <AvatarFallback>
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-50 text-gray-900 neomorphic-inset p-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Suggestions */}
            {messages.length <= 1 && (
              <div className="px-4 py-2 border-t border-gray-100">
                <p className="text-xs text-gray-600 mb-2">Quick suggestions:</p>
                <div className="space-y-1">
                  {suggestions.slice(0, 3).map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left text-xs p-2 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors neomorphic-inset"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything about AI..."
                    className="neomorphic-input pr-10"
                  />
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={toggleListening}
                    className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 p-0 ${
                      isListening ? 'text-red-500' : 'text-gray-400'
                    }`}
                  >
                    {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="neomorphic-button bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 w-10 h-10 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default AIAssistant