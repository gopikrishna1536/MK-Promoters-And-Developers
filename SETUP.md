# MK Promoters and Developers — Website Starter

A responsive React + Vite website for MK Promoters and Developers, Visakhapatnam. It includes a public homepage, project search/filter UI, enquiry form, WhatsApp links, Google Maps search link, and a Supabase-authenticated admin area for projects and enquiries.

## 1. Requirements

- Node.js 20 or later (Node 22 LTS is a good choice)
- npm
- A Supabase account/project for secure admin login, projects and enquiry storage
- Your company logo and real contact details

## 2. Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Open the local URL Vite prints (usually `http://localhost:5173`). The site can be previewed without Supabase, but project data, form submissions and admin login require the Supabase setup below.

## 3. Connect Supabase

1. Create a Supabase project.
2. In Supabase → SQL Editor, run the full contents of `supabase-schema.sql`.
3. In Supabase → Project Settings → API, copy the Project URL and anon/publishable key into `.env`:

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

4. In Supabase Authentication, create your admin user manually. Do not enable public sign-ups for this private dashboard. Use a strong, unique password and enable any available extra authentication protection.
5. Keep Row Level Security enabled. The SQL policies are a starting point; if multiple staff accounts are added, implement an explicit admin-role allowlist before launch. The included policies treat any authenticated account as an admin, so only create trusted accounts.
6. Restart the dev server after changing `.env`.

The frontend only uses the public anon/publishable key. **Never put a Supabase service-role key in a Vite environment variable or browser code.**

## 4. Add contact details and WhatsApp

Fill these in `.env`:

```env
VITE_WHATSAPP_NUMBER=919848322201
VITE_COMPANY_PHONE=+91 98765 43210
VITE_COMPANY_EMAIL=contact@example.com
VITE_OFFICE_ADDRESS=Your actual office address, Visakhapatnam, Andhra Pradesh
```

Use your real WhatsApp number in international format with digits only. Replace the Maps search link in `src/main.jsx` with a verified Google Maps place URL once you have the exact office listing. Do not publish a guessed address.

## 5. Add your logo and project photographs

- Your supplied logo is already saved as `public/mk-promoters-logo.jpeg` and integrated into the header, footer and admin sign-in screen.
- The WhatsApp number is prefilled as `+91 98483 22201`; verify it is the correct business WhatsApp number before launch.
- Project image upload/storage is not wired up in this first starter. The database has an `image_url` column, and the card uses a visual placeholder until we connect Supabase Storage or another image host.
- Add real project records through `/admin` after Supabase is connected. Publish only accurate details and verified approvals/registration information.
- Add genuine testimonials only after receiving customer permission.

## 6. Build and deploy

```bash
npm run build
npm run preview
```

Deploy the project to Vercel by importing the Git repository, setting the environment variables in Project Settings → Environment Variables, and deploying. Add your existing domain in Vercel → Project → Settings → Domains, then follow the DNS records Vercel shows at your domain registrar. DNS changes can take time to propagate. Enable HTTPS through the hosting provider and test the site after the domain is connected.

## Included routes

- `/` — public website
- `/admin` — Supabase-authenticated dashboard (create/edit/delete projects, publish/draft projects, view enquiries)

## Important production checklist

- Add an explicit admin allowlist/role check in database policies before allowing multiple authenticated users.
- Add rate limiting / bot protection to public enquiry submissions before a public launch.
- Configure Supabase Auth redirect URLs for local development and your production domain.
- Add project image upload with file type/size restrictions and storage policies.
- Replace all sample/general copy and placeholder contact details with verified company information.
- Test enquiry submission, mobile navigation, project filters, login, RLS policies, and the production domain.


## 7. Domain name reminder

The company name is not enough to connect a domain. You will need the exact registered domain (for example, `yourcompany.in`) and access to its DNS settings. Once you provide the actual domain, add it in Vercel project settings and configure the DNS records Vercel displays. Do not change DNS records based on guesses.
