import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Search,
  Filter,
  BarChart3,
  Users,
  FileText
} from 'lucide-react';
import { Report } from '@/types/report';
import { ReportList } from './ReportList';
import { ReportDetail } from './ReportDetail';
import { mockReports } from '@/services/mockData';

export function PoliceDashboard() {
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [riskFilter, setRiskFilter] = useState<string>('all');

  useEffect(() => {
    // Load mock data
    setReports(mockReports);
  }, []);

  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.victimName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.apkFileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesRisk = riskFilter === 'all' || report.riskLevel === riskFilter;
    
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const getStatusCount = (status: string) => {
    return reports.filter(r => r.status === status).length;
  };

  const getRiskCount = (risk: string) => {
    return reports.filter(r => r.riskLevel === risk).length;
  };

  const updateReportStatus = (reportId: string, status: Report['status']) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, status } : report
    ));
    if (selectedReport?.id === reportId) {
      setSelectedReport(prev => prev ? { ...prev, status } : null);
    }
  };

  const assignReport = (reportId: string, officer: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId ? { ...report, assignedOfficer: officer } : report
    ));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Cyber Police Dashboard
        </h1>
        <p className="text-muted-foreground">
          Monitor and investigate fake banking APK reports
        </p>
      </div>

      {/* Statistics Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reports.length}</div>
            <p className="text-xs text-muted-foreground">
              All time submissions
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">
              {getStatusCount('pending')}
            </div>
            <p className="text-xs text-muted-foreground">
              Awaiting action
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {getStatusCount('investigating')}
            </div>
            <p className="text-xs text-muted-foreground">
              Under investigation
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">
              {getStatusCount('resolved')}
            </div>
            <p className="text-xs text-muted-foreground">
              Cases closed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="reports">Reports Management</TabsTrigger>
          <TabsTrigger value="analytics">Risk Analytics</TabsTrigger>
          <TabsTrigger value="threats">Threat Intelligence</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          {selectedReport ? (
            <div className="space-y-6">
              <Button 
                variant="outline" 
                onClick={() => setSelectedReport(null)}
                className="mb-4"
              >
                ← Back to Reports List
              </Button>
              <ReportDetail 
                report={selectedReport} 
                onStatusUpdate={updateReportStatus}
                onAssignOfficer={assignReport}
              />
            </div>
          ) : (
            <>
              {/* Filters and Search */}
              <Card className="shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="h-5 w-5" />
                    Filters & Search
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search reports..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="investigating">Investigating</SelectItem>
                        <SelectItem value="resolved">Resolved</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select value={riskFilter} onValueChange={setRiskFilter}>
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by risk" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Risk Levels</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button variant="outline" onClick={() => {
                      setSearchTerm('');
                      setStatusFilter('all');
                      setRiskFilter('all');
                    }}>
                      Clear Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <ReportList 
                reports={filteredReports}
                onSelectReport={setSelectedReport}
              />
            </>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Risk Level Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive">Critical</Badge>
                      <span className="text-sm text-muted-foreground">
                        {getRiskCount('critical')} reports
                      </span>
                    </div>
                    <div className="text-sm font-semibold">
                      {Math.round((getRiskCount('critical') / reports.length) * 100)}%
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="destructive">High</Badge>
                      <span className="text-sm text-muted-foreground">
                        {getRiskCount('high')} reports
                      </span>
                    </div>
                    <div className="text-sm font-semibold">
                      {Math.round((getRiskCount('high') / reports.length) * 100)}%
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">Medium</Badge>
                      <span className="text-sm text-muted-foreground">
                        {getRiskCount('medium')} reports
                      </span>
                    </div>
                    <div className="text-sm font-semibold">
                      {Math.round((getRiskCount('medium') / reports.length) * 100)}%
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Low</Badge>
                      <span className="text-sm text-muted-foreground">
                        {getRiskCount('low')} reports
                      </span>
                    </div>
                    <div className="text-sm font-semibold">
                      {Math.round((getRiskCount('low') / reports.length) * 100)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Response Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">2.4h</div>
                    <p className="text-sm text-muted-foreground">Avg Response Time</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">94%</div>
                    <p className="text-sm text-muted-foreground">Resolution Rate</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">12</div>
                    <p className="text-sm text-muted-foreground">Active Officers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="threats" className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Threat Intelligence Feed
              </CardTitle>
              <CardDescription>
                Latest security alerts and threat patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-destructive">High Priority Alert</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        New variant of banking trojan "FakeBank2024" detected targeting Chase Bank customers. 
                        APK signature: d4e5f6g7h8i9j0k1l2m3n4o5
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-warning/20 rounded-lg bg-warning/5">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-warning">Medium Priority Alert</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Increased activity from malicious domain "secure-banking-app.net" - 
                        blocking recommended for all networks.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">6 hours ago</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-primary/20 rounded-lg bg-primary/5">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-primary">Security Update</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Enhanced detection algorithms deployed. New ML model shows 98.5% accuracy 
                        in identifying fake banking APKs.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">1 day ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}