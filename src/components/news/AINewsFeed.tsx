import React, { useState } from 'react'
import { Newspaper, TrendingUp, Clock, ExternalLink, Settings, Filter, Search, Bookmark, Share2, Eye } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'
import { Switch } from '../ui/switch'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const AINewsFeed = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSources, setSelectedSources] = useState(['all'])
  const [selectedCategories, setSelectedCategories] = useState(['all'])
  const [showSettings, setShowSettings] = useState(false)

  const sources = [
    { id: 'all', label: 'All Sources', enabled: true },
    { id: 'techcrunch', label: 'TechCrunch', enabled: true },
    { id: 'wired', label: 'Wired', enabled: true },
    { id: 'mit-review', label: 'MIT Technology Review', enabled: true },
    { id: 'ai-news', label: 'AI News', enabled: false },
    { id: 'venturebeat', label: 'VentureBeat', enabled: true },
    { id: 'reuters', label: 'Reuters Tech', enabled: false }
  ]

  const categories = [
    { id: 'all', label: 'All Categories', enabled: true },
    { id: 'enterprise', label: 'Enterprise AI', enabled: true },
    { id: 'research', label: 'Research & Development', enabled: true },
    { id: 'regulation', label: 'Regulation & Policy', enabled: true },
    { id: 'funding', label: 'Funding & Investments', enabled: false },
    { id: 'products', label: 'Product Launches', enabled: true },
    { id: 'ethics', label: 'AI Ethics', enabled: false }
  ]

  const newsArticles = [
    {
      id: 1,
      title: "OpenAI Announces GPT-5 with Revolutionary Reasoning Capabilities",
      summary: "The latest iteration promises significant improvements in logical reasoning and multi-step problem solving for enterprise applications.",
      source: "TechCrunch",
      category: "products",
      publishedAt: "2024-01-20T08:30:00Z",
      readTime: "4 min read",
      trending: true,
      views: 12500,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=200&fit=crop",
      url: "https://techcrunch.com/gpt5-announcement",
      tags: ["OpenAI", "GPT-5", "Enterprise", "Reasoning"]
    },
    {
      id: 2,
      title: "EU AI Act Implementation: What Executives Need to Know",
      summary: "Comprehensive guide to compliance requirements and timeline for the European Union's landmark AI regulation.",
      source: "MIT Technology Review",
      category: "regulation",
      publishedAt: "2024-01-19T14:15:00Z",
      readTime: "8 min read",
      trending: false,
      views: 8900,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=200&fit=crop",
      url: "https://technologyreview.com/eu-ai-act",
      tags: ["EU", "Regulation", "Compliance", "Policy"]
    },
    {
      id: 3,
      title: "Microsoft's $10B Investment in AI Infrastructure Pays Off",
      summary: "Quarterly earnings show significant returns from AI investments, with Azure AI services driving growth.",
      source: "Reuters Tech",
      category: "enterprise",
      publishedAt: "2024-01-19T10:45:00Z",
      readTime: "5 min read",
      trending: true,
      views: 15600,
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop",
      url: "https://reuters.com/microsoft-ai-investment",
      tags: ["Microsoft", "Investment", "Azure", "Enterprise"]
    },
    {
      id: 4,
      title: "Stanford Research: AI Bias in Hiring Algorithms",
      summary: "New study reveals persistent bias issues in AI-powered recruitment tools used by Fortune 500 companies.",
      source: "Wired",
      category: "research",
      publishedAt: "2024-01-18T16:20:00Z",
      readTime: "6 min read",
      trending: false,
      views: 7200,
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop",
      url: "https://wired.com/ai-hiring-bias-study",
      tags: ["Stanford", "Bias", "Hiring", "Research"]
    },
    {
      id: 5,
      title: "Google's Gemini Ultra Outperforms GPT-4 in Enterprise Benchmarks",
      summary: "Latest benchmarks show Google's flagship model excelling in business-critical tasks and reasoning challenges.",
      source: "VentureBeat",
      category: "products",
      publishedAt: "2024-01-18T09:30:00Z",
      readTime: "7 min read",
      trending: true,
      views: 11300,
      image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=400&h=200&fit=crop",
      url: "https://venturebeat.com/gemini-ultra-benchmarks",
      tags: ["Google", "Gemini", "Benchmarks", "Enterprise"]
    }
  ]

  const filteredArticles = newsArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesSource = selectedSources.includes('all') || selectedSources.includes(article.source.toLowerCase().replace(/\s+/g, '-'))
    const matchesCategory = selectedCategories.includes('all') || selectedCategories.includes(article.category)
    
    return matchesSearch && matchesSource && matchesCategory
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
      case 'enterprise': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'research': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'regulation': return 'bg-red-100 text-red-800 border-red-200'
      case 'funding': return 'bg-green-100 text-green-800 border-green-200'
      case 'products': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'ethics': return 'bg-pink-100 text-pink-800 border-pink-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI News Feed</h1>
          <p className="text-gray-600 mt-1">Stay updated with the latest AI developments and industry insights</p>
        </div>
        <Button 
          onClick={() => setShowSettings(!showSettings)}
          variant="outline"
          className="neomorphic-button bg-gray-50 text-gray-700 hover:bg-gray-100 border-2 border-amber-300"
        >
          <Settings className="w-4 h-4 mr-2" />
          Customize Feed
        </Button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <Card className="neomorphic-card border-2 border-amber-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Feed Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Sources */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">News Sources</h4>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {sources.map((source) => (
                  <div key={source.id} className="flex items-center justify-between p-3 neomorphic-inset rounded-lg">
                    <span className="text-sm font-medium">{source.label}</span>
                    <Switch checked={source.enabled} />
                  </div>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center justify-between p-3 neomorphic-inset rounded-lg">
                    <span className="text-sm font-medium">{category.label}</span>
                    <Switch checked={category.enabled} />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button className="neomorphic-button bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700">
                Save Preferences
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowSettings(false)}
                className="neomorphic-button bg-gray-50 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search news articles, topics, or companies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="neomorphic-input pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="neomorphic-button bg-gray-50 text-gray-700 hover:bg-gray-100"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending
          </Button>
          <Button
            variant="outline"
            className="neomorphic-button bg-gray-50 text-gray-700 hover:bg-gray-100"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* News Articles */}
      <div className="space-y-6">
        {filteredArticles.map((article) => (
          <div key={article.id} className="neomorphic-card bg-white p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-amber-200">
            <div className="flex gap-6">
              {/* Article Image */}
              <div className="flex-shrink-0 w-48 h-32 rounded-xl overflow-hidden neomorphic-inset">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Content */}
              <div className="flex-1 space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {article.trending && (
                        <Badge className="bg-gradient-to-r from-red-100 to-orange-100 text-red-800 border-red-200">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                      <Badge className={`${getCategoryColor(article.category)} border`}>
                        {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 cursor-pointer line-clamp-2">
                      {article.title}
                    </h3>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-gray-700 line-clamp-2">{article.summary}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-gray-50 border-gray-200">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                {/* Meta Info */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="font-medium">{article.source}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimeAgo(article.publishedAt)}
                    </div>
                    <span>{article.readTime}</span>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.views.toLocaleString()} views
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="neomorphic-button bg-gray-50 text-gray-700 hover:bg-gray-100"
                    >
                      <Bookmark className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="neomorphic-button bg-gray-50 text-gray-700 hover:bg-gray-100"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="neomorphic-button bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Read Full Article
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600">Try adjusting your search or feed configuration</p>
        </div>
      )}
    </div>
  )
}

export default AINewsFeed