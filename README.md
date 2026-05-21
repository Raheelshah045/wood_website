# Ahmed Wood Art Portfolio & Lead Gen Web Application

A full-stack, production-ready web application for **Ahmed Wood Art** built using **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. It features a modern, premium responsive UI with custom smooth hover effects, scroll transitions, and a lead inquiry form integrated with a serverless backend and **MongoDB**.

## 🛠️ Tech Stack & Features

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4, custom smooth scroll and wood-grain pattern overlays
- **Database**: MongoDB via Mongoose connection pooling (fully serverless-compatible)
- **Validation**: Strict schema-based input checking using Zod
- **Interactions**:
  - Fine pointer mouse-following dual cursor rings
  - 3D perspective tilting hover cards for Services
  - Intersection Observer scroll-reveal animations
  - Dynamic responsive marquee text ticker
  - Real-time client-validated inquiry submission form with status alerts
- **SEO & Accessibility**: Complete semantic HTML5 markup, structured meta properties, and `prefers-reduced-motion` compliance

---

## ⚙️ Getting Started

### 1. Prerequisite Installations
- Node.js (v18.x or later)
- npm or another package manager (e.g. yarn, pnpm)
- MongoDB Instance (local database or free-tier MongoDB Atlas cluster)

### 2. Environment Configuration
Create a `.env.local` file in the root directory and define your MongoDB URI:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ahmed_wood_art?retryWrites=true&w=majority
```

### 3. Run Development Server
Install local packages and boot the hot-reloading development server:
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Build for Production
To verify and generate optimized static pages and serverless endpoints:
```bash
npm run build
npm start
```

---

## 🚀 Deployment Instructions

### Frontend & API (Vercel)
The easiest way to deploy this full-stack Next.js project is via the **Vercel Platform**:
1. Push the code repository to GitHub, GitLab, or Bitbucket.
2. Log in to Vercel, select **Import Project**, and connect your repository.
3. Under **Environment Variables**, add the name `MONGODB_URI` and paste your production connection string.
4. Click **Deploy**. Vercel will automatically handle build compilation, route optimization, and serverless endpoint mapping.

### Database (MongoDB Atlas)
1. Register a free account at [mongodb.com/atlas](https://www.mongodb.com/cloud/atlas).
2. Deploy a free cluster (M0) in your preferred region.
3. Under **Network Access**, whitelist `0.0.0.0/0` (required for Vercel dynamic serverless IP ranges).
4. Under **Database Access**, create a user account with a strong password.
5. Click **Connect** -> **Drivers**, select Node.js, copy the connection string, and supply it to Vercel and your `.env.local`.
