import { useState, useEffect } from 'react'
import { blink } from '@/blink/client'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { DashboardHub } from '@/components/dashboard/DashboardHub'
import EventsCenter from '@/components/events/EventsCenter'
import EnhancedForumCenter from '@/components/forum/EnhancedForumCenter'
import AINewsFeed from '@/components/news/AINewsFeed'
import TrainingCenter from '@/components/training/TrainingCenter'
import CompanyIntelligence from '@/components/companies/CompanyIntelligence'
import AdvisoryBoard from '@/components/advisory/AdvisoryBoard'
import JobsReferrals from '@/components/jobs/JobsReferrals'
import ExecutiveProfilePage from '@/components/profile/ExecutiveProfilePage'
import ExecutiveSettingsPage from '@/components/settings/ExecutiveSettingsPage'
import EnhancedAIAssistant from '@/components/ai/EnhancedAIAssistant'
import { Loader2 } from 'lucide-react'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const getPageTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard Hub'
      case 'events':
        return 'Events Center'
      case 'forum':
        return 'Executive Forum'
      case 'news':
        return 'AI News Feed'
      case 'training':
        return 'Training Center'
      case 'companies':
        return 'Company Intelligence'
      case 'advisory':
        return 'Advisory Board'
      case 'jobs':
        return 'Jobs & Referrals'
      case 'profile':
        return 'Profile'
      case 'settings':
        return 'Settings'
      default:
        return 'Executive AI Club'
    }
  }

  const getPageSubtitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Your command center for AI leadership'
      case 'events':
        return 'Discover and join exclusive AI events for executives'
      case 'forum':
        return 'Connect and discuss with fellow AI executives'
      case 'news':
        return 'Stay updated with the latest AI developments'
      case 'training':
        return 'Enhance your AI knowledge with expert-led content'
      case 'companies':
        return 'Discover and evaluate AI companies with intelligence'
      case 'advisory':
        return 'Connect with experts for advisory and project work'
      case 'jobs':
        return 'Network-based job referrals and opportunities'
      case 'profile':
        return 'Manage your executive profile and membership details'
      case 'settings':
        return 'Customize your platform experience and preferences'
      default:
        return 'Premium platform for executive AI engagement'
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHub />
      case 'events':
        return <EventsCenter />
      case 'forum':
        return <EnhancedForumCenter />
      case 'news':
        return <AINewsFeed />
      case 'training':
        return <TrainingCenter />
      case 'companies':
        return <CompanyIntelligence />
      case 'advisory':
        return <AdvisoryBoard />
      case 'jobs':
        return <JobsReferrals />
      case 'profile':
        return <ExecutiveProfilePage />
      case 'settings':
        return <ExecutiveSettingsPage />
      default:
        return <DashboardHub />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="neo-outset rounded-2xl p-8 flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
          <p className="text-muted-foreground">Loading Executive AI Club...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="neo-outset rounded-2xl p-8 text-center max-w-md">
          <h1 className="text-2xl font-semibold mb-4">Executive AI Club</h1>
          <p className="text-muted-foreground mb-6">
            Please sign in to access the premium platform for AI leadership.
          </p>
          <div className="neo-flat rounded-xl p-4 bg-accent/5">
            <p className="text-sm text-muted-foreground">
              You will be redirected to sign in automatically.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Header 
          title={getPageTitle()} 
          subtitle={getPageSubtitle()}
          onNavigate={setActiveTab}
        />
        
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
      </div>

      {/* AI Assistant - Available everywhere */}
      <EnhancedAIAssistant currentSection={activeTab} />
    </div>
  )
}

export default App