# Security & Data Safety Guide

This document outlines the architectural safeguards and best practices implemented to protect Carrillo Dynamics and its clients' data.

## 1. Environment Variables (.env)
We use `.env` files to keep sensitive information (like the n8n webhook URL) out of the source code.

### Why this matters:
- **Prevent Leakage**: By using `import.meta.env.VITE_N8N_WEBHOOK_URL`, the actual URL is only injected during build time or local development.
- **Git Safety**: The `.env` file should **never** be committed to version control. Our project includes a `.gitignore` that specifically excludes these files.

### How to use:
1. Create a file named `.env` in the root directory.
2. Add your secrets: `VITE_N8N_WEBHOOK_URL=https://n8n.yourdomain.com/webhook/...`
3. Restart your dev server for changes to take effect.

## 2. Client Data Privacy
- **Stateless Frontend**: The website does not store client PII (Personally Identifiable Information) in the browser's local storage or cookies.
- **Secure Intake**: All form data is transmitted via HTTPS directly to our secure backend (n8n), minimizing exposure.
- **Data Minimization**: We only request the minimum data necessary for a high-quality systems consultation.

## 3. Deployment Security
- **Production Build**: During the build process (`npm run build`), Vite optimizes and minifies the code, removing development-only logs and comments.
- **Environment Injections**: Ensure your hosting provider (Vercel, Netlify, etc.) has the environment variables set in their dashboard so they are available in the production environment.

---
**Carrillo Dynamics** | *Industrial-Grade Security Architecture*
