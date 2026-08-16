export type CaseStudy = {
  slug: string;
  number: string;
  category: string;
  title: string;
  shortTitle: string;
  deck: string;
  organization: string;
  role: string;
  period: string;
  tags: string[];
  challenge: string;
  contribution: string[];
  value: string;
  images: Array<{ src: string; alt: string; caption: string }>;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "greenbix",
    number: "01",
    category: "Climate technology · Singapore & ASEAN",
    title: "Building a research-to-content system for sustainable cooling.",
    shortTitle: "Climate-tech research to content",
    deck:
      "Supporting an early-stage technical venture with the coordination, research, and communication structure needed to stay clear across partners, programs, and markets.",
    organization: "Greenbix Pte. Ltd.",
    role: "Admin Lead · Project Manager · Executive Assistant",
    period: "2025–2026",
    tags: ["Research", "Coordination", "Content", "Web"],
    challenge:
      "Greenbix was developing and commercializing a new cooling approach while participating in accelerator, grant, testbed, partnership, and market-development activity. That created a constant flow of technical inputs, stakeholder follow-ups, documents, and public communications that needed to remain coherent.",
    contribution: [
      "Coordinated partner meetings, follow-ups, application materials, and shared project records.",
      "Researched market developments, organizations, manufacturers, installers, and collaboration opportunities.",
      "Prepared pitch decks, one-pagers, research summaries, action trackers, and project updates.",
      "Created LinkedIn content and branded visuals, then maintained a consistent publishing rhythm.",
      "Updated Greenbix’s website and supported technical-workflow administration for simulation and testbed activity.",
    ],
    value:
      "The work created a more dependable communication layer around a complex venture: leadership had organized follow-through, partners received clearer materials, and technical developments could be translated into business-facing narratives.",
    images: [
      {
        src: "/work/greenbix-journey.webp",
        alt: "Greenbix innovation and impact overview combining event photography, sustainable-building imagery, and cooling-technology milestones.",
        caption: "A visual overview of Greenbix’s innovation journey and regional activity.",
      },
      {
        src: "/work/greenbix-green-mark.webp",
        alt: "Editorial Greenbix graphic about Singapore Green Mark performance standards, using a modern building interior.",
        caption: "Policy and market developments translated into concise professional content.",
      },
      {
        src: "/work/greenbix-data-centers.webp",
        alt: "Greenbix graphic about efficient cooling for data centers, shown over a technology-rich server environment.",
        caption: "A repeatable visual system adapted to different technical and commercial topics.",
      },
      {
        src: "/work/greenbix-alternative-cooling.webp",
        alt: "Greenbix graphic about alternative cooling in Singapore, featuring a future-facing sustainable building.",
        caption: "Regional relevance anchored in clear, audience-ready messaging.",
      },
    ],
  },
  {
    slug: "research-narratives",
    number: "02",
    category: "Research · Thought leadership · Presentation design",
    title: "Structuring complex topics into visual narratives.",
    shortTitle: "Complex research, clearly structured",
    deck:
      "Turning broad, difficult subject matter into presentation sequences that give audiences a clear route through context, evidence, and implications.",
    organization: "Selected thought-leadership work",
    role: "Research support · Narrative structure · Visual composition",
    period: "Selected work",
    tags: ["Research", "Structure", "Presentation", "Visual design"],
    challenge:
      "Topics such as artificial intelligence, disaster response, open-source intelligence, geopolitics, and economics carry large amounts of context. The communication challenge is not simply finding information—it is deciding what matters, organizing it, and presenting it in an order an audience can follow.",
    contribution: [
      "Researched and organized multi-part subject narratives.",
      "Converted dense material into structured presentation flows and audience-facing explanations.",
      "Selected and composed supporting visuals, diagrams, maps, and source excerpts.",
      "Designed repeatable section rhythms, title treatments, and closing summaries.",
      "Balanced breadth with a clear beginning, middle, and end for each topic.",
    ],
    value:
      "The collection demonstrates range, but more importantly it shows a repeatable ability to reduce information overload and build materials that help an audience orient itself quickly.",
    images: [
      {
        src: "/work/research-ai.webp",
        alt: "Presentation cover titled AI Unleashed, featuring a detailed human eye combined with digital technology.",
        caption: "Artificial intelligence: establishing a visual thesis from the opening slide.",
      },
      {
        src: "/work/research-crisis.webp",
        alt: "Presentation cover titled The First 48 Hours of a Disaster, combining emergency response imagery and a clock motif.",
        caption: "Disaster response: framing a time-sensitive topic around a strong organizing idea.",
      },
      {
        src: "/work/research-osint.webp",
        alt: "Open Source Intelligence presentation slide defining the collection and analysis of public information.",
        caption: "Open-source intelligence: simplifying a technical concept for a general audience.",
      },
    ],
  },
  {
    slug: "stakeholder-communications",
    number: "03",
    category: "Client communications · Events · Information design",
    title: "Making detailed information usable at a glance.",
    shortTitle: "Stakeholder-ready communications",
    deck:
      "Condensing service capabilities, performance history, and event logistics into polished materials designed for real audiences and real decisions.",
    organization: "CounterAtlas LLC · Daedalians",
    role: "Executive support · Event coordination · Multimedia collateral",
    period: "2022–2024",
    tags: ["Executive support", "Events", "Collateral", "Information design"],
    challenge:
      "Executive and client communications often contain more detail than an audience can absorb quickly. Service flyers needed to communicate credibility without losing specificity, while event materials had to make schedules and logistics immediately useful.",
    contribution: [
      "Supported research, presentations, executive documents, events, and stakeholder coordination.",
      "Created and edited flyers, proposals, business materials, and event communications.",
      "Structured dense service information into consistent, scannable sections.",
      "Combined ceremony details, schedules, maps, and participant guidance in a practical event format.",
      "Maintained visual alignment with each organization’s existing identity.",
    ],
    value:
      "The resulting materials made specialized information easier to navigate while giving each audience a clear next step—whether reviewing a capability, understanding past work, or attending an event.",
    images: [
      {
        src: "/work/communications-deep-web.webp",
        alt: "CounterAtlas Deep Web Exploration flyer with a dark blue information layout and six service categories.",
        caption: "A detailed service overview organized into clear information groups.",
      },
      {
        src: "/work/communications-past-performance.webp",
        alt: "CounterAtlas Past Performance flyer summarizing work across government, private, healthcare, law enforcement, youth charities, and industry.",
        caption: "Past-performance information condensed into a consistent one-page format.",
      },
      {
        src: "/work/communications-event.webp",
        alt: "Daedalians annual Arlington Cemetery wreath-laying event flyer with schedule, photographs, and walking-route information.",
        caption: "Event communication balancing ceremony, logistics, imagery, and participant guidance.",
      },
    ],
  },
];

