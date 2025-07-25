import React, { useState } from 'react'
import { Calendar, Clock, MapPin, Users, Star, Filter, Search, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Badge } from '../ui/badge'

const EventsCenter = () => {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const events = [
    {
      id: 1,
      title: "AI Strategy Summit 2024",
      date: "2024-02-15",
      time: "09:00 AM",
      location: "San Francisco, CA",
      type: "conference",
      attendees: 250,
      maxAttendees: 300,
      price: "Premium",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop",
      description: "Join top executives for a deep dive into AI strategy and implementation.",
      speakers: ["Dr. Sarah Chen", "Marcus Rodriguez", "Lisa Wang"],
      tags: ["Strategy", "Leadership", "Innovation"]
    },
    {
      id: 2,
      title: "Executive AI Roundtable",
      date: "2024-02-20",
      time: "02:00 PM",
      location: "Virtual",
      type: "roundtable",
      attendees: 45,
      maxAttendees: 50,
      price: "Free",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=200&fit=crop",
      description: "Intimate discussion on AI governance and ethical implementation.",
      speakers: ["James Mitchell", "Dr. Amanda Foster"],
      tags: ["Governance", "Ethics", "Discussion"]
    },
    {
      id: 3,
      title: "AI Implementation Workshop",
      date: "2024-02-25",
      time: "10:00 AM",
      location: "New York, NY",
      type: "workshop",
      attendees: 80,
      maxAttendees: 100,
      price: "Premium",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=200&fit=crop",
      description: "Hands-on workshop for implementing AI solutions in enterprise environments.",
      speakers: ["Tech Team Alpha", "Innovation Labs"],
      tags: ["Implementation", "Hands-on", "Enterprise"]
    },
    {
      id: 4,
      title: "Future of AI Networking",
      date: "2024-03-01",
      time: "06:00 PM",
      location: "Austin, TX",
      type: "networking",
      attendees: 120,
      maxAttendees: 150,
      price: "Member Only",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=200&fit=crop",
      description: "Connect with fellow executives over cocktails and AI insights.",
      speakers: ["Network Hosts"],
      tags: ["Networking", "Social", "Insights"]
    }
  ]

  const filters = [
    { id: 'all', label: 'All Events', count: events.length },
    { id: 'conference', label: 'Conferences', count: events.filter(e => e.type === 'conference').length },
    { id: 'workshop', label: 'Workshops', count: events.filter(e => e.type === 'workshop').length },
    { id: 'roundtable', label: 'Roundtables', count: events.filter(e => e.type === 'roundtable').length },
    { id: 'networking', label: 'Networking', count: events.filter(e => e.type === 'networking').length }
  ]

  const filteredEvents = events.filter(event => {
    const matchesFilter = selectedFilter === 'all' || event.type === selectedFilter
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'conference': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'workshop': return 'bg-green-100 text-green-800 border-green-200'
      case 'roundtable': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'networking': return 'bg-amber-100 text-amber-800 border-amber-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getPriceColor = (price: string) => {
    switch (price) {
      case 'Free': return 'bg-green-100 text-green-800 border-green-200'
      case 'Premium': return 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200'
      case 'Member Only': return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Events Center</h1>
          <p className="text-gray-600 mt-1">Discover and join exclusive AI events for executives</p>
        </div>
        <Button className="neomorphic-button bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 border-2 border-amber-300">
          <Plus className="w-4 h-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search events, topics, or speakers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="neomorphic-input pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={selectedFilter === filter.id ? "default" : "outline"}
              onClick={() => setSelectedFilter(filter.id)}
              className={`neomorphic-button whitespace-nowrap ${
                selectedFilter === filter.id 
                  ? 'bg-blue-500 text-white border-amber-300' 
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {filter.label} ({filter.count})
            </Button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <div key={event.id} className="neomorphic-card bg-white p-6 rounded-2xl hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-amber-200">
            {/* Event Image */}
            <div className="relative mb-4 rounded-xl overflow-hidden neomorphic-inset">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-3 right-3">
                <Badge className={`${getPriceColor(event.price)} border`}>
                  {event.price}
                </Badge>
              </div>
              <div className="absolute top-3 left-3">
                <Badge className={`${getEventTypeColor(event.type)} border`}>
                  {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                </Badge>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">{event.title}</h3>
              
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {event.time}
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                {event.location}
              </div>

              <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs bg-gray-50 border-gray-200">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Event Stats */}
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {event.attendees}/{event.maxAttendees}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    {event.rating}
                  </div>
                </div>
                <Button 
                  size="sm" 
                  className="neomorphic-button bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 border border-amber-300"
                >
                  Join Event
                </Button>
              </div>

              {/* Speakers */}
              <div className="text-xs text-gray-500">
                <span className="font-medium">Speakers:</span> {event.speakers.join(', ')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

export default EventsCenter