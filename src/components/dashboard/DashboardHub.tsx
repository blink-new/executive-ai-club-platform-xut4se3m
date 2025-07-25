import { 
  Calendar, 
  Users, 
  TrendingUp, 
  Star, 
  ExternalLink, 
  Play,
  Clock,
  MapPin,
  Gift,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export function DashboardHub() {
  const upcomingEvents = [
    {
      id: 1,
      title: "AI Strategy Workshop",
      date: "Jan 28, 2025",
      time: "2:00 PM EST",
      location: "Virtual",
      attendees: 45,
      type: "Workshop"
    },
    {
      id: 2,
      title: "Executive AI Roundtable",
      date: "Feb 2, 2025",
      time: "11:00 AM EST",
      location: "NYC Office",
      attendees: 12,
      type: "Roundtable"
    },
    {
      id: 3,
      title: "AI Implementation Case Study",
      date: "Feb 5, 2025",
      time: "3:00 PM EST",
      location: "Virtual",
      attendees: 78,
      type: "Case Study"
    }
  ]

  const curatedLinks = [
    {
      title: "OpenAI's Latest GPT-5 Announcement",
      url: "#",
      category: "News",
      votes: 124
    },
    {
      title: "McKinsey: AI Adoption in Fortune 500",
      url: "#",
      category: "Research",
      votes: 89
    },
    {
      title: "Harvard Business Review: AI Leadership",
      url: "#",
      category: "Article",
      votes: 156
    }
  ]

  const exclusiveDeals = [
    {
      title: "OpenAI Enterprise - 25% Off",
      description: "Exclusive discount for club members",
      discount: "25%",
      expires: "Feb 15, 2025"
    },
    {
      title: "Anthropic Claude Pro - 3 Months Free",
      description: "Premium AI assistant access",
      discount: "Free",
      expires: "Jan 31, 2025"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="neo-outset rounded-2xl p-6 bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground mb-2">
              Welcome back, Executive Member
            </h2>
            <p className="text-muted-foreground">
              Your AI leadership journey continues. Here's what's happening in the club.
            </p>
          </div>
          <div className="neo-outset rounded-xl p-4 bg-gold/10 border border-gold/30">
            <Star className="w-8 h-8 text-gold fill-current" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="neo-outset border-0 bg-background">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Members</p>
                <p className="text-2xl font-semibold text-foreground">1,247</p>
              </div>
              <div className="neo-flat rounded-lg p-3 bg-accent/10">
                <Users className="w-5 h-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="neo-outset border-0 bg-background">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Month's Events</p>
                <p className="text-2xl font-semibold text-foreground">12</p>
              </div>
              <div className="neo-flat rounded-lg p-3 bg-gold/10">
                <Calendar className="w-5 h-5 text-gold" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="neo-outset border-0 bg-background">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Training Hours</p>
                <p className="text-2xl font-semibold text-foreground">156</p>
              </div>
              <div className="neo-flat rounded-lg p-3 bg-accent/10">
                <TrendingUp className="w-5 h-5 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="neo-outset border-0 bg-background">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">AI Deals Saved</p>
                <p className="text-2xl font-semibold text-foreground">$24K</p>
              </div>
              <div className="neo-flat rounded-lg p-3 bg-gold/10">
                <Gift className="w-5 h-5 text-gold" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Events */}
        <Card className="neo-outset border-0 bg-background">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-accent" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="neo-flat rounded-xl p-4 hover:neo-outset transition-all duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-medium text-foreground">{event.title}</h4>
                      <Badge variant="secondary" className="neo-inset text-xs">
                        {event.type}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3" />
                        {event.attendees} attending
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="neo-outset hover:neo-pressed">
                    Join
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Curated Links */}
        <Card className="neo-outset border-0 bg-background">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="w-5 h-5 text-accent" />
              Curated AI Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {curatedLinks.map((link, index) => (
              <div key={index} className="neo-flat rounded-xl p-4 hover:neo-outset transition-all duration-200 cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">{link.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="neo-inset text-xs">
                        {link.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 text-gold fill-current" />
                        {link.votes}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Exclusive Deals */}
      <Card className="neo-outset border-0 bg-background">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-gold" />
            Exclusive Member Deals
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exclusiveDeals.map((deal, index) => (
              <div key={index} className="neo-outset rounded-xl p-4 bg-gradient-to-br from-gold/5 to-gold/10 border border-gold/20">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">{deal.title}</h4>
                    <p className="text-sm text-muted-foreground">{deal.description}</p>
                  </div>
                  <Badge className="neo-inset bg-gold text-gold-foreground">
                    {deal.discount}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">Expires: {deal.expires}</p>
                  <Button size="sm" className="neo-outset hover:neo-pressed bg-gold/10 border border-gold/30">
                    <Zap className="w-3 h-3 mr-1" />
                    Claim
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}