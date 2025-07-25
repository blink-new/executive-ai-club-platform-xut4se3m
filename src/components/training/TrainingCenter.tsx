import React, { useState } from 'react'
import { Play, MessageCircle, BookOpen, Clock, Star, ChevronRight } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'

const TrainingCenter = () => {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [chatMessages, setChatMessages] = useState([
    { id: 1, type: 'ai', message: 'Welcome to AI Training! I\'m here to help you understand the concepts. What would you like to learn about?' }
  ])
  const [newMessage, setNewMessage] = useState('')

  const trainingModules = [
    {
      id: 1,
      title: 'AI Strategy for Executives',
      duration: '45 min',
      level: 'Executive',
      videoId: 'dQw4w9WgXcQ',
      description: 'Learn how to implement AI strategy at the C-level',
      progress: 75,
      instructor: 'Dr. Sarah Chen',
      rating: 4.9
    },
    {
      id: 2,
      title: 'Machine Learning ROI Analysis',
      duration: '32 min',
      level: 'Advanced',
      videoId: 'dQw4w9WgXcQ',
      description: 'Calculate and measure ML project returns',
      progress: 0,
      instructor: 'Prof. Michael Torres',
      rating: 4.8
    },
    {
      id: 3,
      title: 'AI Ethics & Governance',
      duration: '28 min',
      level: 'Essential',
      videoId: 'dQw4w9WgXcQ',
      description: 'Navigate AI ethics in corporate environments',
      progress: 100,
      instructor: 'Dr. Lisa Wang',
      rating: 5.0
    }
  ]

  const sendMessage = () => {
    if (!newMessage.trim()) return
    
    const userMessage = { id: Date.now(), type: 'user', message: newMessage }
    setChatMessages(prev => [...prev, userMessage])
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { 
        id: Date.now() + 1, 
        type: 'ai', 
        message: 'That\'s a great question! Let me help you understand that concept better. Based on the current video, here are the key points...' 
      }
      setChatMessages(prev => [...prev, aiResponse])
    }, 1000)
    
    setNewMessage('')
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Training Center</h1>
          <p className="text-gray-600 mt-1">Master AI with expert-led training and AI assistance</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-2">
            Premium Access
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Training Modules */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Modules</h2>
          
          {trainingModules.map((module) => (
            <Card 
              key={module.id}
              className="p-6 cursor-pointer transition-all duration-300 hover:shadow-lg border-0 bg-gray-50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)] hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.7),inset_1px_1px_3px_rgba(0,0,0,0.15)]"
              onClick={() => setSelectedVideo(module)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)]">
                      <Play className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{module.title}</h3>
                      <p className="text-sm text-gray-600">{module.instructor}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-3">{module.description}</p>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{module.duration}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {module.level}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400 fill-current" />
                      <span className="text-sm text-gray-600">{module.rating}</span>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.15)]">
                    <div 
                      className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${module.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{module.progress}% Complete</p>
                </div>
                
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Card>
          ))}
        </div>

        {/* AI Assistant Chat */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">AI Training Assistant</h2>
          
          <Card className="h-96 flex flex-col border-0 bg-gray-50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {chatMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg ${
                    msg.type === 'user' 
                      ? 'bg-blue-500 text-white shadow-[2px_2px_6px_rgba(0,0,0,0.15),-1px_-1px_3px_rgba(255,255,255,0.1)]' 
                      : 'bg-white shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)] border border-amber-200'
                  }`}>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Chat Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Ask about the training..."
                  className="flex-1 px-3 py-2 rounded-lg border-0 bg-gray-100 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15),inset_-2px_-2px_6px_rgba(255,255,255,0.7)] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                />
                <Button 
                  onClick={sendMessage}
                  className="bg-blue-500 hover:bg-blue-600 shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)] hover:shadow-[1px_1px_3px_rgba(0,0,0,0.15),-1px_-1px_3px_rgba(255,255,255,0.7)]"
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-50 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-[4px_4px_12px_rgba(0,0,0,0.25),-4px_-4px_12px_rgba(255,255,255,0.7)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{selectedVideo.title}</h3>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedVideo(null)}
                className="shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)]"
              >
                ✕
              </Button>
            </div>
            
            <div className="aspect-video mb-4 rounded-xl overflow-hidden shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15),inset_-2px_-2px_6px_rgba(255,255,255,0.7)]">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span>Instructor: {selectedVideo.instructor}</span>
              <span>Duration: {selectedVideo.duration}</span>
              <span>Level: {selectedVideo.level}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TrainingCenter