export const experience = [
  {
    period: "2025–2026",
    role: "Admin Lead · Project Manager · Executive Assistant",
    organization: "Greenbix Pte. Ltd.",
    location: "Singapore",
    summary:
      "Executive operations, project coordination, partnerships, applications, research, content, web administration, finance, HR documentation, and technical-workflow support.",
  },
  {
    period: "2024–2025",
    role: "Co-Founder · Co-Owner",
    organization: "Sip&Chill",
    location: "Laguna, Philippines",
    summary:
      "Day-to-day operations, people management, inventory, pricing, supplier coordination, bookkeeping, marketing, and customer experience.",
  },
  {
    period: "2022–2024",
    role: "Executive Assistant to the CEO · Operations & Finance Support",
    organization: "CounterAtlas LLC · Daedalians",
    location: "Washington, DC",
    summary:
      "Executive support, travel and events, team coordination, research, financial administration, policies, presentations, and multimedia collateral.",
  },
  {
    period: "2022",
    role: "Executive Assistant to the CEO",
    organization: "FocalPoint Business Coaching",
    location: "Illinois, USA",
    summary:
      "Calendar and travel support, prospect research, relationship-building, content, email campaigns, networking, and lead-generation administration.",
  },
  {
    period: "2022",
    role: "Customer Support · E-Commerce · Lead Generation",
    organization: "Chirpish",
    location: "Miami, USA",
    summary:
      "Escalations, invoicing, order support, research, bookkeeping, outreach, and cross-team customer problem solving.",
  },
  {
    period: "2021",
    role: "Junior Design and Cost Engineer",
    organization: "Engineering Equipment Inc., Corp.",
    location: "Quezon City, Philippines",
    summary:
      "Cost analysis, BOQs, spreadsheets, technical drawings, supplier comparisons, procurement schedules, and project coordination.",
  },
];

export const toolGroups = [
  {
    title: "Operations & projects",
    tools: "Asana, Monday.com, Basecamp, Taskade, Notion, ClickUp",
  },
  {
    title: "Documents & collaboration",
    tools: "Microsoft Office, Advanced Excel, Google Workspace, OneDrive, Slack",
  },
  {
    title: "CRM, outreach & support",
    tools: "GoHighLevel, Freshdesk, LinkedIn, Kennected, Apollo.io, Mailchimp",
  },
  {
    title: "Creative, web & finance",
    tools: "Canva, Wix, Google Analytics, n8n, FreshBooks, Xero, 1Password",
  },
];
