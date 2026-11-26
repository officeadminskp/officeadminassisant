export type PageId = 'home' | 'about' | 'services' | 'pricing' | 'portfolio' | 'contact';

export type ServiceCategory =
  | 'All'
  | 'Data & Spreadsheets'
  | 'Documents & Conversion'
  | 'Presentations & Career'
  | 'Virtual & Admin Support';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: Exclude<ServiceCategory, 'All'>;
  shortDescription: string;
  deliverables: string[];
  turnaround: string;
  audience: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  subtitle: string;
  priceUsd: number;
  billingCycle: string;
  turnaround: string;
  featured?: boolean;
  features: string[];
}

export interface PortfolioCase {
  id: string;
  title: string;
  category: Exclude<ServiceCategory, 'All'>;
  clientType: string;
  timeframe: string;
  image: string;
  imageAlt: string;
  summary: string;
  metricValue: string;
  metricLabel: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  tools: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  outcome: string;
  quote: string;
}

/**
 * Resolves static asset URLs relative to Vite's configured BASE_URL
 * so images load cleanly on both root domains and GitHub Pages subpaths.
 */
export function assetPath(relativePath: string): string {
  const base = import.meta.env?.BASE_URL || './';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const cleanPath = relativePath.replace(/^\/+/, '');
  return `${normalizedBase}${cleanPath}`;
}

/**
 * EASY-TO-UPDATE SITE CONFIGURATION
 * Edit phone numbers, email, social URLs, and copy here in one place.
 */
export const SITE_CONFIG = {
  brandName: 'Office Admin Assistant',
  tagline: 'Your Trusted Partner for Professional Support',
  logoPath: assetPath('assets/aistudio/Office_Admin_Assistant_Logo_b94110ed.png'),
  email: 'officeadminskp@gmail.com',
  phoneDisplay: '+1 (555) 284-9104',
  phoneHref: 'tel:+15552849104',
  // Enter digits only with country code for direct WhatsApp chat links
  whatsappNumber: '15552849104',
  whatsappDefaultMessage:
    'Hello Office Admin Assistant, I would like to discuss administrative support for my project.',
  hours: 'Monday – Saturday · 8:00 AM – 8:00 PM (Online Global Support)',
  location: 'Remote Online Office Support · Serving Clients Worldwide',
  socialLinks: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com', handle: 'Office Admin Assistant' },
    { label: 'Facebook', href: 'https://www.facebook.com', handle: '@officeadminassistant' },
    { label: 'Instagram', href: 'https://www.instagram.com', handle: '@officeadminassistant' },
    { label: 'X (Twitter)', href: 'https://x.com', handle: '@officeadminassist' },
  ],
};

