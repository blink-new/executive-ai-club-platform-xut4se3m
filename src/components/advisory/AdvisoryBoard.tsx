import React, { useState } from 'react'
import { Clock, DollarSign, Star, Calendar, MessageSquare, Video, Users, Award, Filter } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'

const AdvisoryBoard = () => {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedAdvisor, setSelectedAdvisor] = useState(null)

  const advisors = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      title: 'Former VP of AI at Google',
      avatar: '👩‍💼',
      rating: 4.9,
      reviews: 127,
      hourlyRate: 500,
      expertise: ['AI Strategy', 'Machine Learning', 'Product Development'],
      availability: 'Available this week',
      responseTime: '< 2 hours',
      languages: ['English', 'Mandarin'],
      experience: '15+ years',
      type: 'premium',
      description: 'Led AI initiatives at Google for 8 years. Expert in scaling AI products from 0 to millions of users.',
      achievements: ['Built Google Assistant', 'Published 50+ papers', 'TEDx Speaker'],
      timeSlots: ['Today 2:00 PM', 'Tomorrow 10:00 AM', 'Friday 3:00 PM'],
      sessionTypes: ['Strategy Session', 'Technical Review', 'Team Training']
    },
    {
      id: 2,
      name: 'Michael Torres',
      title: 'AI Startup Founder & Investor',
      avatar: '👨‍💻',
      rating: 4.8,
      reviews: 89,
      hourlyRate: 350,
      expertise: ['Startup Strategy', 'Fundraising', 'AI Ethics'],
      availability: 'Available next week',
      responseTime: '< 4 hours',
      languages: ['English', 'Spanish'],
      experience: '12+ years',
      type: 'verified',
      description: 'Founded 3 AI startups, 2 successful exits. Now investing in early-stage AI companies.',
      achievements: ['$50M+ raised', '2 successful exits', 'Forbes 30 Under 30'],
      timeSlots: ['Monday 9:00 AM', 'Tuesday 1:00 PM', 'Wednesday 4:00 PM'],
      sessionTypes: ['Pitch Review', 'Fundraising Strategy', 'Market Analysis']
    },
    {
      id: 3,
      name: 'Dr. Lisa Wang',
      title: 'Chief Data Scientist at Meta',
      avatar: '👩‍🔬',
      rating: 4.9,
      reviews: 156,
      hourlyRate: 450,
      expertise: ['Data Science', 'MLOps', 'Team Leadership'],
      availability: 'Available today',
      responseTime: '< 1 hour',
      languages: ['English', 'Korean'],
      experience: '10+ years',
      type: 'premium',
      description: 'Leading data science teams at Meta. Expert in building ML infrastructure at scale.',
      achievements: ['Led 100+ person team', 'Meta AI innovations', 'Industry speaker'],
      timeSlots: ['Today 4:00 PM', 'Tomorrow 11:00 AM', 'Thursday 2:00 PM'],
      sessionTypes: ['Technical Deep Dive', 'Team Building', 'Architecture Review']
    },
    {
      id: 4,
      name: 'James Rodriguez',
      title: 'AI Consultant & Author',
      avatar: '👨‍🎓',
      rating: 4.7,
      reviews: 203,
      hourlyRate: 250,
      expertise: ['AI Implementation', 'Change Management', 'Training'],
      availability: 'Available this week',
      responseTime: '< 6 hours',
      languages: ['English', 'Portuguese'],
      experience: '8+ years',
      type: 'verified',
      description: 'Helped 100+ companies implement AI solutions. Author of "AI for Business Leaders".',
      achievements: ['Bestselling author', '100+ implementations', 'Industry awards'],
      timeSlots: ['Tomorrow 3:00 PM', 'Friday 10:00 AM', 'Monday 1:00 PM'],
      sessionTypes: ['Implementation Planning', 'Change Management', 'Executive Training']
    }
  ]

  const filters = ['all', 'premium', 'verified', 'available-today', 'under-300']

  const filteredAdvisors = advisors.filter(advisor => {
    switch(selectedFilter) {
      case 'premium': return advisor.type === 'premium'
      case 'verified': return advisor.type === 'verified'
      case 'available-today': return advisor.availability.includes('today')
      case 'under-300': return advisor.hourlyRate < 300
      default: return true
    }
  })

  const getTypeIcon = (type) => {
    switch(type) {
      case 'premium': return <Award className="w-4 h-4 text-amber-500" />
      case 'verified': return <Badge className="w-4 h-4 text-blue-500" />
      default: return null
    }
  }

  const bookSession = (advisor, timeSlot, sessionType) => {
    alert(`Booking ${sessionType} with ${advisor.name} at ${timeSlot}`)
    setSelectedAdvisor(null)
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Advisory Board</h1>
          <p className="text-gray-600 mt-1">Book time with AI experts and industry leaders</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-2">
            Premium Advisors Available
          </Badge>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={selectedFilter === filter ? "default" : "outline"}
            onClick={() => setSelectedFilter(filter)}
            className={`whitespace-nowrap ${
              selectedFilter === filter 
                ? 'bg-blue-500 text-white shadow-[inset_1px_1px_3px_rgba(0,0,0,0.15)]' 
                : 'shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)]'
            }`}
          >
            {filter === 'all' ? 'All Advisors' : 
             filter === 'available-today' ? 'Available Today' :
             filter === 'under-300' ? 'Under $300/hr' :
             filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Button>
        ))}
      </div>

      {/* Advisors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAdvisors.map((advisor) => (
          <Card 
            key={advisor.id}
            className="p-6 border-0 bg-gray-50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)] hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.7),inset_1px_1px_3px_rgba(0,0,0,0.15)] transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-white flex items-center justify-center text-3xl shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)]">
                  {advisor.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-800 text-lg">{advisor.name}</h3>
                    {getTypeIcon(advisor.type)}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{advisor.title}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="text-sm font-medium text-gray-800">{advisor.rating}</span>
                    <span className="text-sm text-gray-600">({advisor.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">${advisor.hourlyRate}</div>
                <div className="text-xs text-gray-600">per hour</div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4">{advisor.description}</p>

            {/* Expertise */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Expertise</h4>
              <div className="flex flex-wrap gap-1">
                {advisor.expertise.map((skill, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Key Info */}
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{advisor.responseTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{advisor.experience}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-gray-600">Languages: {advisor.languages.join(', ')}</div>
                <div className="text-green-600 font-medium">{advisor.availability}</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Key Achievements</h4>
              <div className="space-y-1">
                {advisor.achievements.map((achievement, index) => (
                  <div key={index} className="text-xs text-gray-600 flex items-center gap-2">
                    <div className="w-1 h-1 bg-amber-400 rounded-full"></div>
                    {achievement}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button 
                onClick={() => setSelectedAdvisor(advisor)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)] hover:shadow-[1px_1px_3px_rgba(0,0,0,0.15),-1px_-1px_3px_rgba(255,255,255,0.7)]"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book Session
              </Button>
              <Button 
                variant="outline"
                className="shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)] hover:shadow-[1px_1px_3px_rgba(0,0,0,0.15),-1px_-1px_3px_rgba(255,255,255,0.7)]"
              >
                <MessageSquare className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedAdvisor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-50 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[4px_4px_12px_rgba(0,0,0,0.25),-4px_-4px_12px_rgba(255,255,255,0.7)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Book Session with {selectedAdvisor.name}</h3>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedAdvisor(null)}
                className="shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)]"
              >
                ✕
              </Button>
            </div>
            
            <div className="space-y-6">
              {/* Session Types */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Session Type</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedAdvisor.sessionTypes.map((type, index) => (
                    <Card 
                      key={index}
                      className="p-4 cursor-pointer border-0 bg-white shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)] hover:shadow-[1px_1px_3px_rgba(0,0,0,0.15),-1px_-1px_3px_rgba(255,255,255,0.7)] transition-all duration-300"
                    >
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-800">{type}</div>
                        <div className="text-xs text-gray-600 mt-1">${selectedAdvisor.hourlyRate}/hr</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Available Times */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">Available Times</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {selectedAdvisor.timeSlots.map((slot, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      onClick={() => bookSession(selectedAdvisor, slot, selectedAdvisor.sessionTypes[0])}
                      className="p-4 h-auto shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)] hover:shadow-[1px_1px_3px_rgba(0,0,0,0.15),-1px_-1px_3px_rgba(255,255,255,0.7)]"
                    >
                      <div className="text-center">
                        <div className="text-sm font-medium">{slot}</div>
                        <div className="text-xs text-gray-600">60 min</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Summary */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)]">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-blue-800">Session Summary</div>
                    <div className="text-sm text-blue-600">1 hour session with {selectedAdvisor.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-800">${selectedAdvisor.hourlyRate}</div>
                    <div className="text-xs text-blue-600">+ platform fee</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card className="p-4 text-center border-0 bg-gray-50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
          <div className="text-2xl font-bold text-gray-800">{advisors.length}</div>
          <div className="text-sm text-gray-600">Expert Advisors</div>
        </Card>
        <Card className="p-4 text-center border-0 bg-gray-50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
          <div className="text-2xl font-bold text-amber-600">
            {Math.round(advisors.reduce((acc, a) => acc + a.rating, 0) / advisors.length * 10) / 10}
          </div>
          <div className="text-sm text-gray-600">Avg Rating</div>
        </Card>
        <Card className="p-4 text-center border-0 bg-gray-50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
          <div className="text-2xl font-bold text-green-600">
            {advisors.filter(a => a.availability.includes('today')).length}
          </div>
          <div className="text-sm text-gray-600">Available Today</div>
        </Card>
        <Card className="p-4 text-center border-0 bg-gray-50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
          <div className="text-2xl font-bold text-blue-600">
            {advisors.reduce((acc, a) => acc + a.reviews, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Reviews</div>
        </Card>
      </div>
    </div>
  )
}

export default AdvisoryBoard