import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FileText, AlertTriangle, Upload, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { ReportFormData } from '@/types/report';

interface ReportFormProps {
  onReportSubmitted: () => void;
}

export function ReportForm({ onReportSubmitted }: ReportFormProps) {
  const [formData, setFormData] = useState<ReportFormData>({
    victimName: '',
    email: '',
    phone: '',
    apkFileName: '',
    apkUrl: '',
    description: '',
    bankName: '',
    howObtained: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof ReportFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock API call - in real app, this would submit to backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Report Submitted Successfully",
        description: "Your report has been received and will be reviewed by cyber police officers.",
      });

      // Reset form
      setFormData({
        victimName: '',
        email: '',
        phone: '',
        apkFileName: '',
        apkUrl: '',
        description: '',
        bankName: '',
        howObtained: ''
      });

      onReportSubmitted();
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Report Suspicious Banking APK
        </h1>
        <p className="text-muted-foreground">
          Help protect the community by reporting fake banking applications
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Report Details
              </CardTitle>
              <CardDescription>
                Please provide as much information as possible about the suspicious APK
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="victimName">Your Name *</Label>
                    <Input
                      id="victimName"
                      value={formData.victimName}
                      onChange={(e) => handleInputChange('victimName', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* APK Information */}
                <div className="space-y-4 p-4 bg-accent/30 rounded-lg border border-accent">
                  <h3 className="font-semibold text-lg">APK Information</h3>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="apkFileName">APK File Name *</Label>
                      <Input
                        id="apkFileName"
                        value={formData.apkFileName}
                        onChange={(e) => handleInputChange('apkFileName', e.target.value)}
                        placeholder="e.g., banking_app.apk"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Which Bank Was Impersonated? *</Label>
                      <Select onValueChange={(value) => handleInputChange('bankName', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select bank" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="chase">Chase Bank</SelectItem>
                          <SelectItem value="bofa">Bank of America</SelectItem>
                          <SelectItem value="wells">Wells Fargo</SelectItem>
                          <SelectItem value="citi">Citibank</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apkUrl">Download URL (if available)</Label>
                    <Input
                      id="apkUrl"
                      type="url"
                      value={formData.apkUrl}
                      onChange={(e) => handleInputChange('apkUrl', e.target.value)}
                      placeholder="https://suspicious-site.com/app.apk"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="howObtained">How did you obtain this APK? *</Label>
                    <Select onValueChange={(value) => handleInputChange('howObtained', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sms">SMS/Text Message</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Incident Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Incident Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Please describe what happened, any suspicious behavior you noticed, and any financial impact..."
                    rows={6}
                    required
                  />
                </div>

                {/* File Upload Placeholder */}
                <div className="space-y-2">
                  <Label>Evidence (Screenshots, Files)</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Drag and drop files here or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Screenshots, APK files, or other evidence (Max 10MB each)
                    </p>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:opacity-90 shadow-cyber"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Submitting Report...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Report
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <AlertTriangle className="h-5 w-5" />
                Important Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  <strong>Response Time:</strong> Reports are typically reviewed within 24-48 hours by our cyber police team.
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertDescription>
                  <strong>Privacy:</strong> Your information is encrypted and only accessible to authorized cyber police officers.
                </AlertDescription>
              </Alert>

              <Alert>
                <AlertDescription>
                  <strong>Follow-up:</strong> You may be contacted for additional information if needed for the investigation.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader>
              <CardTitle>What to Look For</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li>• Apps asking for excessive permissions</li>
                <li>• Unofficial app store downloads</li>
                <li>• Suspicious URLs or SMS links</li>
                <li>• Apps with poor graphics or spelling errors</li>
                <li>• Requests for banking credentials outside official apps</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}