import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ReportList } from './ReportList';
import { ReportDetail } from './ReportDetail';
import { Shield, AlertTriangle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

// Mock data for demonstration
const mockReports = [
  {
    id: 1,
    suspiciousAppName: 'Fake SBI Banking',
    victimName: 'John Doe',
    contactInfo: 'john@example.com',
    downloadSource: 'SMS Link',
    threatLevel: 'high',
    description: 'Received a fake SBI banking app through SMS. The app asked for banking credentials and OTP.',
    status: 'pending',
    reportDate: new Date('2024-01-15'),
    evidenceFile: 'fake_sbi.apk'
  },
  {
    id: 2,
    suspiciousAppName: 'HDFC Mobile Banking Clone',
    victimName: 'Jane Smith',
    contactInfo: 'jane@example.com',
    downloadSource: 'WhatsApp Forward',
    threatLevel: 'critical',
    description: 'Perfect clone of HDFC app stealing login credentials. Multiple users affected.',
    status: 'investigating',
    reportDate: new Date('2024-01-14'),
    evidenceFile: 'hdfc_clone.apk'
  },
  {
    id: 3,
    suspiciousAppName: 'Axis Bank Fake',
    victimName: 'Mike Johnson',
    contactInfo: 'mike@example.com',
    downloadSource: 'Email Link',
    threatLevel: 'medium',
    description: 'Suspicious banking app with poor UI and asking for excessive permissions.',
    status: 'resolved',
    reportDate: new Date('2024-01-13'),
    evidenceFile: null
  }
];

export function PoliceDashboard() {
  const [reports, setReports] = useState(mockReports);
  const [selectedReport, setSelectedReport] = useState(null);

  const stats = {
    totalReports: reports.length,
    pendingReports: reports.filter(r => r.status === 'pending').length,
    investigatingReports: reports.filter(r => r.status === 'investigating').length,
    resolvedReports: reports.filter(r => r.status === 'resolved').length
  };

  const handleStatusChange = (reportId, newStatus) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, status: newStatus } : report
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-gradient-primary p-3 rounded-lg shadow-glow">
          <Shield className="h-8 w-8 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Cyber Police Dashboard</h1>
          <p className="text-muted-foreground">Monitor and investigate fake banking APK reports</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReports}</div>
            <p className="text-xs text-muted-foreground">All time reports</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-500">{stats.pendingReports}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investigating</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">{stats.investigatingReports}</div>
            <p className="text-xs text-muted-foreground">Under investigation</p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{stats.resolvedReports}</div>
            <p className="text-xs text-muted-foreground">Successfully closed</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="reports" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">Active Reports</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="tools">Investigation Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Report List</CardTitle>
                <CardDescription>Click on a report to view details</CardDescription>
              </CardHeader>
              <CardContent>
                <ReportList 
                  reports={reports} 
                  onSelectReport={setSelectedReport}
                  selectedReportId={selectedReport?.id}
                />
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Report Details</CardTitle>
                <CardDescription>
                  {selectedReport ? 'Investigation details and actions' : 'Select a report to view details'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedReport ? (
                  <ReportDetail 
                    report={selectedReport} 
                    onStatusChange={handleStatusChange}
                  />
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Select a report from the list to view details
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Threat Analytics</CardTitle>
              <CardDescription>Overview of APK threat patterns and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Threat Distribution</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>High Priority</span>
                        <Badge variant="destructive">1</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Critical Priority</span>
                        <Badge variant="destructive">1</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Medium Priority</span>
                        <Badge variant="secondary">1</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Common Sources</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>SMS Links</span>
                        <span className="text-sm">33%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>WhatsApp</span>
                        <span className="text-sm">33%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Email Links</span>
                        <span className="text-sm">33%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Investigation Tools</CardTitle>
              <CardDescription>Tools for analyzing suspicious APK files</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Button className="h-20 flex flex-col gap-2">
                  <Shield className="h-6 w-6" />
                  APK Analyzer
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2">
                  <AlertTriangle className="h-6 w-6" />
                  Threat Scanner
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}