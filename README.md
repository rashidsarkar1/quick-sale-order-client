# Quick Sale & Sales Order

Standalone React + TypeScript app for the existing Quick Sale and Sales Order workflows. It includes order viewing and receipt modification. It connects directly to the backend you already run; this project does not include or start a backend server.

## Setup

1. Install Node.js (18 or newer).
2. Copy `.env.example` to `.env`.
3. Set `VITE_API_BASE_URL` to the backend API base URL, including `/api/v1`, for example `http://localhost:3000/api/v1`.
4. In this folder, run `npm install` and then `npm run dev`.
5. Open the local URL printed by Vite.

Run the existing backend separately. Its CORS configuration must allow the local Vite origin, and browser requests must be able to reach the configured URL. If the backend URL is HTTPS, use an HTTPS API URL as well.

To create a static production build, run `npm run build`; the output is written to `dist/`.
