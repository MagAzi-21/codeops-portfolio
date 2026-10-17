# Addis Eats - Deployment Pre-Flight Checklist (Day 48)

## Pre-Flight Verification

| Check Item | Command / Location | Expected Result | Status |
| :--- | :--- | :--- | :--- |
| **Production Build** | `npm run build` | Zero compile errors, explicit route table printed[cite: 66]. | **PASSED** |
| **Environment Audit** | `git status`, `.gitignore` | `.env*.local` strictly excluded from git tracking[cite: 66]. | **PASSED** |
| **Public Secret Leak** | Search `NEXT_PUBLIC` | No database connection strings or secrets prefixed with `NEXT_PUBLIC`[cite: 66]. | **PASSED** |
| **Keyboard Accessibility**| Physical Tab & Enter test | Every card and button reachable; modal closes via Escape. | **PASSED** |
| **Double-Submit Guard** | Fast double-click checkout | Button disables during request; only one order recorded. | **PASSED** |
| **Touch Targets** | Inspect CSS rules | All buttons, inputs, and links measure at least 44x44px[cite: 65, 68]. | **PASSED** |

## Vercel Deployment Workflow

1. Push repository branch to GitHub[cite: 67].
2. Link project in Vercel Dashboard[cite: 67].
3. Configure Environment Variables for **Preview** and **Production** separately (`DATABASE_URL`, `SESSION_SECRET`)[cite: 66, 67].
4. Deploy and verify the live domain in an incognito/private browser window[cite: 67, 68].