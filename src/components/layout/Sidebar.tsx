import { useState, useEffect } from 'react'
import { 
  Home, 
  GraduationCap, 
  Building2, 
  Users, 
  Briefcase, 
  Bot,
  Calendar,
  Star,
  Settings,
  LogOut,
  MessageSquare,
  Newspaper,
  User
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { blink } from '@/blink/client'

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

interface UserProfile {
  full_name?: string;
  email?: string;
}

const navigation = [
  { id: 'dashboard', label: 'Dashboard Hub', icon: Home },
  { id: 'events', label: 'Events Center', icon: Calendar },
  { id: 'forum', label: 'Executive Forum', icon: MessageSquare },
  { id: 'news', label: 'AI News Feed', icon: Newspaper },
  { id: 'training', label: 'Training Center', icon: GraduationCap },
  { id: 'companies', label: 'Company Intelligence', icon: Building2 },
  { id: 'advisory', label: 'Advisory Board', icon: Users },
  { id: 'jobs', label: 'Jobs & Referrals', icon: Briefcase },
]

const userNavigation = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged(async (state) => {
      setUser(state.user);
      if (state.user) {
        setLoadingProfile(true);
        try {
          const profiles = await blink.db.user_profiles.list({
            where: { user_id: state.user.id },
            limit: 1
          });
          if (profiles.length > 0) {
            setProfile(profiles[0] as UserProfile);
          } else {
            setProfile(null); // No profile found
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          setProfile(null);
        } finally {
          setLoadingProfile(false);
        }
      }
    });
    return unsubscribe;
  }, []);

  const getInitials = () => {
    if (loadingProfile) return '...';
    if (profile?.full_name) {
      return profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase();
    }
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return <User className="w-5 h-5 text-gold" />;
  };

  return (
    <div className={cn(
      "h-screen bg-background border-r border-border transition-all duration-300 neo-inset",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl neo-outset bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="font-semibold text-foreground">Executive AI Club</h1>
              <p className="text-xs text-muted-foreground">Premium Platform</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
        {/* Main Navigation */}
        <div className="space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left",
                  isActive 
                    ? "neo-pressed bg-accent/10 text-accent border border-accent/20 gold-accent" 
                    : "neo-flat hover:neo-outset text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive && "text-accent"
                )} />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
                {isActive && !isCollapsed && (
                  <Star className="w-4 h-4 ml-auto text-gold fill-current" />
                )}
              </button>
            )
          })}
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-border"></div>

        {/* User Navigation */}
        <div className="space-y-2">
          {userNavigation.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left",
                  isActive 
                    ? "neo-pressed bg-accent/10 text-accent border border-accent/20 gold-accent" 
                    : "neo-flat hover:neo-outset text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive && "text-accent"
                )} />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
                {isActive && !isCollapsed && (
                  <Star className="w-4 h-4 ml-auto text-gold fill-current" />
                )}
              </button>
            )
          })}
          
          {/* Logout Button */}
          <button
            onClick={() => blink.auth.logout()}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 text-left neo-flat hover:neo-outset text-muted-foreground hover:text-red-500"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && (
              <span className="font-medium">Sign Out</span>
            )}
          </button>
        </div>
      </nav>

      {/* AI Assistant */}
      <div className="absolute bottom-20 left-4 right-4">
        <div className="neo-outset rounded-xl p-4 bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg neo-flat bg-accent/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-accent" />
            </div>
            {!isCollapsed && (
              <div>
                <p className="text-sm font-medium text-foreground">AI Assistant</p>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={() => onTabChange('profile')}
          className="w-full flex items-center gap-3 p-3 rounded-xl neo-flat hover:neo-outset transition-all duration-200"
        >
          <div className="w-10 h-10 rounded-xl neo-outset bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center border border-gold/30 text-gold font-bold">
            {getInitials()}
          </div>
          {!isCollapsed && (
            <div className="flex-1 text-left">
              <p className="text-sm font-medium text-foreground">{loadingProfile ? 'Loading...' : profile?.full_name || user?.email || 'Executive Member'}</p>
              <p className="text-xs text-gold">Premium Tier</p>
            </div>
          )}
        </button>
      </div>
    </div>
  )
}