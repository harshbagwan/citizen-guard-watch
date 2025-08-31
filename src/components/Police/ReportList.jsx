import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Clock, Eye } from 'lucide-react';

const getThreatColor = (level) => {
  switch (level) {
    case 'critical': return 'destructive';
    case 'high': return 'destructive';
    case 'medium': return 'default';
    case 'low': return 'secondary';
    default: return 'default';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'pending': return 'outline';
    case 'investigating': return 'default';
    case 'resolved': return 'secondary';
    default: return 'outline';
  }
};

export function ReportList({ reports, onSelectReport, selectedReportId }) {
  return (
    <div className="space-y-3 max-h-96 overflow-y-auto">
      {reports.map((report) => (
        <div
          key={report.id}
          className={`p-4 border rounded-lg cursor-pointer transition-smooth hover:border-primary/50 ${
            selectedReportId === report.id ? 'border-primary bg-primary/5' : ''
          }`}
          onClick={() => onSelectReport(report)}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-500" />
              <h4 className="font-semibold text-sm">{report.suspiciousAppName}</h4>
            </div>
            <Badge variant={getThreatColor(report.threatLevel)} className="text-xs">
              {report.threatLevel}
            </Badge>
          </div>
          
          <div className="space-y-1 text-xs text-muted-foreground">
            <p><strong>Reporter:</strong> {report.victimName}</p>
            <p><strong>Source:</strong> {report.downloadSource}</p>
            <p><strong>Date:</strong> {report.reportDate.toLocaleDateString()}</p>
          </div>

          <div className="flex items-center justify-between mt-3">
            <Badge variant={getStatusColor(report.status)} className="text-xs">
              {report.status}
            </Badge>
            
            <Button
              size="sm"
              variant="ghost"
              className="h-8 px-2"
              onClick={(e) => {
                e.stopPropagation();
                onSelectReport(report);
              }}
            >
              <Eye className="h-3 w-3 mr-1" />
              View
            </Button>
          </div>
        </div>
      ))}
      
      {reports.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p>No reports available</p>
        </div>
      )}
    </div>
  );
}