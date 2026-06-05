# ResuAI - AI-Powered Resume Analyzer & ATS Optimizer

ResuAI is a premium, production-quality HR-Tech SaaS application that parses resumes, analyzes ATS scores, maps skill gaps, and suggests AI-driven optimization revisions. It is built as a monorepo containing a React + TypeScript frontend and a Node.js + Express backend integrated with Supabase (PostgreSQL).

## 🚀 Key Features

1. **Premium Landing Page**: A gorgeous, dark-mode SaaS page with scroll animations, testimonials, and interactive how-it-works pipelines.
2. **Interactive Dashboard**: Recruiter workspace equipped with statistical aggregates, quick review actions, and a search-enabled database table listing all parsed candidates.
3. **Simulated AI Processing Pipeline**: An animated step-by-step loading view (Reading document -> extracting skills -> layout checks -> keyword optimization density -> AI rewrite generation).
4. **Comprehensive Analysis Reports**:
   - Simulated interactive side-by-side parsed resume layout preview.
   - Interactive circular SVG score widget.
   - Capability Radar Chart visualizing candidate profiles against benchmarks.
   - Dynamic matched technical/soft skills density tags and importance-guided missing core skill suggestions.
   - Actionable AI-driven improvement revisions featuring side-by-side (Original vs Suggested Revision) panels.
5. **Document Parsing API**: Node.js + Express endpoints supporting direct text extraction from PDF (`pdf-parse`) and DOCX (`mammoth`) resume files.
6. **Supabase Database**: Uses Supabase (PostgreSQL) for storing candidate reports and detailed metrics.
7. **Robust Error Fallback**: If the API server is offline or Supabase environment variables are missing, the frontend automatically falls back to offline mock datasets to maintain a functional experience.

## 🛠️ Technology Stack

- **Frontend**: React 19, TypeScript, Vite 8, Tailwind CSS v4, Framer Motion, Lucide React, Recharts
- **Backend**: Node.js, Express, TypeScript, Multer, PDF-Parse, Mammoth, Supabase JS Client
- **Database**: PostgreSQL (Supabase)

## 📁 Directory Structure

```text
/
├── src/            # React + TS Frontend code (pages, components, layouts, utils, etc.)
├── public/         # Public assets
├── server/         # Node.js + Express Backend code
│   ├── db/         # SQL schema migrations (schema.sql)
│   ├── src/        # Backend TypeScript source files (controllers, services, config)
│   ├── package.json
│   └── tsconfig.json
├── package.json
└── README.md
```

## ⚙️ Installation & Usage

### 1. Database Setup (Supabase)
Import the SQL schema in [server/db/schema.sql](file:///C:/Users/kumar/Documents/antigravity/vibrant-raman/server/db/schema.sql) into your Supabase SQL Editor to initialize the tables (`analyses`, `skills`, `missing_skills`, `suggestions`, and `industry_matches`).

### 2. Backend Server Setup
Navigate to the `/server` directory:
```bash
cd server
```
Copy `.env.example` to `.env` and configure your Supabase Credentials:
```text
PORT=5000
SUPABASE_URL=your-supabase-project-url
SUPABASE_KEY=your-supabase-service-key
```
Install dependencies and run the server:
```bash
npm install
npm run dev
```

### 3. Frontend App Setup
From the root workspace directory, install dependencies and start the development server:
```bash
npm install
npm run dev
```

### 4. Build Production Bundle
To build both frontend and backend for production:
- Frontend: `npm run build` (outputs to `/dist`)
- Backend: `npm run build` inside `/server` (outputs to `/server/dist`)
