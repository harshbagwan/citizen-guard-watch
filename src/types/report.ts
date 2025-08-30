export interface Report {
  id: string;
  victimName: string;
  email: string;
  phone?: string;
  apkFileName: string;
  apkUrl?: string;
  description: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'investigating' | 'resolved' | 'closed';
  reportDate: Date;
  citizenId: string;
  assignedOfficer?: string;
  evidence?: {
    screenshots?: string[];
    additionalFiles?: string[];
  };
  malwareAnalysis?: {
    isConfirmedMalware: boolean;
    threatType?: string;
    affectedBanks?: string[];
    similarCases?: string[];
  };
}

export interface ReportFormData {
  victimName: string;
  email: string;
  phone?: string;
  apkFileName: string;
  apkUrl?: string;
  description: string;
  bankName: string;
  howObtained: string;
}