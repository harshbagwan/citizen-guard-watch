import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  User, 
  Calendar,
  FileText,
  ExternalLink
} from 'lucide-react';
import { Report } from '@/types/report';

interface ReportListProps {
  reports: Report[];
  onSelectReport: (report: Report) => void;
}

export function ReportList({ reports, onSelectReport }: ReportListProps) {
  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'investigating':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <FileText className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: Report['status']) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'investigating':
        return <Badge variant="destructive">Investigating</Badge>;
      case 'resolved':
        return <Badge variant="default" className="bg-success text-success-foreground">Resolved</Badge>;
      case 'closed':
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRiskBadge = (risk: Report['riskLevel']) => {
    switch (risk) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="outline">{risk}</Badge>;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (reports.length === 0) {
    return (
      <Card className="shadow-card">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            No Reports Found
          </h3>
          <p className="text-sm text-muted-foreground text-center">
            No reports match your current filters. Try adjusting the search criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          Reports ({reports.length})
        </h2>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id} className="shadow-card hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-4 md:items-center">
                {/* Report Info */}
                <div className="md:col-span-2 space-y-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(report.status)}
                    <h3 className="font-semibold text-lg truncate">
                      {report.apkFileName}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{report.victimName}</span>
                    <span>•</span>
                    <span>{report.email}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(report.reportDate)}</span>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {report.description}
                  </p>
                </div>

                {/* Status and Risk */}
                <div className="space-y-2">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Status</p>
                    {getStatusBadge(report.status)}
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Risk Level</p>
                    {getRiskBadge(report.riskLevel)}
                  </div>

                  {report.assignedOfficer && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">Assigned</p>
                      <p className="text-sm">{report.assignedOfficer}</p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => onSelectReport(report)}
                    variant="default"
                    size="sm"
                    className="w-full"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    View Details
                  </Button>

                  {report.status === 'pending' && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                    >
                      Quick Assign
                    </Button>
                  )}
                </div>
              </div>

              {/* Additional Info Bar */}
              <div className="mt-4 pt-4 border-t border-border/50">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>ID: {report.id}</span>
                  
                  {report.malwareAnalysis?.isConfirmedMalware && (
                    <div className="flex items-center gap-1 text-destructive">
                      <AlertTriangle className="h-3 w-3" />
                      <span>Confirmed Malware</span>
                    </div>
                  )}
                  
                  {report.malwareAnalysis?.threatType && (
                    <span>Type: {report.malwareAnalysis.threatType}</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}