import { Report } from '@/types/report';

export const mockReports: Report[] = [
  {
    id: 'RPT-2024-001',
    victimName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    apkFileName: 'chase_mobile_banking.apk',
    apkUrl: 'https://suspicious-banking-site.com/chase_app.apk',
    description: 'I received an SMS claiming to be from Chase Bank asking me to update my mobile app for security reasons. The link led to a website that looked legitimate, but when I downloaded the app, it started asking for my login credentials immediately without proper authentication screens. The app also requested permissions for camera, microphone, and SMS access which seemed suspicious for a banking app.',
    riskLevel: 'critical',
    status: 'investigating',
    reportDate: new Date('2024-01-15T10:30:00'),
    citizenId: '1',
    assignedOfficer: 'Officer Smith',
    malwareAnalysis: {
      isConfirmedMalware: true,
      threatType: 'Banking Trojan',
      affectedBanks: ['Chase Bank', 'JPMorgan Chase'],
      similarCases: ['RPT-2024-003', 'RPT-2024-007']
    }
  },
  {
    id: 'RPT-2024-002',
    victimName: 'Michael Chen',
    email: 'mchen@gmail.com',
    phone: '+1 (555) 987-6543',
    apkFileName: 'wells_fargo_secure.apk',
    apkUrl: 'https://wf-secure-banking.net/download/app.apk',
    description: 'Got a call from someone claiming to be Wells Fargo security department saying my account was compromised. They sent me a link via email to download a "secure" version of the Wells Fargo app. The app looked almost identical to the real one but had some spelling mistakes. After entering my login details, I started receiving unauthorized transaction notifications.',
    riskLevel: 'high',
    status: 'pending',
    reportDate: new Date('2024-01-14T15:45:00'),
    citizenId: '2',
    malwareAnalysis: {
      isConfirmedMalware: false,
      threatType: 'Suspected Banking Phishing',
      affectedBanks: ['Wells Fargo']
    }
  },
  {
    id: 'RPT-2024-003',
    victimName: 'Emily Rodriguez',
    email: 'emily.r@outlook.com',
    apkFileName: 'bank_of_america_mobile.apk',
    description: 'Found this app on a third-party app store when searching for Bank of America mobile app. The icon looked correct but the app size was much smaller than expected. When I opened it, it had a very basic interface and immediately asked for my social security number, which the real BoA app has never done.',
    riskLevel: 'medium',
    status: 'resolved',
    reportDate: new Date('2024-01-13T09:15:00'),
    citizenId: '3',
    assignedOfficer: 'Officer Johnson',
    malwareAnalysis: {
      isConfirmedMalware: true,
      threatType: 'Credential Harvester',
      affectedBanks: ['Bank of America'],
      similarCases: ['RPT-2024-001']
    }
  },
  {
    id: 'RPT-2024-004',
    victimName: 'David Thompson',
    email: 'dthompson@yahoo.com',
    phone: '+1 (555) 456-7890',
    apkFileName: 'citibank_mobile_secure.apk',
    apkUrl: 'https://citi-mobile-security.org/secure-app.apk',
    description: 'Received a WhatsApp message from an unknown number claiming to be Citibank customer service. They said there was suspicious activity on my account and I needed to download an updated app immediately. The download link took me to a website that looked like Citibank but the URL was different. The app they provided had the Citibank logo but the interface was clunky and asked for more information than usual.',
    riskLevel: 'high',
    status: 'investigating',
    reportDate: new Date('2024-01-12T14:20:00'),
    citizenId: '4',
    assignedOfficer: 'Officer Williams',
    malwareAnalysis: {
      isConfirmedMalware: false,
      threatType: 'Suspected Social Engineering'
    }
  },
  {
    id: 'RPT-2024-005',
    victimName: 'Lisa Wang',
    email: 'lisa.wang@email.com',
    apkFileName: 'usbank_mobile_app.apk',
    description: 'Downloaded what I thought was the US Bank app from an email link. The app worked normally for a few days, but then I noticed my battery draining faster and my phone heating up. I also started receiving SMS codes I never requested. When I checked my real US Bank account through their website, I saw several failed login attempts from unknown locations.',
    riskLevel: 'critical',
    status: 'pending',
    reportDate: new Date('2024-01-11T11:30:00'),
    citizenId: '5'
  },
  {
    id: 'RPT-2024-006',
    victimName: 'Robert Garcia',
    email: 'rgarcia@gmail.com',
    phone: '+1 (555) 234-5678',
    apkFileName: 'pnc_bank_mobile.apk',
    description: 'Clicked on a Facebook ad for a "new and improved" PNC Bank mobile app with enhanced security features. The ad looked professional and even had testimonials. After downloading and installing, the app asked for permissions to access my contacts, location, and storage, which seemed excessive. The login screen also had a slightly different layout than the official PNC app I had used before.',
    riskLevel: 'medium',
    status: 'closed',
    reportDate: new Date('2024-01-10T16:45:00'),
    citizenId: '6',
    assignedOfficer: 'Officer Brown'
  },
  {
    id: 'RPT-2024-007',
    victimName: 'Amanda Foster',
    email: 'afoster@hotmail.com',
    apkFileName: 'chase_quickpay.apk',
    apkUrl: 'https://chase-quickpay-secure.com/app.apk',
    description: 'Got an urgent email saying my Chase QuickPay feature was being discontinued unless I updated to their new app. The email had Chase branding and looked legitimate. However, after installing the app from the provided link, I noticed it was asking for my mother\'s maiden name and childhood address, which are security questions the real Chase app handles differently.',
    riskLevel: 'high',
    status: 'resolved',
    reportDate: new Date('2024-01-09T13:10:00'),
    citizenId: '7',
    assignedOfficer: 'Officer Smith',
    malwareAnalysis: {
      isConfirmedMalware: true,
      threatType: 'Banking Trojan',
      affectedBanks: ['Chase Bank'],
      similarCases: ['RPT-2024-001', 'RPT-2024-003']
    }
  },
  {
    id: 'RPT-2024-008',
    victimName: 'Kevin Martinez',
    email: 'kmartinez@gmail.com',
    apkFileName: 'credit_union_mobile.apk',
    description: 'My local credit union supposedly sent me an email about a mandatory app update due to new federal banking regulations. The app they linked to had their logo and name, but after installation, it started running in the background constantly and I noticed my data usage increased significantly. The app also had features that my credit union never offered, like cryptocurrency trading.',
    riskLevel: 'medium',
    status: 'pending',
    reportDate: new Date('2024-01-08T08:25:00'),
    citizenId: '8'
  }
];