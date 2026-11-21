# MK Promoters and Developers — Real Estate Portal

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Database%20%26%20RLS-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

A high-conversion, responsive commercial real estate web application built for **MK Promoters and Developers** (Visakhapatnam, Andhra Pradesh). Enables property seekers to explore verified residential and commercial layouts, calculate plot pricing, inspect approvals (VMRDA / DTCP), and submit inquiries directly into Supabase.

---

## ✨ Features

- **Interactive Layout Explorer:** Filter residential ventures and open plots by location (Bhogapuram, Anandapuram, Tagarapuvalasa, Madhurawada), budget, and approval types.
- **Plot EMI & Pricing Calculator:** Dynamic mortgage and installment calculation for prospective real estate buyers.
- **Direct Lead Capture:** Instant inquiry and contact submission integrated with Supabase PostgreSQL and Row-Level Security (RLS).
- **VMRDA / DTCP Compliance Showcase:** Highlighting legally verified documentation, clear titles, and infrastructure amenities (40ft BT roads, underground drainage, solar street lighting).
- **Mobile-First Responsive Layout:** Custom styled interface optimized for mobile buyers and high conversion.

---

## 🏛️ Architecture

```
┌────────────────────────────────────────────────────────┐
│                   Vite + React Client                  │
│   (Property Listings, EMI Calculator, Lead Forms)      │
└───────────────────────────┬────────────────────────────┘
                            │ HTTPS / REST
┌───────────────────────────▼────────────────────────────┐
│                    Supabase Backend                    │
│   • PostgreSQL Database (`inquiries`, `properties`)    │
│   • Row Level Security (RLS) policies                  │
│   • Automated email notifications for broker team      │
└────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
MK-Promoters-And-Developers/
├── .github/
│   └── workflows/
│       └── ci.yml                 # Build and dependency verification pipeline
├── public/                        # Static brand assets & plot imagery
├── src/
│   ├── main.jsx                   # Single-page application logic and routes
│   ├── styles.css                 # Custom CSS design system
│   └── supabase.js                # Supabase client connector
├── supabase-schema.sql            # Database tables, triggers, and RLS rules
├── SETUP.md                       # Comprehensive deployment documentation
├── vercel.json                    # Vercel deployment routing configuration
└── README.md                      # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/gopikrishna1536/MK-Promoters-And-Developers.git
   cd MK-Promoters-And-Developers
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

3. **Install dependencies and launch development server:**
   ```bash
   npm install
   npm run dev
   ```

4. **Build production bundle:**
   ```bash
   npm run build
   ```

---

## 📄 License
MIT License.
