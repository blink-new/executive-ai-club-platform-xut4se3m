import React, { useState, useEffect } from 'react'
import { 
  Settings, Bell, Shield, Palette, Bot, Rss, Database, 
  LogOut, Save, RotateCcw, Moon, Sun, Volume2, VolumeX,
  Eye, EyeOff, Mail, MessageSquare, Calendar, Newspaper,
  Zap, Mic, MicOff, Brain, Lightbulb, RefreshCw, Globe,
  Lock, Key, UserCheck, Smartphone, Monitor, Tablet,
  Chrome, Wifi, WifiOff, Download,
  Upload, HardDrive, Cloud, Server, Activity, BarChart3,
  TrendingUp, Users, Target, Award, Crown, Star
} from 'lucide-react'
import { blink } from '../../blink/client'

interface SettingsData {
  // Notifications
  emailNotifications: boolean
  pushNotifications: boolean
  eventReminders: boolean
  forumUpdates: boolean
  newsAlerts: boolean
  weeklyDigest: boolean
  marketingEmails: boolean
  
  // Privacy & Security
  profileVisibility: 'public' | 'members' | 'private'
  showEmail: boolean
  showCompany: boolean
  allowDirectMessages: boolean
  twoFactorAuth: boolean
  sessionTimeout: number
  
  // Appearance
  theme: 'light' | 'dark' | 'auto'
  soundEffects: boolean
  animations: boolean
  compactMode: boolean
  fontSize: 'small' | 'medium' | 'large'
  
  // AI Assistant
  aiSuggestions: boolean
  voiceInput: boolean
  contextualHelp: boolean
  learningMode: boolean
  aiPersonality: 'professional' | 'friendly' | 'concise'
  
  // News Feed
  autoRefresh: boolean
  refreshInterval: number
  sources: string[]
  categories: string[]
  
  // Data & Privacy
  dataCollection: boolean
  analytics: boolean
  thirdPartyIntegrations: boolean
  exportData: boolean
  
  // Advanced
  developerMode: boolean
  betaFeatures: boolean
  diagnostics: boolean
  performanceMode: boolean
}

const ExecutiveSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SettingsData>({
    // Default values
    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true,
    forumUpdates: true,
    newsAlerts: true,
    weeklyDigest: true,
    marketingEmails: false,
    
    profileVisibility: 'members',
    showEmail: false,
    showCompany: true,
    allowDirectMessages: true,
    twoFactorAuth: false,
    sessionTimeout: 30,
    
    theme: 'light',
    soundEffects: true,
    animations: true,
    compactMode: false,
    fontSize: 'medium',
    
    aiSuggestions: true,
    voiceInput: true,
    contextualHelp: true,
    learningMode: true,
    aiPersonality: 'professional',
    
    autoRefresh: true,
    refreshInterval: 5,
    sources: ['TechCrunch', 'Wired', 'MIT Technology Review', 'Harvard Business Review'],
    categories: ['Enterprise AI', 'Research', 'Regulation', 'Products'],
    
    dataCollection: true,
    analytics: true,
    thirdPartyIntegrations: true,
    exportData: false,
    
    developerMode: false,
    betaFeatures: true,
    diagnostics: false,
    performanceMode: false
  })
  
  const [hasChanges, setHasChanges] = useState(false)
  const [saving, setSaving] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
    })
    return unsubscribe
  }, [])

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('executive-settings')
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings)
        setSettings(prev => ({ ...prev, ...parsed }))
      } catch (error) {
        console.error('Error loading settings:', error)
      }
    }
  }, [])

  const updateSetting = (key: keyof SettingsData, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      localStorage.setItem('executive-settings', JSON.stringify(settings))
      setHasChanges(false)
      // Could also save to database here
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    localStorage.removeItem('executive-settings')
    window.location.reload()
  }

  const handleLogout = () => {
    blink.auth.logout()
  }

  const ToggleSwitch: React.FC<{ 
    enabled: boolean
    onChange: (enabled: boolean) => void
    size?: 'sm' | 'md' | 'lg'
  }> = ({ enabled, onChange, size = 'md' }) => {
    const sizeClasses = {
      sm: 'w-8 h-4',
      md: 'w-10 h-5',
      lg: 'w-12 h-6'
    }
    
    const thumbClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    }

    return (
      <button
        onClick={() => onChange(!enabled)}
        className={`${sizeClasses[size]} relative inline-flex items-center rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          enabled 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg' 
            : 'bg-gray-300 shadow-inner'
        }`}
      >
        <span
          className={`${thumbClasses[size]} inline-block transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
            enabled ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    )
  }

  const SettingCard: React.FC<{
    icon: React.ElementType
    title: string
    description: string
    children: React.ReactNode
    premium?: boolean
  }> = ({ icon: Icon, title, description, children, premium = false }) => (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              {title}
              {premium && (
                <div className="px-2 py-0.5 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                  <Crown className="w-3 h-3" />
                  PRO
                </div>
              )}
            </h3>
            <p className="text-sm text-slate-600">{description}</p>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )

  const SettingRow: React.FC<{
    label: string
    description?: string
    children: React.ReactNode
  }> = ({ label, description, children }) => (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1">
        <div className="text-sm font-medium text-slate-700">{label}</div>
        {description && (
          <div className="text-xs text-slate-500 mt-1">{description}</div>
        )}
      </div>
      <div className="ml-4">
        {children}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-full blur-3xl"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <Settings className="w-8 h-8" />
                Executive Settings
              </h1>
              <p className="text-slate-300">Customize your premium experience</p>
            </div>
            
            {hasChanges && (
              <div className="flex gap-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white font-semibold transition-all duration-200 flex items-center gap-2 disabled:opacity-50 shadow-lg"
                >
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-slate-600 hover:bg-slate-700 rounded-xl text-white font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Notifications */}
          <SettingCard
            icon={Bell}
            title="Notifications"
            description="Manage how you receive updates and alerts"
          >
            <SettingRow label="Email Notifications" description="Receive important updates via email">
              <ToggleSwitch 
                enabled={settings.emailNotifications} 
                onChange={(value) => updateSetting('emailNotifications', value)} 
              />
            </SettingRow>
            <SettingRow label="Push Notifications" description="Browser and mobile notifications">
              <ToggleSwitch 
                enabled={settings.pushNotifications} 
                onChange={(value) => updateSetting('pushNotifications', value)} 
              />
            </SettingRow>
            <SettingRow label="Event Reminders" description="Get notified about upcoming events">
              <ToggleSwitch 
                enabled={settings.eventReminders} 
                onChange={(value) => updateSetting('eventReminders', value)} 
              />
            </SettingRow>
            <SettingRow label="Forum Updates" description="New posts and replies in discussions">
              <ToggleSwitch 
                enabled={settings.forumUpdates} 
                onChange={(value) => updateSetting('forumUpdates', value)} 
              />
            </SettingRow>
            <SettingRow label="AI News Alerts" description="Breaking AI industry news">
              <ToggleSwitch 
                enabled={settings.newsAlerts} 
                onChange={(value) => updateSetting('newsAlerts', value)} 
              />
            </SettingRow>
            <SettingRow label="Weekly Digest" description="Summary of platform activity">
              <ToggleSwitch 
                enabled={settings.weeklyDigest} 
                onChange={(value) => updateSetting('weeklyDigest', value)} 
              />
            </SettingRow>
          </SettingCard>

          {/* Privacy & Security */}
          <SettingCard
            icon={Shield}
            title="Privacy & Security"
            description="Control your data and privacy settings"
            premium
          >
            <SettingRow label="Profile Visibility" description="Who can see your profile">
              <select
                value={settings.profileVisibility}
                onChange={(e) => updateSetting('profileVisibility', e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="public">Public</option>
                <option value="members">Members Only</option>
                <option value="private">Private</option>
              </select>
            </SettingRow>
            <SettingRow label="Show Email Address" description="Display email in your profile">
              <ToggleSwitch 
                enabled={settings.showEmail} 
                onChange={(value) => updateSetting('showEmail', value)} 
              />
            </SettingRow>
            <SettingRow label="Show Company" description="Display company information">
              <ToggleSwitch 
                enabled={settings.showCompany} 
                onChange={(value) => updateSetting('showCompany', value)} 
              />
            </SettingRow>
            <SettingRow label="Allow Direct Messages" description="Let members message you directly">
              <ToggleSwitch 
                enabled={settings.allowDirectMessages} 
                onChange={(value) => updateSetting('allowDirectMessages', value)} 
              />
            </SettingRow>
            <SettingRow label="Two-Factor Authentication" description="Extra security for your account">
              <ToggleSwitch 
                enabled={settings.twoFactorAuth} 
                onChange={(value) => updateSetting('twoFactorAuth', value)} 
              />
            </SettingRow>
            <SettingRow label="Session Timeout" description="Auto-logout after inactivity (minutes)">
              <select
                value={settings.sessionTimeout}
                onChange={(e) => updateSetting('sessionTimeout', parseInt(e.target.value))}
                className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
                <option value={240}>4 hours</option>
                <option value={0}>Never</option>
              </select>
            </SettingRow>
          </SettingCard>

          {/* Appearance */}
          <SettingCard
            icon={Palette}
            title="Appearance"
            description="Customize the look and feel"
          >
            <SettingRow label="Theme" description="Choose your preferred theme">
              <select
                value={settings.theme}
                onChange={(e) => updateSetting('theme', e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </select>
            </SettingRow>
            <SettingRow label="Sound Effects" description="Audio feedback for interactions">
              <ToggleSwitch 
                enabled={settings.soundEffects} 
                onChange={(value) => updateSetting('soundEffects', value)} 
              />
            </SettingRow>
            <SettingRow label="Animations" description="Smooth transitions and effects">
              <ToggleSwitch 
                enabled={settings.animations} 
                onChange={(value) => updateSetting('animations', value)} 
              />
            </SettingRow>
            <SettingRow label="Compact Mode" description="Denser layout with less spacing">
              <ToggleSwitch 
                enabled={settings.compactMode} 
                onChange={(value) => updateSetting('compactMode', value)} 
              />
            </SettingRow>
            <SettingRow label="Font Size" description="Adjust text size for readability">
              <select
                value={settings.fontSize}
                onChange={(e) => updateSetting('fontSize', e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </SettingRow>
          </SettingCard>

          {/* AI Assistant */}
          <SettingCard
            icon={Bot}
            title="AI Assistant"
            description="Configure your intelligent assistant"
            premium
          >
            <SettingRow label="Smart Suggestions" description="AI-powered recommendations">
              <ToggleSwitch 
                enabled={settings.aiSuggestions} 
                onChange={(value) => updateSetting('aiSuggestions', value)} 
              />
            </SettingRow>
            <SettingRow label="Voice Input" description="Speak to your AI assistant">
              <ToggleSwitch 
                enabled={settings.voiceInput} 
                onChange={(value) => updateSetting('voiceInput', value)} 
              />
            </SettingRow>
            <SettingRow label="Contextual Help" description="Context-aware assistance">
              <ToggleSwitch 
                enabled={settings.contextualHelp} 
                onChange={(value) => updateSetting('contextualHelp', value)} 
              />
            </SettingRow>
            <SettingRow label="Learning Mode" description="AI learns from your preferences">
              <ToggleSwitch 
                enabled={settings.learningMode} 
                onChange={(value) => updateSetting('learningMode', value)} 
              />
            </SettingRow>
            <SettingRow label="AI Personality" description="Choose assistant communication style">
              <select
                value={settings.aiPersonality}
                onChange={(e) => updateSetting('aiPersonality', e.target.value)}
                className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              >
                <option value="professional">Professional</option>
                <option value="friendly">Friendly</option>
                <option value="concise">Concise</option>
              </select>
            </SettingRow>
          </SettingCard>

          {/* News Feed */}
          <SettingCard
            icon={Rss}
            title="AI News Feed"
            description="Customize your news and updates"
          >
            <SettingRow label="Auto Refresh" description="Automatically update news feed">
              <ToggleSwitch 
                enabled={settings.autoRefresh} 
                onChange={(value) => updateSetting('autoRefresh', value)} 
              />
            </SettingRow>
            <SettingRow label="Refresh Interval" description="How often to check for new articles">
              <select
                value={settings.refreshInterval}
                onChange={(e) => updateSetting('refreshInterval', parseInt(e.target.value))}
                className="px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                disabled={!settings.autoRefresh}
              >
                <option value={1}>1 minute</option>
                <option value={5}>5 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={60}>1 hour</option>
              </select>
            </SettingRow>
            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-700">News Sources</div>
              <div className="grid grid-cols-2 gap-2">
                {['TechCrunch', 'Wired', 'MIT Technology Review', 'Harvard Business Review', 'VentureBeat', 'AI News'].map((source) => (
                  <label key={source} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={settings.sources.includes(source)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateSetting('sources', [...settings.sources, source])
                        } else {
                          updateSetting('sources', settings.sources.filter(s => s !== source))
                        }
                      }}
                      className="rounded border-slate-300 text-blue-500 focus:ring-blue-500"
                    />
                    {source}
                  </label>
                ))}
              </div>
            </div>
          </SettingCard>

          {/* Data & Privacy */}
          <SettingCard
            icon={Database}
            title="Data & Privacy"
            description="Control data collection and usage"
            premium
          >
            <SettingRow label="Data Collection" description="Allow anonymous usage analytics">
              <ToggleSwitch 
                enabled={settings.dataCollection} 
                onChange={(value) => updateSetting('dataCollection', value)} 
              />
            </SettingRow>
            <SettingRow label="Analytics" description="Help improve the platform">
              <ToggleSwitch 
                enabled={settings.analytics} 
                onChange={(value) => updateSetting('analytics', value)} 
              />
            </SettingRow>
            <SettingRow label="Third-party Integrations" description="Allow connections to external services">
              <ToggleSwitch 
                enabled={settings.thirdPartyIntegrations} 
                onChange={(value) => updateSetting('thirdPartyIntegrations', value)} 
              />
            </SettingRow>
            <div className="pt-4 border-t border-slate-200">
              <button className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Export My Data
              </button>
            </div>
          </SettingCard>
        </div>

        {/* Account Actions */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Key className="w-6 h-6 text-red-500" />
            Account Actions
          </h2>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
            <button className="px-6 py-3 bg-slate-500 hover:bg-slate-600 text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg">
              <Download className="w-4 h-4" />
              Download Data
            </button>
            <button className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg">
              <Crown className="w-4 h-4" />
              Upgrade Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExecutiveSettingsPage