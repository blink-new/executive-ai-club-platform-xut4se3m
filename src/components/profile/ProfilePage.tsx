import { useState, useEffect, useCallback } from 'react'
import { blink } from '@/blink/client'
import { User, Mail, Building, MapPin, Calendar, Award, Edit3, Save, X } from 'lucide-react'

interface UserProfile {
  id?: string
  user_id: string
  display_name: string
  email: string
  company: string
  position: string
  location: string
  bio: string
  expertise: string[]
  achievements: string[]
  avatar_url?: string
  membership_tier: string
  member_since: string
  status: string
}

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    display_name: '',
    email: '',
    company: '',
    position: '',
    location: '',
    bio: '',
    expertise: [] as string[],
    achievements: [] as string[]
  })

  const loadProfile = useCallback(async (userId: string, currentUser: any) => {
    try {
      // Try to load existing profile
      const profiles = await blink.db.userProfiles.list({
        where: { user_id: userId },
        limit: 1
      })

      if (profiles.length > 0) {
        const userProfile = profiles[0]
        const profileData = {
          ...userProfile,
          expertise: userProfile.expertise ? JSON.parse(userProfile.expertise) : ['AI Strategy', 'Digital Transformation', 'Leadership'],
          achievements: userProfile.achievements ? JSON.parse(userProfile.achievements) : ['Forbes 40 Under 40', 'AI Innovation Award 2023']
        }
        setProfile(profileData)
        setFormData({
          display_name: profileData.display_name || '',
          email: profileData.email || '',
          company: profileData.company || '',
          position: profileData.position || 'Chief Executive Officer',
          location: profileData.location || 'San Francisco, CA',
          bio: profileData.bio || 'Passionate about leveraging AI to drive business transformation and innovation.',
          expertise: profileData.expertise,
          achievements: profileData.achievements
        })
      } else {
        // Create default profile for new user
        const defaultProfile = {
          user_id: userId,
          display_name: currentUser?.displayName || 'Executive Member',
          email: currentUser?.email || '',
          company: 'Tech Innovators Inc.',
          position: 'Chief Executive Officer',
          location: 'San Francisco, CA',
          bio: 'Passionate about leveraging AI to drive business transformation and innovation.',
          expertise: JSON.stringify(['AI Strategy', 'Digital Transformation', 'Leadership']),
          achievements: JSON.stringify(['Forbes 40 Under 40', 'AI Innovation Award 2023']),
          membership_tier: 'Premium',
          member_since: '2024',
          status: 'Active'
        }

        const newProfile = await blink.db.userProfiles.create(defaultProfile)
        const profileData = {
          ...newProfile,
          expertise: JSON.parse(newProfile.expertise),
          achievements: JSON.parse(newProfile.achievements)
        }
        setProfile(profileData)
        setFormData({
          display_name: profileData.display_name,
          email: profileData.email,
          company: profileData.company,
          position: profileData.position,
          location: profileData.location,
          bio: profileData.bio,
          expertise: profileData.expertise,
          achievements: profileData.achievements
        })
      }
    } catch (error) {
      console.error('Failed to load profile:', error)
    }
  }, [])

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged(async (state) => {
      if (state.user) {
        setUser(state.user)
        await loadProfile(state.user.id, state.user)
      }
      setLoading(false)
    })
    return unsubscribe
  }, [loadProfile])

  const handleSave = async () => {
    if (!profile || !user) return
    
    setSaving(true)
    try {
      const updatedData = {
        ...formData,
        expertise: JSON.stringify(formData.expertise),
        achievements: JSON.stringify(formData.achievements),
        updated_at: new Date().toISOString()
      }

      await blink.db.userProfiles.update(profile.id, updatedData)
      
      // Update local state
      setProfile({
        ...profile,
        ...formData
      })
      
      setIsEditing(false)
    } catch (error) {
      console.error('Failed to update profile:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (profile) {
      setFormData({
        display_name: profile.display_name,
        email: profile.email,
        company: profile.company,
        position: profile.position,
        location: profile.location,
        bio: profile.bio,
        expertise: profile.expertise,
        achievements: profile.achievements
      })
    }
    setIsEditing(false)
  }

  const addExpertise = () => {
    setFormData(prev => ({
      ...prev,
      expertise: [...prev.expertise, '']
    }))
  }

  const updateExpertise = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.map((item, i) => i === index ? value : item)
    }))
  }

  const removeExpertise = (index: number) => {
    setFormData(prev => ({
      ...prev,
      expertise: prev.expertise.filter((_, i) => i !== index)
    }))
  }

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, '']
    }))
  }

  const updateAchievement = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.map((item, i) => i === index ? value : item)
    }))
  }

  const removeAchievement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }))
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="neo-outset rounded-2xl p-8 text-center">
          <div className="animate-pulse">
            <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4"></div>
            <div className="h-6 bg-muted rounded w-48 mx-auto mb-2"></div>
            <div className="h-4 bg-muted rounded w-32 mx-auto"></div>
          </div>
          <p className="text-muted-foreground mt-4">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return (
      <div className="p-6">
        <div className="neo-outset rounded-2xl p-8 text-center">
          <p className="text-muted-foreground">Please sign in to view your profile.</p>
          <button 
            onClick={() => blink.auth.login()}
            className="neo-button-primary px-6 py-3 rounded-xl mt-4"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="neo-outset rounded-2xl p-8 mb-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className="neo-inset rounded-full p-1">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent/20 to-gold/20 flex items-center justify-center">
                <User className="w-12 h-12 text-accent" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-semibold mb-2">{profile.display_name || 'Executive Member'}</h1>
              <p className="text-lg text-muted-foreground mb-1">{profile.position}</p>
              <p className="text-accent font-medium">{profile.company}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Member since {profile.member_since}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="neo-button-primary px-4 py-2 rounded-xl flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save'}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="neo-button px-4 py-2 rounded-xl flex items-center gap-2 disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="neo-button px-4 py-2 rounded-xl flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* Bio Section */}
        <div className="neo-flat rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-3">About</h3>
          {isEditing ? (
            <textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full neo-inset rounded-lg p-3 bg-transparent resize-none"
              rows={3}
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-muted-foreground leading-relaxed">{profile.bio}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <div className="neo-outset rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Mail className="w-5 h-5 text-accent" />
            Contact Information
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Display Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.display_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, display_name: e.target.value }))}
                  className="w-full neo-inset rounded-lg p-3 bg-transparent"
                />
              ) : (
                <div className="neo-flat rounded-lg p-3">{profile.display_name}</div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="neo-flat rounded-lg p-3 text-muted-foreground">{profile.email}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Company</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                  className="w-full neo-inset rounded-lg p-3 bg-transparent"
                />
              ) : (
                <div className="neo-flat rounded-lg p-3">{profile.company}</div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Position</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                  className="w-full neo-inset rounded-lg p-3 bg-transparent"
                />
              ) : (
                <div className="neo-flat rounded-lg p-3">{profile.position}</div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full neo-inset rounded-lg p-3 bg-transparent"
                />
              ) : (
                <div className="neo-flat rounded-lg p-3">{profile.location}</div>
              )}
            </div>
          </div>
        </div>

        {/* Expertise & Achievements */}
        <div className="space-y-6">
          {/* Expertise */}
          <div className="neo-outset rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Building className="w-5 h-5 text-accent" />
              Areas of Expertise
            </h2>
            
            <div className="space-y-3">
              {formData.expertise.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateExpertise(index, e.target.value)}
                        className="flex-1 neo-inset rounded-lg p-2 bg-transparent text-sm"
                        placeholder="Enter expertise area"
                      />
                      <button
                        onClick={() => removeExpertise(index)}
                        className="neo-button p-2 rounded-lg text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <div className="neo-flat rounded-lg px-3 py-2 text-sm bg-accent/5 border border-gold/20">
                      {item}
                    </div>
                  )}
                </div>
              ))}
              
              {isEditing && (
                <button
                  onClick={addExpertise}
                  className="neo-button px-4 py-2 rounded-lg text-sm text-accent"
                >
                  + Add Expertise
                </button>
              )}
            </div>
          </div>

          {/* Achievements */}
          <div className="neo-outset rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-gold" />
              Achievements
            </h2>
            
            <div className="space-y-3">
              {formData.achievements.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => updateAchievement(index, e.target.value)}
                        className="flex-1 neo-inset rounded-lg p-2 bg-transparent text-sm"
                        placeholder="Enter achievement"
                      />
                      <button
                        onClick={() => removeAchievement(index)}
                        className="neo-button p-2 rounded-lg text-red-500 hover:text-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <div className="neo-flat rounded-lg px-3 py-2 text-sm bg-gold/5 border border-gold/30">
                      {item}
                    </div>
                  )}
                </div>
              ))}
              
              {isEditing && (
                <button
                  onClick={addAchievement}
                  className="neo-button px-4 py-2 rounded-lg text-sm text-gold"
                >
                  + Add Achievement
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Membership Status */}
      <div className="neo-outset rounded-2xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Membership Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="neo-flat rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-gold mb-1">{profile.membership_tier}</div>
            <div className="text-sm text-muted-foreground">Membership Tier</div>
          </div>
          <div className="neo-flat rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-accent mb-1">{profile.member_since}</div>
            <div className="text-sm text-muted-foreground">Member Since</div>
          </div>
          <div className="neo-flat rounded-xl p-4 text-center">
            <div className={`text-2xl font-bold mb-1 ${profile.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>
              {profile.status}
            </div>
            <div className="text-sm text-muted-foreground">Status</div>
          </div>
        </div>
      </div>
    </div>
  )
}