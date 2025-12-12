# Royal Oak
### Arboriculture & Tree Conservation

This is a premium, high-performance website built specifically for the **tree surgeon** trade sector. It features a modern design system, local SEO optimization, and a comprehensive **Admin Business Suite** to manage operations.

## 🚀 Key Features

### 1. Modern Front-End
*   **Built with Astro**: Blazingly fast static site generation.
*   **Tailwind CSS**: Custom design system tailored to the brand.
*   **Responsive Design**: Mobile-first approach for all pages.
*   **Local SEO**: Optimized footer and content for local service area visibility.

### 2. Admin Business Suite (New!)
A password-protected portal (/admin) designed to run the business, not just market it.

*   **📊 Quote Generator**: creating instant, accurate estimates for customers.
*   **🧾 Invoice Manager**: Generate professional PDF invoices and draft AI-powered email cover letters.
*   **🏗️ Job Board**: Kanban-style job management to track scheduled, active, and completed work.
*   **💷 Tax Estimator**: Real-time calculator for Income Tax and National Insurance liabilities.

## 🛠️ Tech Stack

*   **Framework**: [Astro](https://astro.build/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **Interactivity**: React (for Admin Suite tools)
*   **Deployment**: Vercel / Netlify Ready

## 🏁 Getting Started

### Prerequisites
*   Node.js (v18+)
*   npm

### Installation

`ash
# Install dependencies
npm install
`

### Development

`ash
# Start local dev server
npm run dev
`
Visit \http://localhost:4321\ to view the site.
Visit \http://localhost:4321/admin\ to access the client portal.

### Building for Production

`ash
# Build the project
npm run build
`

## 📂 Project Structure

\\\
/src
  /components    # UI Components (Header, Footer, specialized blocks)
    /admin       # React components for the Admin Suite (JobManager, InvoiceGenerator, etc.)
  /layouts       # Main page layouts
  /pages         # Route definitions
    /admin       # Admin portal routes (dashboard, invoices, jobs, etc.)
  /styles        # Global CSS and Tailwind directives
\\\

---
*Built by Empower Digital Solutions*
