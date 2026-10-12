import { defineConfig } from '@playwright/test'
export default defineConfig({
  testDir: './tests', timeout: 60000, workers: 1,
  use: { browserName: 'chromium', headless: true },
  webServer: [
    { command: 'npm run start:memory --prefix ../crystal-cotting-backend', url: 'http://localhost:5912/health', timeout: 120000, env: { PORT: '5912', WEBSITE_ORIGIN: 'http://localhost:5184', ADMIN_ORIGIN: 'http://localhost:5183', JWT_SECRET: 'local-browser-test-secret', ADMIN_EMAIL: 'browser@example.com', ADMIN_PASSWORD: 'BrowserTest123!' } },
    { command: 'npm run dev -- --host 127.0.0.1 --port 5184', url: 'http://localhost:5184', timeout: 60000, env: { VITE_API_BASE_URL: 'http://localhost:5912/api/' } },
    { command: 'npm run dev --prefix ../crystal-cotting-admin -- --host 127.0.0.1 --port 5183', url: 'http://localhost:5183', timeout: 60000, env: { VITE_API_BASE_URL: 'http://localhost:5912/api/' } },
  ],
})
