import fs from 'fs';
import path from 'path';

// Load default seeds from controllers
import { defaultCmsHomeData } from './src/controllers/cmsController';
import { defaultCmsAboutData } from './src/controllers/cmsAboutController';
import { defaultCmsCompanyData } from './src/controllers/cmsCompanyController';
import { defaultCmsServicesData } from './src/controllers/cmsServicesController';
import { defaultCmsShopData } from './src/controllers/cmsShopController';
import { defaultCmsInvestmentData } from './src/controllers/cmsInvestmentController';
import { defaultCmsProjectsData } from './src/controllers/cmsProjectsController';
import { defaultCmsPartnersData } from './src/controllers/cmsPartnersController';
import { defaultCmsContactData } from './src/controllers/cmsContactController';
import { defaultCmsProjectsInnovatorData } from './src/controllers/cmsProjectsInnovatorController';
import { defaultCmsAttractiveData } from './src/controllers/cmsAttractiveController';
import { defaultCmsMedicsInnovatorData } from './src/controllers/cmsMedicsInnovatorController';

interface PostmanItem {
  name: string;
  request: {
    method: string;
    header: Array<{ key: string; value: string; type?: string }>;
    url: {
      raw: string;
      host: string[];
      path: string[];
    };
    description: string;
  };
  response: Array<{
    name: string;
    originalRequest: any;
    status: string;
    code: number;
    _postman_previewlanguage: string;
    header: Array<{ key: string; value: string }>;
    body: string;
  }>;
}

const endpoints = [
  {
    name: '01. CMS - Home Page',
    path: 'home',
    description: 'Fetches all landing page sections: Hero Banner with Founder card, Trusted Brand logos, About Sectors, Specialized Companies grid, Purpose/Vision/Mission cards, and Call-To-Action Banner.',
    sampleData: defaultCmsHomeData,
  },
  {
    name: '02. CMS - About Us',
    path: 'about',
    description: 'Fetches About Us content: Header, Heritage & Foundation year, Journey timeline (01, 02), Impact & Achievements in numbers (20+ years, 500+ clients, 140+ projects), Executive Leadership, Management divisions, Core Values, Purpose Pillars, and Collaboration Banner.',
    sampleData: defaultCmsAboutData,
  },
  {
    name: '03. CMS - Company Profile',
    path: 'company',
    description: 'Fetches Company Profile content: Header, Who We Are narrative & pillars, What Guides Us corporate principles, and downloadable PDF document details.',
    sampleData: defaultCmsCompanyData,
  },
  {
    name: '04. CMS - Services',
    path: 'services',
    description: 'Fetches Healthcare & Laboratory Services: Header overview cards (Certified tech, Quality standards, Strategic partnerships) and Business Areas sector cards.',
    sampleData: defaultCmsServicesData,
  },
  {
    name: '05. CMS - Shop / Products',
    path: 'shop',
    description: 'Fetches Products Catalog: Header description and product cards with international certification badges (CE, FDA, ISO), product imagery, specifications, and "Request a Quote" actions.',
    sampleData: defaultCmsShopData,
  },
  {
    name: '06. CMS - Investment Opportunities',
    path: 'investment',
    description: 'Fetches Investment Opportunities: Header, Institutional Mission & domestic market positioning, Macroeconomic drivers (01, 02, 03), Sector allocations, Investment foundations, and CTA banner.',
    sampleData: defaultCmsInvestmentData,
  },
  {
    name: '07. CMS - Projects Portfolio',
    path: 'projects',
    description: 'Fetches Projects Portfolio: Header and categorized projects with status indicator badges (Completed, Ongoing, Planned) and project details.',
    sampleData: defaultCmsProjectsData,
  },
  {
    name: '08. CMS - Our Partners',
    path: 'partners',
    description: 'Fetches Strategic Partners: Header, Partner brand cards categorized by role (Technology Partner, Cloud Partner, Strategic Partner, Creative Partner, Innovation Partner) with URLs, and "Let\'s Work Together" Banner.',
    sampleData: defaultCmsPartnersData,
  },
  {
    name: '09. CMS - Contact Us & Office Info',
    path: 'contact',
    description: 'Fetches Contact Details: Header with "Send an Enquiry" prompt, Corporate Office address lines, email, phone number, and interactive Google Maps embed / directions links.',
    sampleData: defaultCmsContactData,
  },
  {
    name: '10. CMS - Projects Innovator (Parent Entity)',
    path: 'projects-innovator',
    description: 'Fetches Projects Innovator subsidiary page: Holding Hero Banner, Trusted Brands row, About Projects Innovator profile, Business Areas grid, and Collaboration CTA Banner.',
    sampleData: defaultCmsProjectsInnovatorData,
  },
  {
    name: '11. CMS - Attractive (Subsidiary)',
    path: 'attractive',
    description: 'Fetches Attractive subsidiary page: Hero Banner, Trusted Brands row, About Attractive profile, Featured Products grid with certification badges, and Collaboration CTA Banner.',
    sampleData: defaultCmsAttractiveData,
  },
  {
    name: '12. CMS - Medics Innovator (Subsidiary)',
    path: 'medics-innovator',
    description: 'Fetches Medics Innovator subsidiary page: Clinical Hero Banner, Trusted Brands row, About Medics Innovator profile, Clinical Equipment Products showcase with certification badges, and Collaboration CTA Banner.',
    sampleData: defaultCmsMedicsInnovatorData,
  },
];

