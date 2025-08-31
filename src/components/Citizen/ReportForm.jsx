import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Shield, AlertTriangle, Upload } from 'lucide-react';

export function ReportForm({ onReportSubmitted }) {
  const [formData, setFormData] = useState({
    suspiciousAppName: '',
    downloadSource: '',
    threatLevel: '',
    description: '',
    victimName: '',
    contactInfo: '',
    evidenceFile: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, evidenceFile: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Report Submitted Successfully",
        description: "Thank you for helping protect our community. We'll investigate this report.",
      });

      // Reset form
      setFormData({
        suspiciousAppName: '',
        downloadSource: '',
        threatLevel: '',
        description: '',
        victimName: '',
        contactInfo: '',
        evidenceFile: null
      });

      onReportSubmitted?.();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-4 shadow-glow">
            <AlertTriangle className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Report Suspicious Banking APK</h1>
          <p className="text-muted-foreground">
            Help us identify and stop fake banking applications that threaten our community
          </p>
        </div>

        <Card className="shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Incident Report Form
            </CardTitle>
            <CardDescription>
              Please provide as much detail as possible to help our investigation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="suspiciousAppName">Suspicious App Name *</Label>
                  <Input
                    id="suspiciousAppName"
                    placeholder="e.g., Fake Bank App"
                    value={formData.suspiciousAppName}
                    onChange={(e) => handleInputChange('suspiciousAppName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="downloadSource">Download Source *</Label>
                  <Input
                    id="downloadSource"
                    placeholder="e.g., unknown website, SMS link"
                    value={formData.downloadSource}
                    onChange={(e) => handleInputChange('downloadSource', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="threatLevel">Threat Level *</Label>
                <Select onValueChange={(value) => handleInputChange('threatLevel', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select threat level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low - Suspicious but no confirmed damage</SelectItem>
                    <SelectItem value="medium">Medium - Attempted fraud or data theft</SelectItem>
                    <SelectItem value="high">High - Financial loss or identity theft</SelectItem>
                    <SelectItem value="critical">Critical - Ongoing attack or widespread threat</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Detailed Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what happened, how you encountered the app, any suspicious behavior, etc."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="victimName">Your Name *</Label>
                  <Input
                    id="victimName"
                    placeholder="Full name"
                    value={formData.victimName}
                    onChange={(e) => handleInputChange('victimName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactInfo">Contact Information *</Label>
                  <Input
                    id="contactInfo"
                    type="email"
                    placeholder="Email or phone number"
                    value={formData.contactInfo}
                    onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="evidenceFile">Evidence File (Optional)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="evidenceFile"
                    type="file"
                    accept=".apk,.jpg,.png,.pdf"
                    onChange={handleFileChange}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
                  />
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload APK file, screenshots, or other evidence (Max 10MB)
                </p>
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-primary hover:opacity-90 shadow-cyber transition-smooth"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={onReportSubmitted}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}