export const profile = {
  name: "Ricardo Lousada",
  role: "Director of AI",
  location: "Lisbon, Portugal",
  email: "ricardo.lousada@gmail.com",
  availability: "Open to new ventures",
  lede: "I work where strategy, alliances, and delivery meet — so technology programs become operations a business can run.",
};

export const links = {
  email: "mailto:ricardo.lousada@gmail.com",
  linkedin: "https://www.linkedin.com/in/rlousada",
  medium: "https://medium.com/@ricardo.lousada",
  github: "https://github.com/ricardolousada",
  pdf: "/ricardo-lousada-profile.pdf",
};

export const nav = [
  { href: "/#about", label: "About" },
  { href: "/#journey", label: "Journey" },
  { href: "/#work", label: "Work" },
  { href: "/#contact", label: "Contact" },
];

export const ticker = [
  "DXC Technology",
  "Fujitsu",
  "NTT DATA",
  "Novabase",
  "Electronic Data Systems",
  "Indra",
  "Galp",
  "Axians",
  "Celfocus",
  "Tata Consultancy Services",
  "Microsoft",
  "ServiceNow",
  "UiPath",
];

export const offers = [
  {
    index: "01",
    title: "AI consulting",
    text: "From mandate to operating model: where AI belongs, how it is delivered, and how the business proves the value.",
  },
  {
    index: "02",
    title: "Strategic alliances",
    text: "Partner relationships that produce pipeline and capability — with Microsoft, ServiceNow, and UiPath among them.",
  },
  {
    index: "03",
    title: "Practices and new units",
    text: "Portfolio, go-to-market, and the team that can sell and deliver it. I have stood up business units, including CRM as SaaS.",
  },
  {
    index: "04",
    title: "Programs and transitions",
    text: "Takeovers of applications, people, and infrastructure. Service models, SLAs, and ITIL practiced in live contracts.",
  },
  {
    index: "05",
    title: "Bids and pre-sales",
    text: "Proposals that match the customer’s need and what the organization can deliver at the quality it promised.",
  },
];

export const skills = [
  "Data warehouse architecture",
  "Advanced SQL",
  "DataOps",
  "Cloud",
  "Generative AI",
  "ITSM / ITIL",
  "Program management",
  "Alliances",
];

export type Role = {
  org: string;
  title: string;
  when: string;
  place?: string;
  summary: string;
  highlights?: string[];
};

export type Chapter = {
  id: string;
  index: string;
  era: string;
  range: string;
  summary: string;
  roles: Role[];
};