export function getWhatsAppUrl(customMessage?: string): string {
  const message = encodeURIComponent(customMessage || SITE_CONFIG.whatsappDefaultMessage);
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${message}`;
}

export const HERO_CONTENT = {
  headline: 'Your Trusted Partner for Professional Office Assistant Services',
  subtitle:
    'We provide reliable, accurate, and affordable administrative support to help you save time and grow your business.',
  primaryCta: 'Explore Our Services',
  secondaryCta: 'Contact Us',
  heroImage: assetPath('src/assets/images/hero_office_workspace_1795671205392.jpg'),
  heroImageAlt:
    'Administrative specialist working at a bright modern navy-and-white executive desk with structured charts and formatted reports',
};

export const KEY_METRICS = [
  { value: '99.8%', label: 'Verified Data Accuracy Across Double-Checked Sheets' },
  { value: '24 hrs', label: 'Standard Turnaround on Document & Data Tasks' },
  { value: '12', label: 'Dedicated Office & Virtual Support Disciplines' },
  { value: '100%', label: 'Strict NDA & Client File Confidentiality' },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'data-entry',
    number: '01',
    title: 'Data Entry Services',
    category: 'Data & Spreadsheets',
    shortDescription:
      'High-accuracy entry of invoices, CRM contacts, product catalogs, survey forms, and handwritten records into structured spreadsheets or databases.',
    deliverables: [
      'Online & offline database population',
      'Duplicate removal and field standardization',
      'Two-pass manual verification before delivery',
    ],
    turnaround: '12–24 hours',
    audience: 'Small Businesses · E-Commerce · Agencies',
  },
  {
    id: 'ms-word-formatting',
    number: '02',
    title: 'MS Word Document Formatting',
    category: 'Documents & Conversion',
    shortDescription:
      'Clean, publication-ready styling for corporate reports, theses, training manuals, contracts, and proposals with consistent headers and styles.',
    deliverables: [
      'Automated table of contents, headers & page numbering',
      'Consistent typography, tables & margin alignment',
      'Print-ready PDF and editable DOCX output',
    ],
    turnaround: '24 hours',
    audience: 'Students · Consultants · Companies',
  },
  {
    id: 'ms-excel-management',
    number: '03',
    title: 'MS Excel Data Management',
    category: 'Data & Spreadsheets',
    shortDescription:
      'Structured Excel workbooks built with clean formulas, pivot tables, data validation, conditional formatting, and clear executive charts.',
    deliverables: [
      'Custom formulas (XLOOKUP, SUMIFS, IF, INDEX/MATCH)',
      'Pivot tables and monthly reporting dashboards',
      'Spreadsheet cleanup, sorting, and error auditing',
    ],
    turnaround: '24–48 hours',
    audience: 'Finance Teams · Business Owners · Operations',
  },
  {
    id: 'pdf-conversion',
    number: '04',
    title: 'PDF to Word and Excel Conversion',
    category: 'Documents & Conversion',
    shortDescription:
      'Accurate manual conversion of scanned PDFs, bank statements, forms, and reports into cleanly editable Word documents and Excel tables.',
    deliverables: [
      'Exact layout preservation without broken columns',
      'Scanned document transcription and table rebuilding',
      'Proofread text and verified numeric totals',
    ],
    turnaround: '12–24 hours',
    audience: 'Accountants · Legal Offices · Students',
  },
  {
    id: 'copy-paste-work',
    number: '05',
    title: 'Copy-Paste Work',
    category: 'Data & Spreadsheets',
    shortDescription:
      'Methodical transfer of listings, directories, catalog specs, and records across websites, spreadsheets, CMS dashboards, and documents.',
    deliverables: [
      'Clean formatting stripped of stray web styles',
      'Consistent column mapping and naming rules',
      'Batch progress updates for large transfers',
    ],
    turnaround: 'Same day – 24 hours',
    audience: 'Online Stores · Realtors · Marketers',
  },
  {
    id: 'typing-services',
    number: '06',
    title: 'Typing Services',
    category: 'Documents & Conversion',
    shortDescription:
      'Fast, accurate retyping from handwritten notes, scanned manuscripts, images, books, and printed forms into clean digital documents.',
    deliverables: [
      '75+ WPM accurate transcription with spellcheck',
      'Custom spacing, heading hierarchy, and layout',
      'Delivered in DOCX, Google Docs, or TXT',
    ],
    turnaround: '12–24 hours',
    audience: 'Authors · Students · Individuals',
  },
  {
    id: 'cv-resume-making',
    number: '07',
    title: 'CV and Resume Making',
    category: 'Presentations & Career',
    shortDescription:
      'ATS-friendly resumes, executive CVs, and matching cover letters structured around measurable achievements and clear visual hierarchy.',
    deliverables: [
      'Modern single or two-page ATS-compatible layout',
      'Editable Word source file plus crisp PDF export',
      'Tailored cover letter template included',
    ],
    turnaround: '24–48 hours',
    audience: 'Job Seekers · Graduates · Executives',
  },
  {
    id: 'powerpoint-presentations',
    number: '08',
    title: 'PowerPoint Presentations',
    category: 'Presentations & Career',
    shortDescription:
      'Boardroom-ready pitch decks, academic seminar slides, and company profiles designed with clean layouts, icons, and clear data charts.',
    deliverables: [
      'Custom master slide template aligned to your brand',
      'Visual charts, process diagrams, and speaker notes',
      'Editable PPTX and shareable PDF formats',
    ],
    turnaround: '24–48 hours',
    audience: 'Founders · Students · Corporate Teams',
  },
  {
    id: 'internet-research',
    number: '09',
    title: 'Internet Research',
    category: 'Virtual & Admin Support',
    shortDescription:
      'Targeted web research covering B2B lead lists, competitor pricing benchmarks, vendor sourcing, and academic reference compilation.',
    deliverables: [
      'Verified contact sheets with source URLs',
      'Structured comparison tables in Excel or Google Sheets',
      'Concise executive research summary notes',
    ],
    turnaround: '24–48 hours',
    audience: 'Sales Teams · Researchers · Startups',
  },
  {
    id: 'email-management',
    number: '10',
    title: 'Email Management',
    category: 'Virtual & Admin Support',
    shortDescription:
      'Daily inbox triage, folder labeling, newsletter unsubscribes, response templates, and priority flagging so urgent client messages never slip.',
    deliverables: [
      'Inbox zero organization with custom filter rules',
      'Drafted client replies ready for quick approval',
      'Daily summary digest of priority action items',
    ],
    turnaround: 'Daily ongoing support',
    audience: 'Executives · Consultants · Small Businesses',
  },
  {
    id: 'virtual-assistant',
    number: '11',
    title: 'Virtual Assistant Services',
    category: 'Virtual & Admin Support',
    shortDescription:
      'Dedicated remote administrative support covering calendar scheduling, travel itineraries, meeting minutes, invoice tracking, and client follow-ups.',
    deliverables: [
      'Calendar coordination across time zones',
      'Meeting agendas, action logs, and weekly checklists',
      'Reliable ongoing administrative coverage',
    ],
    turnaround: 'Flexible daily / weekly hours',
    audience: 'Founders · Busy Professionals · Teams',
  },
  {
    id: 'file-management',
    number: '12',
    title: 'File Management and Documentation',
    category: 'Documents & Conversion',
    shortDescription:
      'Systematic organization of cluttered Google Drive, OneDrive, and Dropbox folders with clear naming conventions, indexing, and SOP manuals.',
    deliverables: [
      'Logical folder hierarchy and standardized file naming',
      'Master document index spreadsheet with quick links',
      'Standard Operating Procedure (SOP) documentation',
    ],
    turnaround: '24–48 hours',
    audience: 'Companies · Teams · Growing Businesses',
  },
];

export const DEFAULT_PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'basic',
    name: 'Basic Package',
    subtitle: 'Ideal for individuals, students, and quick single-task turnarounds.',
    priceUsd: 49,
    billingCycle: 'per project / up to 5 hrs',
    turnaround: '24–48 Hour Delivery',
    features: [
      'Data entry up to 300 records or 15 typed pages',
      'MS Word document formatting (up to 20 pages)',
      'PDF to Word or Excel conversion (up to 15 pages)',
      'ATS-friendly CV / Resume formatting (1 version)',
      '2 rounds of revisions included',
      'Email & WhatsApp progress updates',
    ],
  },
  {
    id: 'standard',
    name: 'Standard Package',
    subtitle: 'Built for small businesses and professionals with recurring office tasks.',
    priceUsd: 149,
    billingCycle: 'per package / up to 18 hrs',
    turnaround: '12–24 Hour Priority Delivery',
    featured: true,
    features: [
      'Data entry & copy-paste up to 1,500 records',
      'MS Excel formulas, pivot tables & cleanup',
      'PowerPoint presentation design (up to 20 slides)',
      'Internet research & verified lead sheet (up to 150 entries)',
      'Email & file organization setup (Drive / OneDrive)',
      'Unlimited revisions within project scope',
    ],
  },
  {
    id: 'premium',
    name: 'Premium Package',
    subtitle: 'Dedicated ongoing administrative & virtual assistant partnership for companies.',
    priceUsd: 349,
    billingCycle: 'per month / up to 45 hrs',
    turnaround: 'Same-Day Dedicated Support',
    features: [
      'Dedicated Virtual Assistant & daily email management',
      'Full Excel dashboards, reporting & monthly updates',
      'Unlimited Word formatting & PDF conversions within hours',
      'Custom pitch decks, SOP manuals & documentation',
      'Weekly progress audit & priority WhatsApp direct line',
      'Strict NDA coverage and dedicated folder archive',
    ],
  },
];

export const PORTFOLIO_CASES: PortfolioCase[] = [
  {
    id: 'case-excel-finance',
    title: 'Quarterly Sales & Expense Workbook Automation',
    category: 'Data & Spreadsheets',
    clientType: 'Regional Retail Distributor',
    timeframe: 'Delivered in 36 hours',
    image: assetPath('src/assets/images/service_excel_data_1795671205384.jpg'),
    imageAlt: 'Laptop showing structured Q3 financial performance spreadsheet and navy bar charts',
    summary:
      'Consolidated 14 disconnected monthly CSV exports into one automated Excel management workbook with error-checked formulas and monthly trend charts.',
    metricValue: '6.5 hrs/wk',
    metricLabel: 'Admin reporting time saved weekly',
    challenge:
      'Management spent every Friday manually copying regional CSV receipts into a fragile master sheet prone to broken totals.',
    solution:
      'Standardized column schemas, built dynamic SUMIFS and XLOOKUP summaries, added data validation rules, and created executive bar and trend charts.',
    deliverables: [
      'Master multi-tab Excel workbook (.xlsx)',
      'Automated monthly revenue & cost breakdown dashboard',
      '1-page data entry guide for staff',
    ],
    tools: 'Microsoft Excel · Pivot Tables · Power Query',
  },
  {
    id: 'case-word-annual-report',
    title: '68-Page Corporate Annual Report & Policy Formatting',
    category: 'Documents & Conversion',
    clientType: 'Advisory & Consulting Practice',
    timeframe: 'Delivered in 24 hours',
    image: assetPath('src/assets/images/service_documents_cv_1795671206380.jpg'),
    imageAlt: 'Printed corporate annual report and structured resume document on a slate desk',
    summary:
      'Transformed raw unstyled drafts and scanned appendix tables into a cohesive, print-ready corporate report with automated navigation.',
    metricValue: '68 pages',
    metricLabel: 'Styled & proofread with zero layout drift',
    challenge:
      'Multiple authors submitted mismatched fonts, broken table borders, and manual page numbers prior to a board deadline.',
    solution:
      'Applied unified Word style sheets, rebuilt 19 data tables, linked an automated Table of Contents, and exported print-ready PDF and editable DOCX masters.',
    deliverables: [
      'Fully styled DOCX master document',
      'Print-ready PDF with clickable bookmarks',
      'Standardized reusable Word template',
    ],
    tools: 'Microsoft Word · Adobe Acrobat · Custom Style Templates',
  },
  {
    id: 'case-ppt-pitch-deck',
    title: 'Executive Strategic Growth Q3 Presentation Deck',
    category: 'Presentations & Career',
    clientType: 'B2B Logistics Company',
    timeframe: 'Delivered in 48 hours',
    image: assetPath('src/assets/images/portfolio_presentation_desk_1795671206898.jpg'),
    imageAlt: 'Boardroom laptop displaying navy and cobalt Strategic Growth Q3 PowerPoint presentation',
    summary:
      'Redesigned a dense 34-slide internal briefing into a crisp 22-slide executive PowerPoint deck with clear charts and concise talking points.',
    metricValue: '22 slides',
    metricLabel: 'Custom brand-aligned executive deck',
    challenge:
      'Leadership slides were overloaded with walls of copied text and low-resolution screenshots from spreadsheets.',
    solution:
      'Built custom navy-and-white master layouts, converted raw bullet blocks into clean visual comparisons, and added native editable PowerPoint charts.',
    deliverables: [
      '22-slide editable PowerPoint (.pptx) deck',
      'Custom slide master for future quarters',
      'Presenter notes & high-res PDF handout',
    ],
    tools: 'Microsoft PowerPoint · Native Charts · Brand Grid System',
  },
  {
    id: 'case-pdf-excel-extraction',
    title: 'Scanned Bank Statements & Invoice PDF-to-Excel Conversion',
    category: 'Documents & Conversion',
    clientType: 'Independent Accounting Firm',
    timeframe: 'Delivered in 18 hours',
    image: assetPath('src/assets/images/service_excel_data_1795671205384.jpg'),
    imageAlt: 'Clean financial spreadsheet table converted from scanned PDF records',
    summary:
      'Converted 180 pages of multi-column scanned PDF invoices and statements into reconciled, formula-verified Excel ledger sheets.',
    metricValue: '100%',
    metricLabel: 'Balance-sheet row reconciliation match',
    challenge:
      'Automated OCR tools scrambled dates and merged debit/credit columns across multi-page scanned documents.',
    solution:
      'Executed manual verification against running statement balances, standardized ISO dates, and flagged missing receipt numbers in a separate audit tab.',
    deliverables: [
      'Reconciled Excel workbook sorted by month & vendor',
      'Variance & missing-invoice audit summary tab',
    ],
    tools: 'Adobe PDF · Microsoft Excel · Two-Pass Balance Check',
  },
  {
    id: 'case-cv-overhaul',
    title: 'Executive Resume, CV & Cover Letter Portfolio Suite',
    category: 'Presentations & Career',
    clientType: 'Senior Operations & Academic Applicants',
    timeframe: 'Delivered in 24 hours',
    image: assetPath('src/assets/images/service_documents_cv_1795671206380.jpg'),
    imageAlt: 'Formatted executive resume layout beside corporate report and tablet',
    summary:
      'Restructured cluttered multi-page work histories into clean, ATS-compatible resumes emphasizing quantified project outcomes.',
    metricValue: '42+',
    metricLabel: 'Resumes & CVs delivered for job seekers',
    challenge:
      'Qualified applicants were getting filtered out by applicant tracking systems due to heavy graphic templates and unfocused summaries.',
    solution:
      'Created crisp typographic Word templates with clean heading structure, action-oriented bullet phrasing, and matching tailored cover letters.',
    deliverables: [
      'ATS-verified DOCX resume + PDF export',
      'Matching customizable cover letter',
      'LinkedIn headline & summary copy',
    ],
    tools: 'Microsoft Word · ATS Readability Audit',
  },
  {
    id: 'case-va-research-inbox',
    title: 'Ongoing Inbox Triage, Research & Cloud File Restructuring',
    category: 'Virtual & Admin Support',
    clientType: 'Remote Architecture & Design Studio',
    timeframe: 'Ongoing Monthly Retainer',
    image: assetPath('src/assets/images/about_team_collaboration_1795671206170.jpg'),
    imageAlt: 'Administrative specialists organizing digital files and printed project briefs',
    summary:
      'Organized 4,200+ scattered cloud files, implemented daily email triage rules, and compiled verified supplier research spreadsheets.',
    metricValue: '4,200+',
    metricLabel: 'Cloud files indexed & standardized',
    challenge:
      'Principals lost hours each week hunting through untitled folders and overflowing client inboxes.',
    solution:
      'Established a clear year/client folder taxonomy, built a master clickable Google Sheets index, and instituted morning inbox prioritization.',
    deliverables: [
      'Standardized Google Drive folder hierarchy',
      'Daily priority email summary & draft replies',
      'Verified vendor & pricing research tracker',
    ],
    tools: 'Google Workspace · Microsoft 365 · Cloud Indexing',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Hannah Gallagher',
    role: 'Operations Manager',
    organization: 'Northbridge Supply Co.',
    outcome: 'Cut weekly reporting prep from 7 hours to 20 minutes',
    quote:
      'Before working with Office Admin Assistant, our team spent every Monday cleaning messy supplier PDFs and retyping order totals. They rebuilt our Excel master workbook and handle weekly updates without a single formula error.',
  },
  {
    id: 't-2',
    name: 'David Morales',
    role: 'Graduate Researcher',
    organization: 'Civil Engineering Department',
    outcome: '110-page thesis formatted and approved on first submission',
    quote:
      'My university formatting guidelines were strict about table captions, margins, and appendices. Office Admin Assistant formatted the entire MS Word manuscript in 24 hours and saved me days of stress before my defense.',
  },
  {
    id: 't-3',
    name: 'Priya Nair',
    role: 'Managing Partner',
    organization: 'Nair Consulting Group',
    outcome: 'Reliable daily inbox and presentation support',
    quote:
      'Having a responsive administrative partner who handles our client PowerPoint decks, email filtering, and document indexing lets our consultants stay focused on billable advisory work.',
  },
];

export const ABOUT_CONTENT = {
  teamImage: assetPath('src/assets/images/about_team_collaboration_1795671206170.jpg'),
  teamImageAlt:
    'Office Admin Assistant specialists reviewing formatted business reports and digital spreadsheets together',
  missionHeadline: 'Precision Administrative Support Built Around Your Deadlines',
  missionBody:
    'Office Admin Assistant was founded to give individuals, students, small businesses, and growing companies dependable access to experienced administrative specialists—without the overhead of hiring full-time office staff.',
  secondaryBody:
    'Every spreadsheet, converted PDF, formatted report, resume, and virtual assistant task goes through a two-pass accuracy audit before delivery. Whether you need a single document typed overnight or continuous monthly back-office coverage, we treat your files with strict confidentiality and care.',
  workflowSteps: [
    {
      step: '01',
      title: 'Share Your Files & Brief',
      description:
        'Send your raw documents, spreadsheets, or task checklist via our secure contact form, email, or WhatsApp.',
    },
    {
      step: '02',
      title: 'Scope & Clear Turnaround',
      description:
        'We confirm your exact formatting rules, package rate, and delivery deadline before work begins.',
    },
    {
      step: '03',
      title: 'Two-Pass Quality Check',
      description:
        'Every entry, formula, page break, and converted table is verified manually against your source material.',
    },
    {
      step: '04',
      title: 'Clean, Editable Delivery',
      description:
        'Receive ready-to-use Word, Excel, PowerPoint, or PDF files on schedule—with prompt revisions if needed.',
    },
  ],
  clientGroups: [
    {
      title: 'Small Businesses & Startups',
      detail: 'Data entry, Excel inventory/sales trackers, email triage, and vendor research.',
    },
    {
      title: 'Corporate Teams & Executives',
      detail: 'Boardroom PowerPoint decks, SOP documentation, cloud file indexing, and virtual support.',
    },
    {
      title: 'Students & Researchers',
      detail: 'Thesis & dissertation Word formatting, PDF data extraction, and academic typing.',
    },
    {
      title: 'Individuals & Job Seekers',
      detail: 'ATS-optimized CVs, executive resumes, cover letters, and personal document typing.',
    },
  ],
};
