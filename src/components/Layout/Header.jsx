import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Shield, LogOut, User } from 'lucide-react';

export function Header({ onNavigate }) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-cyber border-b border-cyber-light/20 shadow-cyber">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-primary-glow/20 p-2 rounded-lg">
              <Shield className="h-8 w-8 text-primary-glow" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-foreground">
                Citizen Guard Portal
              </h1>
              <p className="text-sm text-primary-foreground/70">
                Fake Banking APK Detection & Response
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <div className="flex items-center space-x-2 text-primary-foreground/90">
                  <User className="h-4 w-4" />
                  <span className="text-sm">
                    {user.name} ({user.role === 'police' ? 'Officer' : 'Citizen'})
                  </span>
                </div>
                
                {user.role === 'citizen' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate('report')}
                    className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
                  >
                    Submit Report
                  </Button>
                )}
                
                {user.role === 'police' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onNavigate('dashboard')}
                    className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10"
                  >
                    Dashboard
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}