export const chapters: Chapter[] = [
  {
    id: "now",
    index: "01",
    era: "AI leadership",
    range: "2025 —",
    summary: "Advisory work at the point where an AI ambition has to survive contact with operations.",
    roles: [
      {
        org: "DXC Technology",
        title: "Director of AI Consulting, Portugal",
        when: "Feb 2025 — Present",
        place: "Lisbon",
        summary:
          "Working across strategic vision, technology, and execution so clients implement AI and capture business impact — operational excellence, innovation, and a defensible position in a market that is moving quickly.",
      },
    ],
  },
  {
    id: "alliances",
    index: "02",
    era: "Practices and alliances",
    range: "2019 — 2024",
    summary: "Building offers, partner machines, and the P&L that proves they were worth it.",
    roles: [
      {
        org: "Fujitsu Portugal",
        title: "AI & Intelligent Process Automation Practice Lead",
        when: "Mar 2023 — May 2024",
        place: "Lisbon",
        summary:
          "Alongside Head of Alliances, reporting into the digitalization and automation leadership. Portfolio and go-to-market, customer stakeholders, delivery quality, and proposals written against real needs.",
        highlights: [
          "Practice P&L at 130% of target",
          "First win in a technology set as a strategic goal",
        ],
      },
      {
        org: "Fujitsu Portugal",
        title: "Head of Alliances",
        when: "Nov 2022 — May 2024",
        place: "Lisbon",
        summary:
          "Reported to the CEO. Focal point for Microsoft, ServiceNow, and UiPath, aligned with the global alliances team. Capability strategy, incentives, funds, programs, and licensing — plus go-to-market support for internal practices.",
        highlights: [
          "New projects +10%, business +30%",
          "Azure consumption revenue +200%",
        ],
      },
      {
        org: "Fujitsu",
        title: "Western Europe Applications & Multi-Cloud Product Owner",
        when: "Feb 2022 — Oct 2022",
        place: "Lisbon",
        summary:
          "Central team building the Applications & Multi-Cloud practice across Western Europe. Portfolio adoption by local countries, an agile services offer, and coordination with centers of excellence, global delivery, and portfolio teams.",
      },
      {
        org: "NTT DATA",
        title: "Alliances Manager",
        when: "May 2019 — Jan 2022",
        place: "Lisbon",
        summary:
          "Stood up a new alliances unit in Portugal, centered on the Microsoft relationship, with go-to-market aligned to sectors and delivery units. Owned the capability plan, P&L, incentives, and programs.",
        highlights: [
          "Certifications from under 10 to 100+",
          "Azure consumption 100% above objective",
        ],
      },
    ],
  },
  {
    id: "independent",
    index: "03",
    era: "Independent practice",
    range: "2008 — 2019",
    summary: "A company of my own, client-side delivery, and two ventures beside the consulting work.",
    roles: [
      {
        org: "IT-4-ALL",
        title: "Company owner",
        when: "Aug 2014 — Apr 2019",
        place: "Lisbon",
        summary:
          "Independent project and service management. At Novabase, takeover of an application management service into managed services. At Axians, bid and program management for European institutions. At Galp, digital marketing programs including the corporate portal and the Iberian cards portal, plus PMO. At Hakken, an ITSM implementation in Dubai for a major bank.",
      },
      {
        org: "BetterNow",
        title: "Co-founder, non-executive",
        when: "2018 — 2019",
        summary:
          "Online medical consultation in Portuguese: a physician recognized by the Medical Association, on a phone, with no prior appointment, at any hour.",
      },
      {
        org: "WTB Sports",
        title: "Owner and co-founder",
        when: "Oct 2013 — Aug 2014",
        place: "Lisbon",
        summary: "A sports product built to make people want the next session. The project is on hold.",
      },
      {
        org: "IT-4-ALL",
        title: "Company owner",
        when: "Mar 2010 — Sep 2013",
        place: "Lisbon",
        summary:
          "Service manager at Celfocus for a team of 30 on application management and operations for OSS at Vodafone Portugal — SLAs, client satisfaction, careers, and budget. Business development lead for Tata Consultancy Services in energy, utilities, and telecom. At Novabase, transition of a 2.5M TCV outsourcing deal covering applications, people, assets, and infrastructure, with a PMO across 18 projects.",
        highlights: ["Team of 30 at Vodafone OSS", "2.5M TCV transition"],
      },
      {
        org: "Dualbrand",
        title: "Owner and CEO",
        when: "Sep 2008 — Dec 2011",
        place: "Lisbon",
        summary:
          "Full company leadership across finance, sales, marketing, logistics, and IT, with the weight on CRM and corporate customers. Implemented SugarCRM on the open-source edition. Grew from two brands to more than ten.",
        highlights: ["Silva best sales country, 2009"],
      },
    ],
  },
  {
    id: "delivery",
    index: "04",
    era: "Outsourcing and delivery",
    range: "1998 — 2008",
    summary: "The years that taught the craft: service, program, bid, and the P&L underneath.",
    roles: [
      {
        org: "Novabase",
        title: "Outsourcing business development manager",
        when: "Jan 2008 — Sep 2008",
        place: "Lisbon",
        summary:
          "Started the business development function for managed services as Outsourcing joined IMS. Market research, portfolio, and go-to-market with IMS leadership. Led the study for the Novabase Agile Centre, a nearshore model. The EU funds application was awarded. The centre continued later under Axians.",
      },
      {
        org: "Novabase",
        title: "Project manager / service manager",
        when: "Apr 2004 — Jan 2008",
        place: "Lisbon",
        summary:
          "Reporting to the head of outsourcing application management. Remote application operations and help desk for an international customer across 18 countries. A SOX compliance program for a major telecom. Program manager for a CRM-as-a-service company split out of Novabase.",
        highlights: [
          "CRM SaaS: ROI in under 2 years",
          "Profit 100% above estimate",
        ],
      },
      {
        org: "Indra",
        title: "Service manager",
        when: "Dec 2003 — Mar 2004",
        place: "Lisbon",
        summary:
          "Outsourcing of the internet data center for a major oil and gas company. Customer and team leadership across systems, databases, and operations, including desktop services for the group’s gas companies.",
      },
      {
        org: "Electronic Data Systems",
        title: "Sales support and business development",
        when: "Jul 2001 — Dec 2003",
        place: "Lisbon",
        summary:
          "Sales support for outsourcing, in parallel with leading the Service Excellency program in Portugal for the delivery organization.",
      },
      {
        org: "Electronic Data Systems",
        title: "Digital media commerce senior consultant",
        when: "Sep 2000 — Jun 2001",
        place: "Lisbon",
        summary: "Responsible for implementing the e-business offer in Portugal.",
      },
      {
        org: "Electronic Data Systems",
        title: "Project manager",
        when: "Mar 1998 — Sep 2000",
        place: "Lisbon",
        summary:
          "In the project management competence centre, on a major oil and gas account: a loyalty-card program, a business continuity plan, and the OAS package. Also the euro migration for a major Portuguese bank.",
        highlights: ["Top performer, 1998"],
      },
    ],
  },
  {
    id: "foundations",
    index: "05",
    era: "Foundations",
    range: "1993 — 1998",
    summary: "Teaching, then building systems inside a bank. The technical root is not decorative.",
    roles: [
      {
        org: "Banco Nacional Ultramarino",
        title: "Programming analyst",
        when: "1996 — 1998",
        place: "Lisbon",
        summary:
          "A help-desk system built from scratch as a trainee, then analyst and programmer on electronic banking for BNU and for CGD.",
      },
      {
        org: "Universidade Independente",
        title: "Computer graphics teacher",
        when: "1997 — 1998",
        place: "Lisbon",
        summary: "Taught computer graphics alongside the start of a delivery career.",
      },
      {
        org: "Escola Secundária Eça de Queirós",
        title: "IT teacher",
        when: "1993 — 1997",
        place: "Lisbon",
        summary: "Technology and IT applications.",
      },
    ],
  },
];

