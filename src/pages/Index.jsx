import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/Auth/LoginForm';
import { Header } from '@/components/Layout/Header';
import { ReportForm } from '@/components/Citizen/ReportForm';
import { PoliceDashboard } from '@/components/Police/PoliceDashboard';

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('home');

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    if (user?.role === 'police') {
      return <PoliceDashboard />;
    }

    switch (currentPage) {
      case 'report':
        return <ReportForm onReportSubmitted={() => setCurrentPage('home')} />;
      default:
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Welcome to Citizen Guard Portal
              </h1>
              <p className="text-xl text-muted-foreground">
                Help protect your community by reporting suspicious banking applications
              </p>
              <div className="grid gap-6 md:grid-cols-2 mt-12">
                <div className="p-6 bg-card rounded-lg border shadow-card">
                  <h3 className="text-xl font-semibold mb-3">Report Suspicious APK</h3>
                  <p className="text-muted-foreground mb-4">
                    Found a fake banking app? Report it to help protect others from fraud.
                  </p>
                </div>
                <div className="p-6 bg-card rounded-lg border shadow-card">
                  <h3 className="text-xl font-semibold mb-3">Stay Protected</h3>
                  <p className="text-muted-foreground mb-4">
                    Learn how to identify fake banking apps and protect your financial information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onNavigate={setCurrentPage} />
      <main>
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;