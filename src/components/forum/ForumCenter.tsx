import React, { useState } from 'react'
import { MessageSquare, ThumbsUp, ThumbsDown, Reply, Search, Filter, Plus, Pin, Star, Clock, User, Eye } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Textarea } from '../ui/textarea'

const ForumCenter = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewPost, setShowNewPost] = useState(false)

  const categories = [
    { id: 'all', label: 'All Discussions', count: 156 },
    { id: 'strategy', label: 'AI Strategy', count: 45 },
    { id: 'implementation', label: 'Implementation', count: 38 },
    { id: 'governance', label: 'Governance & Ethics', count: 29 },
    { id: 'tools', label: 'Tools & Platforms', count: 32 },
    { id: 'networking', label: 'Networking', count: 12 }
  ]

  const discussions = [
    {
      id: 1,
      title: "Best practices for AI governance in large enterprises",
      content: "Looking for insights on establishing AI governance frameworks that scale across multiple business units...",
      author: {
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
        title: "Chief AI Officer",
        company: "TechCorp",
        verified: true
      },
      category: "governance",
      isPinned: true,
      isHot: true,
      createdAt: "2024-01-20T10:30:00Z",
      replies: 23,
      views: 456,
      likes: 34,
      dislikes: 2,
      tags: ["governance", "enterprise", "framework", "best-practices"]
    },
    {
      id: 2,
      title: "ROI measurement strategies for AI initiatives",
      content: "How are you measuring the return on investment for your AI projects? Looking for practical frameworks and metrics...",
      author: {
        name: "Marcus Rodriguez",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
        title: "VP of Innovation",
        company: "InnovateCorp",
        verified: true
      },
      category: "strategy",
      isPinned: false,
      isHot: true,
      createdAt: "2024-01-19T14:15:00Z",
      replies: 18,
      views: 289,
      likes: 28,
      dislikes: 1,
      tags: ["roi", "metrics", "strategy", "measurement"]
    },
    {
      id: 3,
      title: "Ethical considerations in AI decision-making systems",
      content: "Discussing the ethical implications of automated decision-making in HR, finance, and customer service...",
      author: {
        name: "Dr. Amanda Foster",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        title: "Head of AI Ethics",
        company: "EthiTech",
        verified: true
      },
      category: "governance",
      isPinned: false,
      isHot: false,
      createdAt: "2024-01-18T09:45:00Z",
      replies: 31,
      views: 567,
      likes: 42,
      dislikes: 3,
      tags: ["ethics", "decision-making", "automation", "responsibility"]
    },
    {
      id: 4,
      title: "Comparing enterprise AI platforms: Azure vs AWS vs GCP",
      content: "Looking for real-world experiences with different cloud AI platforms. What are the pros and cons?",
      author: {
        name: "James Mitchell",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        title: "CTO",
        company: "CloudFirst",
        verified: false
      },
      category: "tools",
      isPinned: false,
      isHot: false,
      createdAt: "2024-01-17T16:20:00Z",
      replies: 15,
      views: 234,
      likes: 19,
      dislikes: 0,
      tags: ["platforms", "cloud", "comparison", "enterprise"]
    }
  ]

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         discussion.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesCategory && matchesSearch
  })

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    return date.toLocaleDateString()
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strategy': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'implementation': return 'bg-green-100 text-green-800 border-green-200'
      case 'governance': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'tools': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'networking': return 'bg-pink-100 text-pink-800 border-pink-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Executive Forum</h1>
          <p className="text-gray-600 mt-1">Connect, discuss, and share insights with fellow AI executives</p>
        </div>
        <Button 
          onClick={() => setShowNewPost(!showNewPost)}
          className="neomorphic-button bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 border-2 border-amber-300"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Discussion
        </Button>
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <div className="neomorphic-card bg-white p-6 rounded-2xl border-2 border-amber-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Start a New Discussion</h3>
          <div className="space-y-4">
            <Input 
              placeholder="Discussion title..."
              className="neomorphic-input"
            />
            <Textarea 
              placeholder="Share your thoughts, questions, or insights..."
              className="neomorphic-input min-h-[120px]"
            />
            <div className="flex flex-wrap gap-2">
              <Input 
                placeholder="Add tags (comma separated)"
                className="neomorphic-input flex-1"
              />
            </div>
            <div className="flex gap-3">
              <Button className="neomorphic-button bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700">
                Post Discussion
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowNewPost(false)}
                className="neomorphic-button bg-gray-50 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Categories */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search discussions, topics, or authors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="neomorphic-input pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`neomorphic-button whitespace-nowrap ${
                selectedCategory === category.id 
                  ? 'bg-blue-500 text-white border-amber-300' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {category.label} ({category.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Discussions List */}
      <div className="space-y-4">
        {filteredDiscussions.map((discussion) => (
          <div key={discussion.id} className="neomorphic-card bg-white p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-amber-200">
            <div className="flex gap-4">
              {/* Author Avatar */}
              <div className="flex-shrink-0">
                <Avatar className="w-12 h-12 neomorphic-inset">
                  <AvatarImage src={discussion.author.avatar} alt={discussion.author.name} />
                  <AvatarFallback>{discussion.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              </div>

              {/* Discussion Content */}
              <div className="flex-1 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {discussion.isPinned && <Pin className="w-4 h-4 text-amber-500" />}
                      {discussion.isHot && <Star className="w-4 h-4 text-red-500" />}
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer">
                        {discussion.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="font-medium">{discussion.author.name}</span>
                      {discussion.author.verified && <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-xs">Verified</Badge>}
                      <span>•</span>
                      <span>{discussion.author.title} at {discussion.author.company}</span>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {formatTimeAgo(discussion.createdAt)}
                      </div>
                    </div>
                  </div>
                  <Badge className={`${getCategoryColor(discussion.category)} border`}>
                    {discussion.category.charAt(0).toUpperCase() + discussion.category.slice(1)}
                  </Badge>
                </div>

                {/* Content */}
                <p className="text-gray-700 line-clamp-2">{discussion.content}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {discussion.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-gray-50 border-gray-200">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Stats and Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {discussion.replies} replies
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {discussion.views} views
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                        <ThumbsUp className="w-4 h-4" />
                        {discussion.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-red-600 transition-colors">
                        <ThumbsDown className="w-4 h-4" />
                        {discussion.dislikes}
                      </button>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="neomorphic-button bg-gray-50 text-gray-700 hover:bg-gray-100"
                  >
                    <Reply className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDiscussions.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No discussions found</h3>
          <p className="text-gray-600">Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  )
}

export default ForumCenter