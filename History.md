# Project History Log

## [2026-04-23] Page Separation & Flow.md Tracking Integration
- **Refactoring UI Architecture:**
  - Extracted UI sections from `App.jsx` into separate Page components: `Home.jsx`, `Service.jsx`, `Queue.jsx`, `About.jsx`, and `Price.jsx`.
  - Simplified `App.jsx` to primarily act as a layout and routing container.
- **Vite Build Fix:**
  - Downgraded `vite` from the invalid `^8.0.0-beta.13` version to `^6.0.0` in `package.json` to resolve `pnpm dev` not launching.
  - Ran `pnpm install` successfully to apply the fix.
- **Flow.md Integration:**
  - Created a local task tracking system (`src/utils/tracker.js`) mimicking the database schema and order flow mentioned in `Flow.md`.
  - Integrated `tracker.js` into `PricingConfigurator.jsx` to log `create_print_job` and `send_facebook_message` when clicking the "Send Order" button.
  - Integrated `tracker.js` into `Queue.jsx` to dynamically load live queue from `localStorage` mock database instead of purely static state.
