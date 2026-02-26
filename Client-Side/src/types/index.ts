export interface Company {
  id: string;
  name: string;
  domain: string;
  description: string;
  sector: string;
  stage: string;
  location: string;
  founded: number;
  employees: string;
  totalFunding: string;
  lastRound: string;
  lastRoundDate: string;
  investors: string[];
  tags: string[];
  score: number; // 0-100
  scoreLabel: 'High' | 'Medium' | 'Low';
  signals: Signal[];
  website: string;
  linkedin?: string;
  twitter?: string;
}

export interface Signal {
  id: string;
  type: 'funding' | 'hiring' | 'product' | 'press' | 'founder' | 'partnership';
  title: string;
  description: string;
  date: string;
  source?: string;
}

export interface Note {
  id: string;
  companyId: string;
  content: string;
  createdAt: string;
  author: string;
}

export interface CompanyList {
  id: string;
  name: string;
  description: string;
  companyIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  filters: SearchFilters;
  createdAt: string;
}

export interface SearchFilters {
  sector?: string;
  stage?: string;
  location?: string;
  minScore?: number;
  maxScore?: number;
  tags?: string[];
}

export interface EnrichmentData {
  summary: string;
  whatTheyDo: string[];
  keywords: string[];
  derivedSignals: string[];
  sources: { url: string; scrapedAt: string }[];
  enrichedAt: string;
}
