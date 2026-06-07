# 🧠 ResuAI — AI-Powered Resume Analyzer & ATS Optimizer

<div align="center">

![ResuAI Banner](https://img.shields.io/badge/ResuAI-AI%20Resume%20Analyzer-6366F1?style=for-the-badge&logoColor=white)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](./LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=flat-square)](https://github.com/YOUR_USERNAME/resuai/releases)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square)](./CONTRIBUTING.md)
[![Made with React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)

**A premium HR-Tech SaaS application that parses resumes, analyzes ATS scores, maps skill gaps, and delivers AI-driven optimization suggestions.**

[Report a Bug](https://github.com/YOUR_USERNAME/resuai/issues) · [Request a Feature](https://github.com/YOUR_USERNAME/resuai/issues) · [View Demo](#)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Directory Structure](#-directory-structure)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Database Setup](#1-database-setup-supabase)
  - [Backend Setup](#2-backend-server-setup)
  - [Frontend Setup](#3-frontend-app-setup)
  - [Production Build](#4-build-production-bundle)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## 🔍 Overview

ResuAI is a production-quality, full-stack monorepo application built for modern HR workflows. It combines intelligent resume parsing, real-time ATS compatibility scoring, skill gap analysis, and AI-generated improvement suggestions — all wrapped in a polished dark-mode SaaS interface.

The system gracefully degrades: if the API server is offline or Supabase credentials are missing, the frontend automatically falls back to offline mock datasets so the experience remains fully functional during development.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🎨 **Premium Landing Page** | Dark-mode SaaS page with scroll animations, testimonials, and interactive how-it-works pipeline |
| 📊 **Interactive Dashboard** | Recruiter workspace with statistical aggregates, quick review actions, and a searchable candidate table |
| ⚙️ **AI Processing Pipeline** | Animated step-by-step loading view — from document reading to AI rewrite generation |
| 📄 **Comprehensive Analysis Reports** | Side-by-side resume preview, circular SVG ATS score widget, and a Capability Radar Chart |
| 🏷️ **Skill Density & Gap Mapping** | Dynamic matched skill tags (technical & soft) with importance-guided missing skill suggestions |
| 🤖 **AI Revision Panels** | Side-by-side Original vs. Suggested Revision panels for actionable resume improvements |
| 📁 **Document Parsing API** | Node.js + Express endpoints for text extraction from PDF (`pdf-parse`) and DOCX (`mammoth`) files |
| 🗄️ **Supabase Database** | PostgreSQL-backed storage for candidate reports and detailed scoring metrics |
| 🔌 **Offline Fallback** | Automatic mock data fallback when API or Supabase is unavailable |

---

## 🛠️ Tech Stack

**Frontend**

![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-FF6384?style=flat-square&logoColor=white)
![Lucide](https://img.shields.io/badge/Lucide_React-F56565?style=flat-square&logoColor=white)

**Backend**

![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-FF6B35?style=flat-square&logoColor=white)

**Database & Infrastructure**

![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)

---

## 📁 Directory Structure

```
resuai/
├── src/                    # React + TypeScript frontend
│   ├── pages/              # Route-level page components
│   ├── components/         # Reusable UI components
│   ├── layouts/            # Page layout wrappers
│   └── utils/              # Utility functions & helpers
├── public/                 # Static public assets
├── server/                 # Node.js + Express backend
│   ├── db/
│   │   └── schema.sql      # SQL schema migrations
│   ├── src/
│   │   ├── controllers/    # Route handler logic
│   │   ├── services/       # Business logic layer
│   │   └── config/         # App & DB configuration
│   ├── package.json
│   └── tsconfig.json
├── package.json            # Root workspace config
├── LICENSE
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed before proceeding:

- [Node.js](https://nodejs.org/) `v18+`
- [npm](https://www.npmjs.com/) `v9+`
- A [Supabase](https://supabase.com/) account (free tier works)

---

### 1. Database Setup (Supabase)

1. Create a new project at [supabase.com](https://supabase.com).
2. Navigate to **SQL Editor** in your Supabase dashboard.
3. Copy the contents of `server/db/schema.sql` and run it in the editor.

This initializes the following tables:

- `analyses` — Stores parsed resume analysis results
- `skills` — Matched technical and soft skills
- `missing_skills` — Identified skill gaps
- `suggestions` — AI-generated improvement suggestions
- `industry_matches` — Industry benchmark comparisons

---

### 2. Backend Server Setup

```bash
# Navigate to the server directory
cd server

# Copy the environment template and fill in your credentials
cp .env.example .env
```

Edit `.env` with your Supabase credentials (see [Environment Variables](#-environment-variables)).

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The backend will start on `http://localhost:5000` by default.

---

### 3. Frontend App Setup

From the **root** directory of the project:

```bash
# Install frontend dependencies
npm install

# Start the Vite dev server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

> **Note:** If the backend is not running or Supabase credentials are missing, the frontend automatically falls back to offline mock data. No manual configuration required.

---

### 4. Build Production Bundle

**Frontend** (outputs to `/dist`):
```bash
# From root directory
npm run build
```

**Backend** (outputs to `/server/dist`):
```bash
# From server directory
cd server
npm run build
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `/server` directory using the following template:

```env
# Server Configuration
PORT=5000

# Supabase Credentials
SUPABASE_URL=your-supabase-project-url
SUPABASE_KEY=your-supabase-service-role-key
```

> ⚠️ **Never commit your `.env` file.** It is included in `.gitignore` by default. Keep your `SUPABASE_KEY` secret — use the **service role key** for backend access only.

---

## 🤝 Contributing

Contributions are welcome and appreciated! Here's how to get started:

1. **Fork** this repository
2. **Create** a feature branch: `git checkout -b feature/your-feature-name`
3. **Commit** your changes: `git commit -m 'feat: add your feature'`
4. **Push** to your branch: `git push origin feature/your-feature-name`
5. **Open** a Pull Request

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on our code of conduct and contribution guidelines.

---

## 📄 License

```
MIT License

Copyright (c) 2025 YOUR_NAME

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

See the full [LICENSE](./LICENSE) file for details.

---

## 🙏 Acknowledgements

- [Supabase](https://supabase.com) — Open source Firebase alternative powering the database layer
- [Framer Motion](https://www.framer.com/motion/) — Production-ready animation library for React
- [Recharts](https://recharts.org) — Composable charting library for the Radar Chart and analytics views
- [pdf-parse](https://www.npmjs.com/package/pdf-parse) — PDF text extraction in Node.js
- [mammoth](https://www.npmjs.com/package/mammoth) — DOCX to text extraction
- [Lucide React](https://lucide.dev) — Beautiful and consistent icon set
- [Tailwind CSS](https://tailwindcss.com) — Utility-first CSS framework
- [Vite](https://vitejs.dev) — Next-generation frontend tooling

---

<div align="center">

**Made with ❤️ by [YOUR_NAME](https://github.com/YOUR_USERNAME)**

© 2025 ResuAI. All rights reserved.

If you found this project helpful, please consider giving it a ⭐

</div>