const collectionItems: PostmanItem[] = endpoints.map((ep) => {
  const urlPath = ['api', 'cms', ep.path];
  const fullUrl = `{{baseUrl}}/api/cms/${ep.path}`;

  const sampleResponse = {
    success: true,
    data: {
      _id: '65f1a2b3c4d5e6f7a8b9c0d1',
      ...ep.sampleData,
      createdAt: '2026-10-30T10:00:00.000Z',
      updatedAt: '2026-11-04T10:00:00.000Z',
    },
  };

  return {
    name: ep.name,
    request: {
      method: 'GET',
      header: [
        {
          key: 'Accept',
          value: 'application/json',
          type: 'text',
        },
      ],
      url: {
        raw: fullUrl,
        host: ['{{baseUrl}}'],
        path: urlPath,
      },
      description: `### Overview\n${ep.description}\n\n### Authentication\n- **Public endpoint**: No bearer token or authentication header required.\n\n### Response Format\n- Standard response envelope: \`{ "success": true, "data": { ... } }\`\n- Bilingual content: Each text field provides both English (\`en\`) and Arabic (\`ar\`) translations.`,
    },
    response: [
      {
        name: '200 OK - Successful Response',
        originalRequest: {
          method: 'GET',
          header: [
            {
              key: 'Accept',
              value: 'application/json',
            },
          ],
          url: {
            raw: fullUrl,
            host: ['{{baseUrl}}'],
            path: urlPath,
          },
        },
        status: 'OK',
        code: 200,
        _postman_previewlanguage: 'json',
        header: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
        body: JSON.stringify(sampleResponse, null, 2),
      },
    ],
  };
});

const postmanCollection = {
  info: {
    _postman_id: '9b1c5e62-817a-4c28-98e3-057bf309db8a',
    name: 'Mobtaker Group - CMS APIs (Frontend Handover)',
    description: `# Mobtaker Group CMS GET APIs\n\nThis collection contains all public \`GET\` endpoints for the Mobtaker Group client-facing website and web applications.\n\n### Base URLs:\n- **Production (Live Render)**: \`https://innovation-backend-xv2x.onrender.com\`\n- **Local Development**: \`http://localhost:5000\`\n\n### Key Features:\n- **No Authentication Required**: All endpoints in this collection are public content APIs.\n- **Full Bilingual Support**: All textual fields return both English (\`en\`) and Arabic (\`ar\`) localizations.\n- **Clean Response Standard**: All responses return HTTP 200 with \`{ "success": true, "data": { ... } }\`.\n\n### Usage in Frontend (Next.js / React / Vue):\nSet your base URL variable in \`.env\`:\n\`\`\`bash\nNEXT_PUBLIC_API_BASE_URL=https://innovation-backend-xv2x.onrender.com\n\`\`\`\nAnd query any endpoint directly: \`\${NEXT_PUBLIC_API_BASE_URL}/api/cms/home\`.`,
    schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
  },
  variable: [
    {
      key: 'baseUrl',
      value: 'https://innovation-backend-xv2x.onrender.com',
      type: 'string',
      description: 'Active API server host (Switch between Live Render and http://localhost:5000)',
    },
  ],
  item: collectionItems,
};

const outputPath = path.resolve(process.cwd(), 'mobtaker-cms.postman_collection.json');
fs.writeFileSync(outputPath, JSON.stringify(postmanCollection, null, 2), 'utf-8');
console.log(`Successfully generated Postman Collection at: ${outputPath}`);

