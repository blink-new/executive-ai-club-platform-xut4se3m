import { useState, useEffect } from 'react'
import { blink } from '@/blink/client'
import { 
  Settings, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database, 
  LogOut,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Save,
  Trash2
} from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    eventReminders: true,
    forumUpdates: false,
    newsAlerts: true,
    
    // Privacy
    profileVisibility: 'members', // public, members, private
    showEmail: false,
    showCompany: true,
    allowDirectMessages: true,
    
    // Appearance
    theme: 'light', // light, dark, auto
    soundEffects: true,
    animations: true,
    compactMode: false,
    
    // AI Assistant
    aiSuggestions: true,
    voiceInput: true,
    contextualHelp: true,
    learningMode: true,
    
    // News Feed
    newsSources: ['TechCrunch', 'Wired', 'MIT Technology Review'],
    newsCategories: ['Enterprise AI', 'Research', 'Regulation'],
    autoRefresh: true,
    
    // Data & Privacy
    dataCollection: true,
    analytics: true,
    thirdPartyIntegrations: true
  })

  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    // Load user settings from backend
    const loadSettings = async () => {
      try {
        // In a real app, you'd load from backend
        const savedSettings = localStorage.getItem('executive-ai-club-settings')
        if (savedSettings) {
          setSettings(JSON.parse(savedSettings))
        }
      } catch (error) {
        console.error('Failed to load settings:', error)
      }
    }
    loadSettings()
  }, [])

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    setHasChanges(true)
  }

  const updateNestedSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }))
    setHasChanges(true)
  }

  const saveSettings = async () => {
    try {
      // In a real app, you'd save to backend
      localStorage.setItem('executive-ai-club-settings', JSON.stringify(settings))
      setHasChanges(false)
      
      // Show success message
      const event = new CustomEvent('showNotification', {
        detail: { message: 'Settings saved successfully!', type: 'success' }
      })
      window.dispatchEvent(event)
    } catch (error) {
      console.error('Failed to save settings:', error)
    }
  }

  const resetSettings = () => {
    if (confirm('Are you sure you want to reset all settings to default?')) {
      setSettings({
        emailNotifications: true,
        pushNotifications: true,
        eventReminders: true,
        forumUpdates: false,
        newsAlerts: true,
        profileVisibility: 'members',
        showEmail: false,
        showCompany: true,
        allowDirectMessages: true,
        theme: 'light',
        soundEffects: true,
        animations: true,
        compactMode: false,
        aiSuggestions: true,
        voiceInput: true,
        contextualHelp: true,
        learningMode: true,
        newsSources: ['TechCrunch', 'Wired', 'MIT Technology Review'],
        newsCategories: ['Enterprise AI', 'Research', 'Regulation'],
        autoRefresh: true,
        dataCollection: true,
        analytics: true,
        thirdPartyIntegrations: true
      })
      setHasChanges(true)
    }
  }

  const handleLogout = async () => {
    if (confirm('Are you sure you want to sign out?')) {
      await blink.auth.logout()
    }
  }

  const ToggleSwitch = ({ checked, onChange, label, description }: any) => (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1">
        <div className="font-medium">{label}</div>
        {description && (
          <div className="text-sm text-muted-foreground mt-1">{description}</div>
        )}
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          checked ? 'bg-accent' : 'bg-muted'
        }`}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${
            checked ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  )

  const SelectField = ({ value, onChange, options, label, description }: any) => (
    <div className="py-3">
      <div className="font-medium mb-2">{label}</div>
      {description && (
        <div className="text-sm text-muted-foreground mb-3">{description}</div>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="neo-inset rounded-lg p-3 bg-transparent w-full"
      >
        {options.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="neo-outset rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold mb-2 flex items-center gap-3">
              <Settings className="w-6 h-6 text-accent" />
              Settings & Preferences
            </h1>
            <p className="text-muted-foreground">
              Customize your Executive AI Club experience
            </p>
          </div>
          
          <div className="flex gap-2">
            {hasChanges && (
              <button
                onClick={saveSettings}
                className="neo-button-primary px-4 py-2 rounded-xl flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            )}
            <button
              onClick={resetSettings}
              className="neo-button px-4 py-2 rounded-xl flex items-center gap-2 text-red-500"
            >
              <Trash2 className="w-4 h-4" />
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notifications */}
        <div className="neo-outset rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-accent" />
            Notifications
          </h2>
          
          <div className="space-y-1">
            <ToggleSwitch
              checked={settings.emailNotifications}
              onChange={(value) => updateSetting('emailNotifications', value)}
              label="Email Notifications"
              description="Receive important updates via email"
            />
            <ToggleSwitch
              checked={settings.pushNotifications}
              onChange={(value) => updateSetting('pushNotifications', value)}
              label="Push Notifications"
              description="Get real-time notifications in your browser"
            />
            <ToggleSwitch
              checked={settings.eventReminders}
              onChange={(value) => updateSetting('eventReminders', value)}
              label="Event Reminders"
              description="Reminders for upcoming events and meetings"
            />
            <ToggleSwitch
              checked={settings.forumUpdates}
              onChange={(value) => updateSetting('forumUpdates', value)}
              label="Forum Updates"
              description="Notifications for forum replies and mentions"
            />
            <ToggleSwitch
              checked={settings.newsAlerts}
              onChange={(value) => updateSetting('newsAlerts', value)}
              label="News Alerts"
              description="Breaking news and important AI developments"
            />
          </div>
        </div>

        {/* Privacy & Security */}
        <div className="neo-outset rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            Privacy & Security
          </h2>
          
          <div className="space-y-1">
            <SelectField
              value={settings.profileVisibility}
              onChange={(value) => updateSetting('profileVisibility', value)}
              label="Profile Visibility"
              description="Who can see your profile information"
              options={[
                { value: 'public', label: 'Public' },
                { value: 'members', label: 'Members Only' },
                { value: 'private', label: 'Private' }
              ]}
            />
            <ToggleSwitch
              checked={settings.showEmail}
              onChange={(value) => updateSetting('showEmail', value)}
              label="Show Email Address"
              description="Display your email on your profile"
            />
            <ToggleSwitch
              checked={settings.showCompany}
              onChange={(value) => updateSetting('showCompany', value)}
              label="Show Company"
              description="Display your company information"
            />
            <ToggleSwitch
              checked={settings.allowDirectMessages}
              onChange={(value) => updateSetting('allowDirectMessages', value)}
              label="Allow Direct Messages"
              description="Let other members send you direct messages"
            />
          </div>
        </div>

        {/* Appearance */}
        <div className="neo-outset rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-accent" />
            Appearance
          </h2>
          
          <div className="space-y-1">
            <SelectField
              value={settings.theme}
              onChange={(value) => updateSetting('theme', value)}
              label="Theme"
              description="Choose your preferred color scheme"
              options={[
                { value: 'light', label: 'Light' },
                { value: 'dark', label: 'Dark' },
                { value: 'auto', label: 'Auto (System)' }
              ]}
            />
            <ToggleSwitch
              checked={settings.soundEffects}
              onChange={(value) => updateSetting('soundEffects', value)}
              label="Sound Effects"
              description="Play sounds for interactions and notifications"
            />
            <ToggleSwitch
              checked={settings.animations}
              onChange={(value) => updateSetting('animations', value)}
              label="Animations"
              description="Enable smooth transitions and animations"
            />
            <ToggleSwitch
              checked={settings.compactMode}
              onChange={(value) => updateSetting('compactMode', value)}
              label="Compact Mode"
              description="Reduce spacing for more content on screen"
            />
          </div>
        </div>

        {/* AI Assistant */}
        <div className="neo-outset rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-accent" />
            AI Assistant
          </h2>
          
          <div className="space-y-1">
            <ToggleSwitch
              checked={settings.aiSuggestions}
              onChange={(value) => updateSetting('aiSuggestions', value)}
              label="AI Suggestions"
              description="Get intelligent suggestions and recommendations"
            />
            <ToggleSwitch
              checked={settings.voiceInput}
              onChange={(value) => updateSetting('voiceInput', value)}
              label="Voice Input"
              description="Use voice commands with the AI assistant"
            />
            <ToggleSwitch
              checked={settings.contextualHelp}
              onChange={(value) => updateSetting('contextualHelp', value)}
              label="Contextual Help"
              description="Get help based on your current page and activity"
            />
            <ToggleSwitch
              checked={settings.learningMode}
              onChange={(value) => updateSetting('learningMode', value)}
              label="Learning Mode"
              description="AI learns from your preferences and behavior"
            />
          </div>
        </div>
      </div>

      {/* News Feed Settings */}
      <div className="neo-outset rounded-2xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Database className="w-5 h-5 text-accent" />
          News Feed Preferences
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Preferred Sources</h3>
            <div className="space-y-2">
              {['TechCrunch', 'Wired', 'MIT Technology Review', 'Harvard Business Review', 'Forbes', 'VentureBeat'].map(source => (
                <label key={source} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.newsSources.includes(source)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateSetting('newsSources', [...settings.newsSources, source])
                      } else {
                        updateSetting('newsSources', settings.newsSources.filter(s => s !== source))
                      }
                    }}
                    className="neo-inset rounded w-4 h-4"
                  />
                  <span className="text-sm">{source}</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {['Enterprise AI', 'Research', 'Regulation', 'Products', 'Startups', 'Investment'].map(category => (
                <label key={category} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={settings.newsCategories.includes(category)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        updateSetting('newsCategories', [...settings.newsCategories, category])
                      } else {
                        updateSetting('newsCategories', settings.newsCategories.filter(c => c !== category))
                      }
                    }}
                    className="neo-inset rounded w-4 h-4"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <ToggleSwitch
            checked={settings.autoRefresh}
            onChange={(value) => updateSetting('autoRefresh', value)}
            label="Auto Refresh"
            description="Automatically refresh news feed every 15 minutes"
          />
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="neo-outset rounded-2xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-accent" />
          Data & Privacy
        </h2>
        
        <div className="space-y-1">
          <ToggleSwitch
            checked={settings.dataCollection}
            onChange={(value) => updateSetting('dataCollection', value)}
            label="Data Collection"
            description="Allow collection of usage data to improve the platform"
          />
          <ToggleSwitch
            checked={settings.analytics}
            onChange={(value) => updateSetting('analytics', value)}
            label="Analytics"
            description="Enable analytics to help us understand platform usage"
          />
          <ToggleSwitch
            checked={settings.thirdPartyIntegrations}
            onChange={(value) => updateSetting('thirdPartyIntegrations', value)}
            label="Third-party Integrations"
            description="Allow integrations with external services and tools"
          />
        </div>
      </div>

      {/* Account Actions */}
      <div className="neo-outset rounded-2xl p-6 mt-6">
        <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
        
        <div className="flex gap-4">
          <button
            onClick={handleLogout}
            className="neo-button px-6 py-3 rounded-xl flex items-center gap-2 text-red-500 hover:text-red-600"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}