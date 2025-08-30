import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  FileText, 
  AlertTriangle,
  Shield,
  Link,
  Download,
  MessageSquare,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Report } from '@/types/report';
import { useToast } from '@/hooks/use-toast';

interface ReportDetailProps {
  report: Report;
  onStatusUpdate: (reportId: string, status: Report['status']) => void;
  onAssignOfficer: (reportId: string, officer: string) => void;
}

export function ReportDetail({ report, onStatusUpdate, onAssignOfficer }: ReportDetailProps) {
  const [notes, setNotes] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleStatusUpdate = async (newStatus: Report['status']) => {
    setIsUpdating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      onStatusUpdate(report.id, newStatus);
      toast({
        title: "Status Updated",
        description: `Report status changed to ${newStatus}`,
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAssignOfficer = async (officer: string) => {
    try {
      onAssignOfficer(report.id, officer);
      toast({
        title: "Officer Assigned",
        description: `Report assigned to ${officer}`,
      });
    } catch (error) {
      toast({
        title: "Assignment Failed",
        description: "Could not assign officer to this report",
        variant: "destructive",
      });
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'pending': return 'text-warning';
      case 'investigating': return 'text-destructive';
      case 'resolved': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskColor = (risk: Report['riskLevel']) => {
    switch (risk) {
      case 'critical': return 'text-destructive';
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl">{report.apkFileName}</CardTitle>
                  <CardDescription className="mt-2">
                    Report ID: {report.id} • Submitted {formatDate(report.reportDate)}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant={report.riskLevel === 'critical' || report.riskLevel === 'high' ? 'destructive' : 'secondary'}>
                    {report.riskLevel.charAt(0).toUpperCase() + report.riskLevel.slice(1)} Risk
                  </Badge>
                  <Badge variant={report.status === 'resolved' ? 'default' : 'secondary'} className={
                    report.status === 'resolved' ? 'bg-success text-success-foreground' : ''
                  }>
                    {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Victim Information */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Victim Information
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Name:</span>
                    <span>{report.victimName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Email:</span>
                    <span>{report.email}</span>
                  </div>
                  {report.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">Phone:</span>
                      <span>{report.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Reported:</span>
                    <span>{formatDate(report.reportDate)}</span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* APK Details */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  APK Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium">File Name:</span>
                    <span className="ml-2 font-mono text-sm bg-accent px-2 py-1 rounded">
                      {report.apkFileName}
                    </span>
                  </div>
                  
                  {report.apkUrl && (
                    <div>
                      <span className="font-medium">Download URL:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Link className="h-4 w-4 text-muted-foreground" />
                        <a 
                          href={report.apkUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm font-mono"
                        >
                          {report.apkUrl}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />

              {/* Incident Description */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Incident Description
                </h3>
                <div className="bg-accent/30 p-4 rounded-lg border">
                  <p className="text-sm leading-relaxed">{report.description}</p>
                </div>
              </div>

              {/* Malware Analysis */}
              {report.malwareAnalysis && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Malware Analysis Results
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Confirmed Malware:</span>
                        {report.malwareAnalysis.isConfirmedMalware ? (
                          <Badge variant="destructive">
                            <AlertTriangle className="h-3 w-3 mr-1" />
                            Confirmed
                          </Badge>
                        ) : (
                          <Badge variant="outline">Pending Analysis</Badge>
                        )}
                      </div>

                      {report.malwareAnalysis.threatType && (
                        <div>
                          <span className="font-medium">Threat Type:</span>
                          <span className="ml-2">{report.malwareAnalysis.threatType}</span>
                        </div>
                      )}

                      {report.malwareAnalysis.affectedBanks && report.malwareAnalysis.affectedBanks.length > 0 && (
                        <div>
                          <span className="font-medium">Affected Banks:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {report.malwareAnalysis.affectedBanks.map(bank => (
                              <Badge key={bank} variant="outline" className="text-xs">
                                {bank}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions Sidebar */}
        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Case Management</CardTitle>
              <CardDescription>Update status and assignment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Status Update</label>
                <Select 
                  value={report.status} 
                  onValueChange={(value) => handleStatusUpdate(value as Report['status'])}
                  disabled={isUpdating}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-warning" />
                        Pending
                      </div>
                    </SelectItem>
                    <SelectItem value="investigating">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                        Investigating
                      </div>
                    </SelectItem>
                    <SelectItem value="resolved">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-success" />
                        Resolved
                      </div>
                    </SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Assign Officer</label>
                <Select 
                  value={report.assignedOfficer || ''} 
                  onValueChange={handleAssignOfficer}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select officer..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Officer Smith">Officer Smith</SelectItem>
                    <SelectItem value="Officer Johnson">Officer Johnson</SelectItem>
                    <SelectItem value="Officer Williams">Officer Williams</SelectItem>
                    <SelectItem value="Officer Brown">Officer Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Evidence
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Investigation Notes</CardTitle>
              <CardDescription>Add internal notes and observations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Add investigation notes, findings, or next steps..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
              />
              <Button className="w-full">
                Save Notes
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                Contact Victim
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Generate Report
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Share with Team
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive">
                Flag as Priority
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}