export const stats = [
  {
    value: "130%",
    label: "Practice P&L versus target",
    detail: "Fujitsu AI & automation practice, last fiscal year in role",
  },
  {
    value: "+200%",
    label: "Azure consumption revenue",
    detail: "Fujitsu alliances, across the two-year remit",
  },
  {
    value: "100+",
    label: "Certifications built",
    detail: "NTT DATA capability program, from fewer than ten",
  },
  {
    value: "2.5M",
    label: "TCV transition led",
    detail: "Novabase outsourcing takeover — people, apps, infrastructure",
  },
];

export type WorkItem = {
  slug: string;
  index: string;
  title: string;
  summary: string;
  brief: string;
  points: string[];
};

export const work: WorkItem[] = [
  {
    slug: "ai-consulting",
    index: "01",
    title: "AI consulting",
    summary: "Practices that get AI out of the pilot and into the operating model.",
    brief:
      "A case study is in preparation. The work behind it is the DXC consulting mandate and the Fujitsu AI and intelligent automation practice: portfolio, go-to-market, delivery quality, and a P&L that had to clear its target.",
    points: [
      "Where AI belongs in the operation, and where it does not",
      "Offer design, staffing, and proposal quality",
      "The distance between a pilot and a result the CFO will recognize",
    ],
  },
  {
    slug: "strategic-alliances",
    index: "02",
    title: "Strategic alliances",
    summary: "Partner machines with Microsoft, ServiceNow, and UiPath.",
    brief:
      "A case study is in preparation. The record is public in outline: alliances leadership at Fujitsu, reporting to the CEO, and the unit built at NTT DATA around the Microsoft relationship.",
    points: [
      "Partner management, global alignment, and local pipeline",
      "Certifications, incentives, funds, and licensing",
      "Azure consumption and the projects that followed the relationship",
    ],
  },
  {
    slug: "service-transitions",
    index: "03",
    title: "Service transitions",
    summary: "Takeovers, service models, and programs with a number on them.",
    brief:
      "A case study is in preparation. The pattern runs through Novabase, Axians, Galp, Celfocus, and Indra: transition the service, hold the SLA, and keep the commercial model honest.",
    points: [
      "Applications, people, assets, and infrastructure in one takeover",
      "PMO, consumption-based invoicing, and knowledge bases",
      "Bids for European institutions and managed-service lines",
    ],
  },
  {
    slug: "ventures",
    index: "04",
    title: "Ventures",
    summary: "Companies built beside the consulting career.",
    brief:
      "A case study is in preparation. Three builds sit in the record: Dualbrand, grown from two brands to more than ten; BetterNow, a Portuguese telemedicine service; and WTB Sports, currently on hold.",
    points: [
      "Full P&L ownership, not an advisory seat",
      "CRM, corporate sales, and a best-country sales award",
      "Product ventures in health and sport",
    ],
  },
];

export const education = [
  {
    school: "AI Accelera",
    detail: "Generative AI and LLM application development",
    when: "2024",
  },
  {
    school: "ISEG",
    detail: "Postgraduate, e-business",
    when: "1999 — 2000",
  },
  {
    school: "University of Lisbon",
    detail: "Degree, Computer Science",
    when: "1990 — 1995",
  },
  {
    school: "SMU Cox School of Business",
    detail: "Executive program, Oil & Gas industry",
    when: "2000",
  },
  {
    school: "University of Pennsylvania",
    detail: "The Global Business of Sports, Coursera",
    when: "2013",
  },
];

export const certifications = [
  "Microsoft Certified: Azure Fundamentals",
  "Microsoft Copilot Sales Champion — FY24",
  "Introduction to Data Engineering",
  "Cloud Concepts: Determining Your Cloud Strategy",
  "Miro Essentials",
];

export const languages = [
  { name: "Portuguese", level: "Native" },
  { name: "English", level: "Full professional" },
  { name: "Spanish", level: "Professional working" },
];

export function getWork(slug: string) {
  return work.find((item) => item.slug === slug);
}
