import React, { useState, useEffect, useCallback } from 'react'
import { User, Camera, Award, MapPin, Building, Mail, Phone, Globe, Edit3, Save, X, Plus, Trash2, Star, TrendingUp, Users, Calendar, Target, Briefcase, GraduationCap, Trophy, Zap, Shield, Crown } from 'lucide-react'
import { blink } from '../../blink/client'

interface UserProfile {
  id: string
  user_id: string
  full_name: string
  email: string
  company: string
  position: string
  location: string
  bio: string
  expertise: string[]
  achievements: string[]
  avatar_url?: string
  linkedin_url?: string
  twitter_url?: string
  website_url?: string
  phone?: string
  years_experience?: number
  team_size?: number
  annual_revenue?: string
  industry?: string
  education?: string
  certifications: string[]
  languages: string[]
  timezone?: string
  availability?: string
  hourly_rate?: number
  membership_tier: 'Executive' | 'Premium' | 'Elite' | 'Platinum'
  member_since: string
  total_connections: number
  total_posts: number
  total_events_attended: number
  influence_score: number
  created_at: string
  updated_at: string
}

const ExecutiveProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [newExpertise, setNewExpertise] = useState('')
  const [newAchievement, setNewAchievement] = useState('')
  const [newCertification, setNewCertification] = useState('')
  const [newLanguage, setNewLanguage] = useState('')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged(async (state) => {
      setUser(state.user)
      if (state.user) {
        try {
          const profiles = await blink.db.user_profiles.list({
            where: { user_id: state.user.id },
            limit: 1
          })

          if (profiles.length > 0) {
            const profileData = profiles[0] as any
            setProfile({
              ...profileData,
              expertise: profileData.expertise ? JSON.parse(profileData.expertise) : [],
              achievements: profileData.achievements ? JSON.parse(profileData.achievements) : [],
              certifications: profileData.certifications ? JSON.parse(profileData.certifications) : [],
              languages: profileData.languages ? JSON.parse(profileData.languages) : []
            })
          } else {
            // Create default profile
            const defaultProfile = {
              id: `profile_${Date.now()}`,
              user_id: state.user.id,
              full_name: state.user.displayName || 'Executive Member',
              email: state.user.email || '',
              company: 'Fortune 500 Company',
              position: 'Chief Executive Officer',
              location: 'New York, NY',
              bio: 'Visionary executive leader driving digital transformation and AI innovation across global markets.',
              expertise: JSON.stringify(['Strategic Leadership', 'Digital Transformation', 'AI Strategy', 'Global Operations']),
              achievements: JSON.stringify(['Led $2B digital transformation', 'Increased revenue by 300%', 'Built world-class AI team']),
              certifications: JSON.stringify(['Harvard Business School Executive Program', 'MIT AI Leadership Certificate']),
              languages: JSON.stringify(['English', 'Mandarin', 'Spanish']),
              membership_tier: 'Executive' as const,
              member_since: new Date().toISOString(),
              total_connections: 1247,
              total_posts: 89,
              total_events_attended: 34,
              influence_score: 9.2,
              years_experience: 15,
              team_size: 500,
              annual_revenue: '$500M+',
              industry: 'Technology',
              timezone: 'EST',
              availability: 'Weekdays 9-5 EST',
              hourly_rate: 2500,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            }

            await blink.db.user_profiles.create(defaultProfile)
            setProfile({
              ...defaultProfile,
              expertise: JSON.parse(defaultProfile.expertise),
              achievements: JSON.parse(defaultProfile.achievements),
              certifications: JSON.parse(defaultProfile.certifications),
              languages: JSON.parse(defaultProfile.languages)
            })
          }
        } catch (error) {
          console.error('Error loading profile:', error)
        } finally {
          setLoading(false)
        }
      }
    })
    return unsubscribe
  }, [])

  const handleSave = async () => {
    if (!profile || !user) return
    
    setSaving(true)
    try {
      const updateData = {
        ...profile,
        expertise: JSON.stringify(profile.expertise),
        achievements: JSON.stringify(profile.achievements),
        certifications: JSON.stringify(profile.certifications),
        languages: JSON.stringify(profile.languages),
        updated_at: new Date().toISOString()
      }

      await blink.db.user_profiles.update(profile.id, updateData)
      setEditing(false)
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setSaving(false)
    }
  }

  const addItem = (field: 'expertise' | 'achievements' | 'certifications' | 'languages', value: string) => {
    if (!profile || !value.trim()) return
    
    setProfile({
      ...profile,
      [field]: [...profile[field], value.trim()]
    })
    
    if (field === 'expertise') setNewExpertise('')
    if (field === 'achievements') setNewAchievement('')
    if (field === 'certifications') setNewCertification('')
    if (field === 'languages') setNewLanguage('')
  }

  const removeItem = (field: 'expertise' | 'achievements' | 'certifications' | 'languages', index: number) => {
    if (!profile) return
    
    setProfile({
      ...profile,
      [field]: profile[field].filter((_, i) => i !== index)
    })
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'from-purple-400 to-purple-600'
      case 'Elite': return 'from-emerald-400 to-emerald-600'
      case 'Premium': return 'from-blue-400 to-blue-600'
      default: return 'from-amber-400 to-amber-600'
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Platinum': return Crown
      case 'Elite': return Shield
      case 'Premium': return Zap
      default: return Star
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-64 bg-gradient-to-r from-slate-200 to-slate-300 rounded-3xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-48 bg-slate-200 rounded-2xl"></div>
                <div className="h-32 bg-slate-200 rounded-2xl"></div>
              </div>
              <div className="space-y-6">
                <div className="h-64 bg-slate-200 rounded-2xl"></div>
                <div className="h-48 bg-slate-200 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!profile) return null

  const TierIcon = getTierIcon(profile.membership_tier)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-full blur-3xl"></div>
          
          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center gap-8">
            <div className="relative group">
              <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover rounded-2xl" />
                ) : (
                  profile && profile.full_name ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase() : (profile?.email || 'U').charAt(0).toUpperCase()
                )}
              </div>
              {editing && (
                <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 hover:bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-200">
                  <Camera className="w-5 h-5" />
                </button>
              )}
            </div>

            <div className="flex-1 text-white">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-4xl font-bold">{profile.full_name}</h1>
                <div className={`px-3 py-1 bg-gradient-to-r ${getTierColor(profile.membership_tier)} rounded-full flex items-center gap-2 text-sm font-semibold`}>
                  <TierIcon className="w-4 h-4" />
                  {profile.membership_tier}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-slate-300 mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  <span>{profile.position}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" />
                  <span>{profile.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-amber-400">{profile.influence_score}</div>
                  <div className="text-sm text-slate-400">Influence Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{profile.total_connections}</div>
                  <div className="text-sm text-slate-400">Connections</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">{profile.total_events_attended}</div>
                  <div className="text-sm text-slate-400">Events</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{profile.years_experience}+</div>
                  <div className="text-sm text-slate-400">Years Exp</div>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {!editing ? (
                <button
                  onClick={() => setEditing(true)}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold transition-all duration-200 flex items-center gap-2"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white font-semibold transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => setEditing(false)}
                    className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-xl text-white font-semibold transition-all duration-200 flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <User className="w-6 h-6 text-blue-500" />
                Executive Summary
              </h2>
              {editing ? (
                <textarea
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full h-32 p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Share your executive vision and leadership philosophy..."
                />
              ) : (
                <p className="text-slate-600 leading-relaxed text-lg">{profile.bio}</p>
              )}
            </div>

            {/* Expertise Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <Target className="w-6 h-6 text-emerald-500" />
                Areas of Expertise
              </h2>
              <div className="flex flex-wrap gap-3 mb-4">
                {profile.expertise.map((skill, index) => (
                  <div key={index} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm font-semibold flex items-center gap-2 shadow-lg">
                    {skill}
                    {editing && (
                      <button
                        onClick={() => removeItem('expertise', index)}
                        className="w-4 h-4 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {editing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newExpertise}
                    onChange={(e) => setNewExpertise(e.target.value)}
                    placeholder="Add new expertise..."
                    className="flex-1 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addItem('expertise', newExpertise)}
                  />
                  <button
                    onClick={() => addItem('expertise', newExpertise)}
                    className="px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Achievements Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-amber-500" />
                Key Achievements
              </h2>
              <div className="space-y-4">
                {profile.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                    <Award className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      {editing ? (
                        <input
                          type="text"
                          value={achievement}
                          onChange={(e) => {
                            const newAchievements = [...profile.achievements]
                            newAchievements[index] = e.target.value
                            setProfile({ ...profile, achievements: newAchievements })
                          }}
                          className="w-full p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="text-slate-700 font-medium">{achievement}</p>
                      )}
                    </div>
                    {editing && (
                      <button
                        onClick={() => removeItem('achievements', index)}
                        className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-500 rounded-lg flex items-center justify-center transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {editing && (
                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    placeholder="Add new achievement..."
                    className="flex-1 p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    onKeyPress={(e) => e.key === 'Enter' && addItem('achievements', newAchievement)}
                  />
                  <button
                    onClick={() => addItem('achievements', newAchievement)}
                    className="px-4 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Mail className="w-5 h-5 text-blue-500" />
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-400" />
                  {editing ? (
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      className="flex-1 p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <span className="text-slate-600">{profile.email}</span>
                  )}
                </div>
                {profile.phone && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-400" />
                    {editing ? (
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="flex-1 p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <span className="text-slate-600">{profile.phone}</span>
                    )}
                  </div>
                )}
                {profile.website_url && (
                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-slate-400" />
                    {editing ? (
                      <input
                        type="url"
                        value={profile.website_url}
                        onChange={(e) => setProfile({ ...profile, website_url: e.target.value })}
                        className="flex-1 p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <a href={profile.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                        {profile.website_url}
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Executive Metrics */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-500" />
                Executive Metrics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Team Size</span>
                  <span className="font-semibold text-slate-800">{profile.team_size}+</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Annual Revenue</span>
                  <span className="font-semibold text-slate-800">{profile.annual_revenue}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Industry</span>
                  <span className="font-semibold text-slate-800">{profile.industry}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Advisory Rate</span>
                  <span className="font-semibold text-emerald-600">${profile.hourly_rate}/hr</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-500" />
                Certifications
              </h3>
              <div className="space-y-3">
                {profile.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <GraduationCap className="w-4 h-4 text-purple-500 flex-shrink-0" />
                    <span className="text-slate-700 text-sm">{cert}</span>
                    {editing && (
                      <button
                        onClick={() => removeItem('certifications', index)}
                        className="ml-auto w-6 h-6 bg-red-100 hover:bg-red-200 text-red-500 rounded-full flex items-center justify-center"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {editing && (
                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    placeholder="Add certification..."
                    className="flex-1 p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && addItem('certifications', newCertification)}
                  />
                  <button
                    onClick={() => addItem('certifications', newCertification)}
                    className="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Languages */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-500" />
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map((lang, index) => (
                  <div key={index} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium flex items-center gap-2">
                    {lang}
                    {editing && (
                      <button
                        onClick={() => removeItem('languages', index)}
                        className="w-4 h-4 bg-indigo-200 hover:bg-indigo-300 rounded-full flex items-center justify-center"
                      >
                        <X className="w-2 h-2" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              {editing && (
                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={newLanguage}
                    onChange={(e) => setNewLanguage(e.target.value)}
                    placeholder="Add language..."
                    className="flex-1 p-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && addItem('languages', newLanguage)}
                  />
                  <button
                    onClick={() => addItem('languages', newLanguage)}
                    className="px-3 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-all duration-200"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExecutiveProfilePage