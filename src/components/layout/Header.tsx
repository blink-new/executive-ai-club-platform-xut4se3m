import { Search, Settings, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import NotificationCenter from '../notifications/NotificationCenter'
import { blink } from '@/blink/client'

interface HeaderProps {
  title: string
  subtitle?: string
  onNavigate: (section: string) => void
}

interface UserProfile {
  full_name?: string;
  email?: string;
}

export function Header({ title, subtitle, onNavigate }: HeaderProps) {
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
            setProfile(null);
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
    return <User className="w-5 h-5" />;
  };

  return (
    <header className="h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 neo-flat">
      <div className="flex items-center justify-between h-full px-6">
        {/* Title Section */}
        <div>
          <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="w-64 pl-10 neo-inset border-0 bg-transparent focus:ring-2 focus:ring-accent/50"
            />
          </div>

          {/* Notifications */}
          <NotificationCenter />

          {/* Settings */}
          <Button 
            variant="ghost" 
            size="icon"
            className="neo-flat hover:neo-pressed"
            onClick={() => onNavigate('settings')}
          >
            <Settings className="w-5 h-5" />
          </Button>

          {/* Profile */}
          <Button 
            variant="ghost" 
            size="icon"
            className="neo-outset hover:neo-pressed w-10 h-10 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center border border-gold/30 text-gold font-bold"
            onClick={() => onNavigate('profile')}
          >
            {getInitials()}
          </Button>
        </div>
      </div>
    </header>
  )
}