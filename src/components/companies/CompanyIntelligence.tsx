import React, { useState } from 'react'
import { Star, TrendingUp, DollarSign, Users, Award, ExternalLink, Filter, Search } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'

const CompanyIntelligence = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const companies = [
    {
      id: 1,
      name: 'OpenAI',
      category: 'AI Platform',
      logo: '🤖',
      rating: 4.9,
      pricing: '$20-2000/month',
      employees: '500+',
      founded: 2015,
      description: 'Leading AI research company behind ChatGPT and GPT models',
      strengths: ['Cutting-edge research', 'Strong API ecosystem', 'Enterprise support'],
      weaknesses: ['High costs at scale', 'Rate limiting'],
      useCase: 'Natural language processing, content generation, coding assistance',
      discount: '15% off Enterprise plans',
      hasDiscount: true,
      trend: 'up',
      marketCap: '$80B',
      aiScore: 95
    },
    {
      id: 2,
      name: 'Anthropic',
      category: 'AI Platform',
      logo: '🧠',
      rating: 4.8,
      pricing: '$15-1500/month',
      employees: '300+',
      founded: 2021,
      description: 'AI safety focused company with Claude AI assistant',
      strengths: ['Safety-first approach', 'Constitutional AI', 'Reliable outputs'],
      weaknesses: ['Smaller model selection', 'Limited integrations'],
      useCase: 'Safe AI applications, research, content analysis',
      discount: '20% off first 6 months',
      hasDiscount: true,
      trend: 'up',
      marketCap: '$15B',
      aiScore: 92
    },
    {
      id: 3,
      name: 'Databricks',
      category: 'Data Platform',
      logo: '📊',
      rating: 4.7,
      pricing: '$0.40-2.00/DBU',
      employees: '4000+',
      founded: 2013,
      description: 'Unified analytics platform for big data and machine learning',
      strengths: ['Unified platform', 'MLOps capabilities', 'Spark integration'],
      weaknesses: ['Complex pricing', 'Learning curve'],
      useCase: 'Data engineering, ML workflows, analytics',
      discount: '25% off first year',
      hasDiscount: true,
      trend: 'up',
      marketCap: '$28B',
      aiScore: 88
    },
    {
      id: 4,
      name: 'Snowflake',
      category: 'Data Platform',
      logo: '❄️',
      rating: 4.6,
      pricing: '$2-40/credit',
      employees: '6000+',
      founded: 2012,
      description: 'Cloud data platform with AI/ML capabilities',
      strengths: ['Scalability', 'Data sharing', 'Performance'],
      weaknesses: ['Cost management', 'Vendor lock-in'],
      useCase: 'Data warehousing, analytics, ML data prep',
      discount: '30% off compute credits',
      hasDiscount: true,
      trend: 'stable',
      marketCap: '$45B',
      aiScore: 85
    },
    {
      id: 5,
      name: 'Scale AI',
      category: 'Data Services',
      logo: '🎯',
      rating: 4.5,
      pricing: 'Custom pricing',
      employees: '1000+',
      founded: 2016,
      description: 'Data platform for AI with human-in-the-loop services',
      strengths: ['High-quality data', 'Human annotation', 'Custom solutions'],
      weaknesses: ['Expensive', 'Long setup time'],
      useCase: 'Training data, model evaluation, data labeling',
      discount: '10% off annual contracts',
      hasDiscount: true,
      trend: 'up',
      marketCap: '$7B',
      aiScore: 90
    }
  ]

  const categories = ['all', 'AI Platform', 'Data Platform', 'Data Services', 'MLOps', 'Analytics']

  const filteredCompanies = companies.filter(company => {
    const matchesCategory = selectedCategory === 'all' || company.category === selectedCategory
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const getTrendIcon = (trend) => {
    switch(trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down': return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Company Intelligence</h1>
          <p className="text-gray-600 mt-1">AI-powered evaluations and exclusive partner discounts</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-2">
            Partner Discounts Available
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-0 bg-gray-100 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15),inset_-2px_-2px_6px_rgba(255,255,255,0.7)]"
            />
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`whitespace-nowrap ${
                selectedCategory === category 
                  ? 'bg-blue-500 text-white shadow-[inset_1px_1px_3px_rgba(0,0,0,0.15)]' 
                  : 'shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)]'
              }`}
            >
              {category === 'all' ? 'All Categories' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Company Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCompanies.map((company) => (
          <Card 
            key={company.id}
            className="p-6 border-0 bg-gray-50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)] hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.7),inset_1px_1px_3px_rgba(0,0,0,0.15)] transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)]">
                  {company.logo}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{company.name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {company.category}
                    </Badge>
                    {getTrendIcon(company.trend)}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="font-semibold text-gray-800">{company.rating}</span>
                </div>
                <div className="text-xs text-gray-600">AI Score: {company.aiScore}/100</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4">{company.description}</p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Pricing: {company.pricing}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Team: {company.employees}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">Founded: {company.founded}</div>
                <div className="text-sm text-gray-600">Market Cap: {company.marketCap}</div>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="space-y-3 mb-4">
              <div>
                <h4 className="text-sm font-medium text-green-700 mb-1">Strengths</h4>
                <div className="flex flex-wrap gap-1">
                  {company.strengths.map((strength, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-red-700 mb-1">Considerations</h4>
                <div className="flex flex-wrap gap-1">
                  {company.weaknesses.map((weakness, index) => (
                    <Badge key={index} variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                      {weakness}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Use Case */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-1">Best For</h4>
              <p className="text-sm text-gray-600">{company.useCase}</p>
            </div>

            {/* Discount & Actions */}
            {company.hasDiscount && (
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 p-3 rounded-lg mb-4 border border-amber-200 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)]">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-800">Exclusive Partner Discount</span>
                </div>
                <p className="text-sm text-amber-700">{company.discount}</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)] hover:shadow-[1px_1px_3px_rgba(0,0,0,0.15),-1px_-1px_3px_rgba(255,255,255,0.7)]"
              >
                Get Discount
              </Button>
              <Button 
                variant="outline"
                className="shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)] hover:shadow-[1px_1px_3px_rgba(0,0,0,0.15),-1px_-1px_3px_rgba(255,255,255,0.7)]"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card className="p-4 text-center border-0 bg-gray-50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
          <div className="text-2xl font-bold text-gray-800">{companies.length}</div>
          <div className="text-sm text-gray-600">Companies Evaluated</div>
        </Card>
        <Card className="p-4 text-center border-0 bg-gray-50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
          <div className="text-2xl font-bold text-amber-600">{companies.filter(c => c.hasDiscount).length}</div>
          <div className="text-sm text-gray-600">Partner Discounts</div>
        </Card>
        <Card className="p-4 text-center border-0 bg-gray-50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
          <div className="text-2xl font-bold text-green-600">
            {Math.round(companies.reduce((acc, c) => acc + c.aiScore, 0) / companies.length)}
          </div>
          <div className="text-sm text-gray-600">Avg AI Score</div>
        </Card>
        <Card className="p-4 text-center border-0 bg-gray-50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
          <div className="text-2xl font-bold text-blue-600">$2.1T</div>
          <div className="text-sm text-gray-600">Combined Market Cap</div>
        </Card>
      </div>
    </div>
  )
}

export default CompanyIntelligence