import { Company } from '@/types';

export const mockCompanies: Company[] = [
  {
    id: '1', name: 'Synthetica AI', domain: 'synthetica.ai',
    description: 'Generates synthetic training data for ML models, reducing reliance on real-world data collection.',
    sector: 'AI/ML', stage: 'Series A', location: 'San Francisco, CA', founded: 2022,
    employees: '25-50', totalFunding: '₹100Cr', lastRound: 'Series A', lastRoundDate: '2025-09-15',
    investors: ['Sequoia Capital', 'Y Combinator'], tags: ['synthetic-data', 'machine-learning', 'developer-tools'],
    score: 88, scoreLabel: 'High', website: 'https://synthetica.ai',
    signals: [
      { id: 's1', type: 'funding', title: 'Raised ₹100Cr Series A', description: 'Led by Sequoia Capital', date: '2025-09-15' },
      { id: 's2', type: 'hiring', title: 'Hiring 8 engineers', description: 'ML engineers and infra roles', date: '2025-11-01' },
      { id: 's3', type: 'product', title: 'Launched v2.0', description: 'New multi-modal generation pipeline', date: '2025-10-20' },
    ],
  },
  {
    id: '2', name: 'Vaultik', domain: 'vaultik.com',
    description: 'Digital product passports and authentication for luxury goods using NFC and blockchain.',
    sector: 'Web3/Luxury', stage: 'Seed', location: 'London, UK', founded: 2021,
    employees: '10-25', totalFunding: '₹37.5Cr', lastRound: 'Seed', lastRoundDate: '2025-03-10',
    investors: ['LVMH Ventures', 'Fabric Ventures'], tags: ['luxury', 'authentication', 'nfc', 'blockchain'],
    score: 72, scoreLabel: 'Medium', website: 'https://vaultik.com',
    signals: [
      { id: 's4', type: 'partnership', title: 'Partnered with Gucci', description: 'Pilot program for handbag authentication', date: '2025-07-22' },
      { id: 's5', type: 'press', title: 'Featured in TechCrunch', description: 'Covered as "anti-counterfeiting startup to watch"', date: '2025-06-14' },
    ],
  },
  {
    id: '3', name: 'Canopy Carbon', domain: 'canopycarbon.io',
    description: 'MRV platform for nature-based carbon credits using satellite imagery and AI verification.',
    sector: 'Climate Tech', stage: 'Series B', location: 'Berlin, Germany', founded: 2020,
    employees: '50-100', totalFunding: '₹292Cr', lastRound: 'Series B', lastRoundDate: '2025-06-01',
    investors: ['Lowercarbon Capital', 'Breakthrough Energy'], tags: ['carbon', 'climate', 'satellite', 'verification'],
    score: 91, scoreLabel: 'High', website: 'https://canopycarbon.io',
    signals: [
      { id: 's6', type: 'funding', title: 'Raised ₹292Cr Series B', description: 'Led by Lowercarbon Capital', date: '2025-06-01' },
      { id: 's7', type: 'product', title: 'Launched API v3', description: 'Real-time verification API for credit marketplaces', date: '2025-08-15' },
      { id: 's8', type: 'hiring', title: 'Opened NYC office', description: 'Hiring 15 roles across sales and engineering', date: '2025-09-01' },
    ],
  },
  {
    id: '4', name: 'Paylo', domain: 'paylo.dev',
    description: 'Embedded payroll infrastructure for platforms and marketplaces in Latin America.',
    sector: 'Fintech', stage: 'Seed', location: 'São Paulo, Brazil', founded: 2023,
    employees: '10-25', totalFunding: '₹26.7Cr', lastRound: 'Seed', lastRoundDate: '2025-04-20',
    investors: ['Kaszek Ventures', 'Canary'], tags: ['payroll', 'latam', 'embedded-finance', 'api'],
    score: 65, scoreLabel: 'Medium', website: 'https://paylo.dev',
    signals: [
      { id: 's9', type: 'product', title: 'Public beta launched', description: 'Opened API access to 50+ platforms', date: '2025-07-10' },
    ],
  },
  {
    id: '5', name: 'Delphi Robotics', domain: 'delphirobotics.com',
    description: 'Autonomous mobile robots for last-mile delivery in dense urban environments.',
    sector: 'Robotics', stage: 'Series A', location: 'Tokyo, Japan', founded: 2021,
    employees: '25-50', totalFunding: '₹150Cr', lastRound: 'Series A', lastRoundDate: '2025-01-30',
    investors: ['SoftBank', 'Woven Capital'], tags: ['robotics', 'delivery', 'autonomous', 'urban'],
    score: 78, scoreLabel: 'High', website: 'https://delphirobotics.com',
    signals: [
      { id: 's10', type: 'funding', title: 'Raised ₹150Cr Series A', description: 'Led by SoftBank', date: '2025-01-30' },
      { id: 's11', type: 'press', title: 'Nikkei Asia feature', description: 'Named top 10 robotics startup in Asia', date: '2025-05-15' },
      { id: 's12', type: 'partnership', title: 'Lawson partnership', description: 'Pilot delivery program in Shibuya district', date: '2025-08-01' },
    ],
  },
  {
    id: '6', name: 'Curalink Health', domain: 'curalink.health',
    description: 'AI-driven care coordination platform connecting specialists, PCPs, and patients.',
    sector: 'Healthcare', stage: 'Series A', location: 'Boston, MA', founded: 2022,
    employees: '25-50', totalFunding: '₹117Cr', lastRound: 'Series A', lastRoundDate: '2025-05-12',
    investors: ['a16z Bio', 'General Catalyst'], tags: ['healthcare', 'care-coordination', 'AI', 'telehealth'],
    score: 82, scoreLabel: 'High', website: 'https://curalink.health',
    signals: [
      { id: 's13', type: 'funding', title: 'Raised ₹117Cr Series A', description: 'Led by a16z Bio', date: '2025-05-12' },
      { id: 's14', type: 'hiring', title: 'Hiring clinical ops lead', description: 'Expanding clinical operations team', date: '2025-10-01' },
    ],
  },
  {
    id: '7', name: 'Gridware', domain: 'gridware.io',
    description: 'AI-powered wildfire detection and grid monitoring for utilities using edge sensors.',
    sector: 'Climate Tech', stage: 'Series B', location: 'Oakland, CA', founded: 2019,
    employees: '50-100', totalFunding: '₹350Cr', lastRound: 'Series B', lastRoundDate: '2025-02-28',
    investors: ['Khosla Ventures', 'Clean Energy Ventures'], tags: ['wildfire', 'utilities', 'edge-computing', 'sensors'],
    score: 85, scoreLabel: 'High', website: 'https://gridware.io',
    signals: [
      { id: 's15', type: 'funding', title: 'Raised ₹350Cr Series B', description: 'Led by Khosla Ventures', date: '2025-02-28' },
      { id: 's16', type: 'partnership', title: 'PG&E deployment', description: 'Full deployment across Northern California grid', date: '2025-06-15' },
    ],
  },
  {
    id: '8', name: 'Nook Education', domain: 'nook.edu',
    description: 'AI tutor platform for K-12 students with adaptive learning paths and parent dashboards.',
    sector: 'EdTech', stage: 'Pre-Seed', location: 'Austin, TX', founded: 2024,
    employees: '1-10', totalFunding: '₹6.7Cr', lastRound: 'Pre-Seed', lastRoundDate: '2025-08-01',
    investors: ['On Deck Angels', 'Hustle Fund'], tags: ['education', 'AI-tutor', 'K-12', 'adaptive-learning'],
    score: 52, scoreLabel: 'Medium', website: 'https://nook.edu',
    signals: [
      { id: 's17', type: 'product', title: 'Launched iOS app', description: 'Available on App Store with 4.8 rating', date: '2025-10-15' },
    ],
  },
  {
    id: '9', name: 'Terrace Finance', domain: 'terrace.fi',
    description: 'Unified trading terminal for crypto hedge funds with cross-exchange execution and PnL tracking.',
    sector: 'Fintech', stage: 'Series A', location: 'Singapore', founded: 2021,
    employees: '25-50', totalFunding: '₹92Cr', lastRound: 'Series A', lastRoundDate: '2025-03-22',
    investors: ['Paradigm', 'Electric Capital'], tags: ['crypto', 'trading', 'institutional', 'defi'],
    score: 74, scoreLabel: 'Medium', website: 'https://terrace.fi',
    signals: [
      { id: 's18', type: 'funding', title: 'Raised ₹92Cr Series A', description: 'Led by Paradigm', date: '2025-03-22' },
      { id: 's19', type: 'product', title: 'Added 12 new exchanges', description: 'Now supports 30+ CEX and DEX integrations', date: '2025-09-10' },
    ],
  },
  {
    id: '10', name: 'Cortex Legal', domain: 'cortexlegal.ai',
    description: 'AI contract analysis and drafting tool for mid-market law firms with clause library.',
    sector: 'Legal Tech', stage: 'Seed', location: 'New York, NY', founded: 2023,
    employees: '10-25', totalFunding: '₹41.7Cr', lastRound: 'Seed', lastRoundDate: '2025-06-18',
    investors: ['Initialized Capital', 'Lux Capital'], tags: ['legal', 'AI', 'contracts', 'NLP'],
    score: 69, scoreLabel: 'Medium', website: 'https://cortexlegal.ai',
    signals: [
      { id: 's20', type: 'press', title: 'ABA Journal mention', description: 'Featured in "AI tools reshaping legal practice"', date: '2025-08-20' },
      { id: 's21', type: 'hiring', title: 'Hiring Head of Sales', description: 'Building out go-to-market team', date: '2025-11-01' },
    ],
  },
  {
    id: '11', name: 'Orbis Logistics', domain: 'orbislogistics.com',
    description: 'Real-time freight visibility and predictive ETAs for cross-border shipments in Southeast Asia.',
    sector: 'Logistics', stage: 'Series A', location: 'Bangkok, Thailand', founded: 2022,
    employees: '25-50', totalFunding: '₹75Cr', lastRound: 'Series A', lastRoundDate: '2025-04-05',
    investors: ['Wavemaker Partners', 'Golden Gate Ventures'], tags: ['logistics', 'supply-chain', 'southeast-asia', 'real-time'],
    score: 71, scoreLabel: 'Medium', website: 'https://orbislogistics.com',
    signals: [
      { id: 's22', type: 'funding', title: 'Raised ₹75Cr Series A', description: 'Led by Wavemaker Partners', date: '2025-04-05' },
    ],
  },
  {
    id: '12', name: 'Pixelform', domain: 'pixelform.xyz',
    description: '3D asset generation from text prompts for game developers and AR/VR content creators.',
    sector: 'AI/ML', stage: 'Seed', location: 'Los Angeles, CA', founded: 2023,
    employees: '10-25', totalFunding: '₹54.2Cr', lastRound: 'Seed', lastRoundDate: '2025-07-30',
    investors: ['a16z Games', 'Bitkraft Ventures'], tags: ['3D', 'generative-AI', 'gaming', 'AR/VR'],
    score: 77, scoreLabel: 'High', website: 'https://pixelform.xyz',
    signals: [
      { id: 's23', type: 'product', title: 'Unity plugin launched', description: 'Native integration with Unity game engine', date: '2025-09-25' },
      { id: 's24', type: 'press', title: 'The Verge feature', description: 'Covered in "AI meets game development" series', date: '2025-10-10' },
    ],
  },
  {
    id: '13', name: 'Spectra Bio', domain: 'spectrabio.com',
    description: 'Point-of-care diagnostics using hyperspectral imaging for rapid pathogen identification.',
    sector: 'Healthcare', stage: 'Series A', location: 'Cambridge, MA', founded: 2021,
    employees: '25-50', totalFunding: '₹133Cr', lastRound: 'Series A', lastRoundDate: '2025-08-10',
    investors: ['ARCH Venture Partners', 'GV'], tags: ['diagnostics', 'biotech', 'imaging', 'point-of-care'],
    score: 84, scoreLabel: 'High', website: 'https://spectrabio.com',
    signals: [
      { id: 's25', type: 'funding', title: 'Raised ₹133Cr Series A', description: 'Led by ARCH Venture Partners', date: '2025-08-10' },
      { id: 's26', type: 'product', title: 'FDA breakthrough designation', description: 'Received FDA breakthrough device designation', date: '2025-10-01' },
    ],
  },
  {
    id: '14', name: 'Karta Maps', domain: 'kartamaps.com',
    description: 'Indoor mapping and navigation SDK for large venues — airports, malls, hospitals.',
    sector: 'Geo/Mapping', stage: 'Seed', location: 'Tel Aviv, Israel', founded: 2023,
    employees: '10-25', totalFunding: '₹33.3Cr', lastRound: 'Seed', lastRoundDate: '2025-05-28',
    investors: ['Aleph', 'Vertex Ventures'], tags: ['mapping', 'indoor-nav', 'SDK', 'venues'],
    score: 58, scoreLabel: 'Medium', website: 'https://kartamaps.com',
    signals: [
      { id: 's27', type: 'partnership', title: 'Ben Gurion Airport pilot', description: 'Indoor navigation deployed at Terminal 3', date: '2025-09-15' },
    ],
  },
  {
    id: '15', name: 'Rune Security', domain: 'runesec.io',
    description: 'Automated penetration testing platform using AI agents for continuous security assessment.',
    sector: 'Cybersecurity', stage: 'Series A', location: 'Austin, TX', founded: 2022,
    employees: '25-50', totalFunding: '₹125Cr', lastRound: 'Series A', lastRoundDate: '2025-02-15',
    investors: ['Accel', 'CRV'], tags: ['security', 'pentest', 'AI-agents', 'automation'],
    score: 80, scoreLabel: 'High', website: 'https://runesec.io',
    signals: [
      { id: 's28', type: 'funding', title: 'Raised ₹125Cr Series A', description: 'Led by Accel', date: '2025-02-15' },
      { id: 's29', type: 'hiring', title: 'Tripled engineering team', description: 'Grew from 8 to 24 engineers in 6 months', date: '2025-08-01' },
      { id: 's30', type: 'product', title: 'SOC 2 module launched', description: 'Automated SOC 2 compliance testing', date: '2025-10-20' },
    ],
  },
  {
    id: '16', name: 'Agriview', domain: 'agriview.ag',
    description: 'Precision agriculture platform combining drone imagery with soil sensor data for crop optimization.',
    sector: 'AgTech', stage: 'Seed', location: 'Des Moines, IA', founded: 2023,
    employees: '10-25', totalFunding: '₹31.7Cr', lastRound: 'Seed', lastRoundDate: '2025-03-15',
    investors: ['S2G Ventures', 'Techstars'], tags: ['agriculture', 'drones', 'precision-farming', 'IoT'],
    score: 55, scoreLabel: 'Medium', website: 'https://agriview.ag',
    signals: [
      { id: 's31', type: 'product', title: 'Launched drone mapping v2', description: 'Sub-centimeter accuracy for field mapping', date: '2025-07-01' },
    ],
  },
  {
    id: '17', name: 'Stackframe', domain: 'stackframe.dev',
    description: 'AI-powered code review and refactoring tool that integrates with CI/CD pipelines.',
    sector: 'Developer Tools', stage: 'Series A', location: 'Seattle, WA', founded: 2022,
    employees: '25-50', totalFunding: '₹108Cr', lastRound: 'Series A', lastRoundDate: '2025-07-01',
    investors: ['Greylock Partners', 'Index Ventures'], tags: ['devtools', 'code-review', 'AI', 'CI/CD'],
    score: 86, scoreLabel: 'High', website: 'https://stackframe.dev',
    signals: [
      { id: 's32', type: 'funding', title: 'Raised ₹108Cr Series A', description: 'Led by Greylock Partners', date: '2025-07-01' },
      { id: 's33', type: 'product', title: 'GitHub App launch', description: 'Native GitHub integration with 10K+ installs', date: '2025-09-15' },
      { id: 's34', type: 'hiring', title: 'Hiring VP Engineering', description: 'Scaling engineering leadership', date: '2025-11-01' },
    ],
  },
  {
    id: '18', name: 'Mosaic Materials', domain: 'mosaicmaterials.com',
    description: 'Direct air capture technology using novel metal-organic framework sorbents.',
    sector: 'Climate Tech', stage: 'Series A', location: 'Berkeley, CA', founded: 2020,
    employees: '25-50', totalFunding: '₹183Cr', lastRound: 'Series A', lastRoundDate: '2025-04-18',
    investors: ['Breakthrough Energy', 'Prelude Ventures'], tags: ['DAC', 'carbon-capture', 'materials-science', 'climate'],
    score: 79, scoreLabel: 'High', website: 'https://mosaicmaterials.com',
    signals: [
      { id: 's35', type: 'funding', title: 'Raised ₹183Cr Series A', description: 'Led by Breakthrough Energy', date: '2025-04-18' },
      { id: 's36', type: 'press', title: 'DOE grant recipient', description: 'Awarded ₹41.7Cr DOE research grant', date: '2025-06-01' },
    ],
  },
  {
    id: '19', name: 'FleetPulse', domain: 'fleetpulse.io',
    description: 'EV fleet management platform with predictive maintenance, charging optimization, and route planning.',
    sector: 'Mobility', stage: 'Series A', location: 'Detroit, MI', founded: 2022,
    employees: '25-50', totalFunding: '₹83.3Cr', lastRound: 'Series A', lastRoundDate: '2025-05-05',
    investors: ['Maniv Mobility', 'Toyota Ventures'], tags: ['EV', 'fleet', 'predictive-maintenance', 'mobility'],
    score: 73, scoreLabel: 'Medium', website: 'https://fleetpulse.io',
    signals: [
      { id: 's37', type: 'funding', title: 'Raised ₹83.3Cr Series A', description: 'Led by Maniv Mobility', date: '2025-05-05' },
      { id: 's38', type: 'partnership', title: 'Amazon DSP pilot', description: 'Managing 200+ EV delivery vehicles', date: '2025-09-01' },
    ],
  },
  {
    id: '20', name: 'Lingua AI', domain: 'linguaai.com',
    description: 'Real-time multilingual meeting transcription and action item extraction for global teams.',
    sector: 'AI/ML', stage: 'Seed', location: 'Amsterdam, Netherlands', founded: 2023,
    employees: '10-25', totalFunding: '₹45.8Cr', lastRound: 'Seed', lastRoundDate: '2025-06-25',
    investors: ['Balderton Capital', 'Point Nine'], tags: ['NLP', 'meetings', 'multilingual', 'productivity'],
    score: 67, scoreLabel: 'Medium', website: 'https://linguaai.com',
    signals: [
      { id: 's39', type: 'product', title: 'Supports 40 languages', description: 'Expanded from 12 to 40 supported languages', date: '2025-09-01' },
      { id: 's40', type: 'press', title: 'Product Hunt #1', description: 'Top product of the day with 1,200+ upvotes', date: '2025-08-15' },
    ],
  },
];

export const sectors = [...new Set(mockCompanies.map(c => c.sector))];
export const stages = [...new Set(mockCompanies.map(c => c.stage))];
export const locations = [...new Set(mockCompanies.map(c => c.location))];
export const allTags = [...new Set(mockCompanies.flatMap(c => c.tags))];
