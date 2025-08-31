import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, User, Mail, Download, Calendar, MapPin } from 'lucide-react';

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

export function ReportDetail({ report, onStatusChange }) {
  if (!report) return null;

  const handleStatusChange = (newStatus) => {
    onStatusChange(report.id, newStatus);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Report #{report.id}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {report.suspiciousAppName}
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant={getThreatColor(report.threatLevel)}>
            {report.threatLevel} threat
          </Badge>
          <Badge variant={getStatusColor(report.status)}>
            {report.status}
          </Badge>
        </div>
      </div>

      <Separator />

      {/* Reporter Information */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm">Reporter Information</h4>
        <div className="grid gap-3 md:grid-cols-2 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span><strong>Name:</strong> {report.victimName}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span><strong>Contact:</strong> {report.contactInfo}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span><strong>Reported:</strong> {report.reportDate.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span><strong>Source:</strong> {report.downloadSource}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Incident Details */}
      <div className="space-y-3">
        <h4 className="font-semibold text-sm">Incident Details</h4>
        <div className="p-3 bg-muted/50 rounded-lg">
          <p className="text-sm leading-relaxed">{report.description}</p>
        </div>
      </div>

      {/* Evidence */}
      {report.evidenceFile && (
        <>
          <Separator />
          <div className="space-y-3">
            <h4 className="font-semibold text-sm">Evidence</h4>
            <div className="flex items-center gap-2 p-3 border rounded-lg">
              <Download className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">{report.evidenceFile}</span>
              <Button size="sm" variant="outline" className="ml-auto">
                Download
              </Button>
            </div>
          </div>
        </>
      )}

      <Separator />

      {/* Investigation Actions */}
      <div className="space-y-4">
        <h4 className="font-semibold text-sm">Investigation Actions</h4>
        
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium">Update Status</label>
            <Select onValueChange={handleStatusChange} defaultValue={report.status}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending Review</SelectItem>
                <SelectItem value="investigating">Under Investigation</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2 md:grid-cols-2">
            <Button variant="outline" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Analyze APK
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Contact Reporter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}