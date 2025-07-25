import React, { useState } from 'react'
import { Briefcase, MapPin, DollarSign, Clock, Users, Star, ExternalLink, Send, Filter } from 'lucide-react'
import { Button } from '../ui/button'
import { Card } from '../ui/card'
import { Badge } from '../ui/badge'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

const JobsReferrals = () => {
  const [selectedJob, setSelectedJob] = useState(null)
  const [referralText, setReferralText] = useState('')
  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  const jobs = [
    {
      id: 1,
      title: 'VP of AI Strategy',
      company: 'TechCorp',
      logo: '🏢',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$300K - $450K',
      posted: '2 days ago',
      referralBonus: '$10,000',
      description: 'Lead AI strategy and implementation across all business units. Drive innovation and competitive advantage through AI.',
      requirements: ['10+ years leadership experience', 'AI/ML strategy background', 'Executive presence'],
      benefits: ['Equity package', 'Remote flexibility', 'Top-tier health insurance'],
      companySize: '1000-5000',
      industry: 'Technology',
      urgency: 'high',
      referrals: 3,
      maxReferrals: 5
    },
    {
      id: 2,
      title: 'Chief Data Officer',
      company: 'FinanceAI Inc',
      logo: '💰',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$350K - $500K',
      posted: '1 day ago',
      referralBonus: '$15,000',
      description: 'Transform financial services through data-driven insights and AI innovation.',
      requirements: ['15+ years data leadership', 'Financial services experience', 'AI transformation track record'],
      benefits: ['Signing bonus', 'Relocation assistance', 'Executive coaching'],
      companySize: '500-1000',
      industry: 'Financial Services',
      urgency: 'high',
      referrals: 1,
      maxReferrals: 3
    },
    {
      id: 3,
      title: 'AI Product Manager',
      company: 'StartupX',
      logo: '🚀',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$180K - $250K',
      posted: '3 days ago',
      referralBonus: '$5,000',
      description: 'Drive AI product development from conception to launch. Work with cutting-edge ML teams.',
      requirements: ['5+ years product management', 'AI/ML product experience', 'Startup experience preferred'],
      benefits: ['Significant equity', 'Flexible PTO', 'Learning budget'],
      companySize: '50-200',
      industry: 'Technology',
      urgency: 'medium',
      referrals: 7,
      maxReferrals: 10
    },
    {
      id: 4,
      title: 'Head of AI Ethics',
      company: 'GlobalTech',
      logo: '🌍',
      location: 'Remote',
      type: 'Full-time',
      salary: '$220K - $300K',
      posted: '5 days ago',
      referralBonus: '$8,000',
      description: 'Establish and lead AI ethics framework across global operations. Shape responsible AI development.',
      requirements: ['PhD in relevant field', 'AI ethics expertise', 'Policy development experience'],
      benefits: ['Global remote work', 'Conference budget', 'Research sabbatical'],
      companySize: '5000+',
      industry: 'Technology',
      urgency: 'medium',
      referrals: 2,
      maxReferrals: 4
    },
    {
      id: 5,
      title: 'AI Consultant - Partner Track',
      company: 'McKinsey & Company',
      logo: '📊',
      location: 'Multiple Locations',
      type: 'Full-time',
      salary: '$250K - $400K',
      posted: '1 week ago',
      referralBonus: '$12,000',
      description: 'Lead AI transformation projects for Fortune 500 clients. Fast track to partner consideration.',
      requirements: ['MBA from top school', 'AI consulting experience', 'Client management skills'],
      benefits: ['Partner track', 'Global travel', 'Executive development'],
      companySize: '5000+',
      industry: 'Consulting',
      urgency: 'low',
      referrals: 4,
      maxReferrals: 6
    }
  ]

  const filters = ['all', 'high-urgency', 'high-bonus', 'remote', 'new']

  const filteredJobs = jobs.filter(job => {
    switch(selectedFilter) {
      case 'high-urgency': return job.urgency === 'high'
      case 'high-bonus': return parseInt(job.referralBonus.replace(/[^0-9]/g, '')) >= 10000
      case 'remote': return job.location.includes('Remote')
      case 'new': return job.posted.includes('day')
      default: return true
    }
  })

  const submitReferral = () => {
    if (!referralText.trim() || !linkedinUrl.trim()) {
      alert('Please fill in all fields')
      return
    }
    
    alert(`Referral submitted for ${selectedJob.title}!\n\nYour referral will be reviewed and the candidate will be contacted directly.`)
    setSelectedJob(null)
    setReferralText('')
    setLinkedinUrl('')
  }

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Jobs & Referrals</h1>
          <p className="text-gray-600 mt-1">Refer top talent from your network and earn rewards</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge className="bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-2">
            Referral Rewards Available
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
            {filter === 'all' ? 'All Jobs' : 
             filter === 'high-urgency' ? 'Urgent Hiring' :
             filter === 'high-bonus' ? 'High Bonus' :
             filter === 'new' ? 'New Postings' :
             filter.charAt(0).toUpperCase() + filter.slice(1)}
          </Button>
        ))}
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredJobs.map((job) => (
          <Card 
            key={job.id}
            className="p-6 border-0 bg-gray-50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)] hover:shadow-[inset_-1px_-1px_3px_rgba(255,255,255,0.7),inset_1px_1px_3px_rgba(0,0,0,0.15)] transition-all duration-300"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-2xl shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)]">
                  {job.logo}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg">{job.title}</h3>
                  <p className="text-gray-600">{job.company}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={`text-xs ${getUrgencyColor(job.urgency)}`}>
                      {job.urgency} priority
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {job.type}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-amber-600">{job.referralBonus}</div>
                <div className="text-xs text-gray-600">referral bonus</div>
              </div>
            </div>

            {/* Job Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <DollarSign className="w-4 h-4" />
                <span>{job.salary}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Posted {job.posted}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>{job.companySize} employees</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 mb-4">{job.description}</p>

            {/* Requirements */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Key Requirements</h4>
              <div className="space-y-1">
                {job.requirements.slice(0, 2).map((req, index) => (
                  <div key={index} className="text-xs text-gray-600 flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                    {req}
                  </div>
                ))}
              </div>
            </div>

            {/* Referral Progress */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-600">Referrals</span>
                <span className="text-xs text-gray-600">{job.referrals}/{job.maxReferrals}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.15)]">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(job.referrals / job.maxReferrals) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <Button 
                onClick={() => setSelectedJob(job)}
                disabled={job.referrals >= job.maxReferrals}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)] hover:shadow-[1px_1px_3px_rgba(0,0,0,0.15),-1px_-1px_3px_rgba(255,255,255,0.7)] disabled:opacity-50"
              >
                <Send className="w-4 h-4 mr-2" />
                {job.referrals >= job.maxReferrals ? 'Full' : 'Refer Someone'}
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

      {/* Referral Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-50 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[4px_4px_12px_rgba(0,0,0,0.25),-4px_-4px_12px_rgba(255,255,255,0.7)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Refer for {selectedJob.title}</h3>
              <Button 
                variant="ghost" 
                onClick={() => setSelectedJob(null)}
                className="shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)]"
              >
                ✕
              </Button>
            </div>
            
            <div className="space-y-6">
              {/* Job Summary */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)]">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium text-blue-800">{selectedJob.title}</h4>
                    <p className="text-sm text-blue-600">{selectedJob.company} • {selectedJob.location}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-amber-600">{selectedJob.referralBonus}</div>
                    <div className="text-xs text-blue-600">referral bonus</div>
                  </div>
                </div>
                <p className="text-sm text-blue-700">{selectedJob.description}</p>
              </div>

              {/* Referral Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Candidate's LinkedIn Profile URL
                  </label>
                  <Input
                    placeholder="https://linkedin.com/in/candidate-name"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="border-0 bg-gray-100 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15),inset_-2px_-2px_6px_rgba(255,255,255,0.7)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Why is this person a great fit? (Required)
                  </label>
                  <Textarea
                    placeholder="Describe their relevant experience, skills, and why they'd be perfect for this role..."
                    value={referralText}
                    onChange={(e) => setReferralText(e.target.value)}
                    rows={4}
                    className="border-0 bg-gray-100 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.15),inset_-2px_-2px_6px_rgba(255,255,255,0.7)]"
                  />
                </div>
              </div>

              {/* Referral Process */}
              <div className="bg-gray-100 p-4 rounded-lg shadow-[inset_1px_1px_3px_rgba(0,0,0,0.1)]">
                <h4 className="font-medium text-gray-800 mb-2">How it works:</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                    We'll review your referral and reach out to the candidate
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                    If they're interested, we'll facilitate the introduction
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                    You earn the bonus when they're successfully hired
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                onClick={submitReferral}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white shadow-[2px_2px_6px_rgba(0,0,0,0.15),-2px_-2px_6px_rgba(255,255,255,0.7)] hover:shadow-[1px_1px_3px_rgba(0,0,0,0.15),-1px_-1px_3px_rgba(255,255,255,0.7)]"
              >
                Submit Referral
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
        <Card className="p-4 text-center border-0 bg-gray-50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
          <div className="text-2xl font-bold text-gray-800">{jobs.length}</div>
          <div className="text-sm text-gray-600">Open Positions</div>
        </Card>
        <Card className="p-4 text-center border-0 bg-gray-50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
          <div className="text-2xl font-bold text-amber-600">
            ${Math.round(jobs.reduce((acc, j) => acc + parseInt(j.referralBonus.replace(/[^0-9]/g, '')), 0) / 1000)}K
          </div>
          <div className="text-sm text-gray-600">Total Bonuses</div>
        </Card>
        <Card className="p-4 text-center border-0 bg-gray-50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
          <div className="text-2xl font-bold text-green-600">
            {jobs.filter(j => j.urgency === 'high').length}
          </div>
          <div className="text-sm text-gray-600">Urgent Hiring</div>
        </Card>
        <Card className="p-4 text-center border-0 bg-gray-50 shadow-[inset_-2px_-2px_6px_rgba(255,255,255,0.7),inset_2px_2px_6px_rgba(0,0,0,0.15)]">
          <div className="text-2xl font-bold text-blue-600">
            {jobs.reduce((acc, j) => acc + j.referrals, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Referrals</div>
        </Card>
      </div>
    </div>
  )
}

export default JobsReferrals