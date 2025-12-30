## Vue Chat (Telegram-style clone)

Lightweight Vue 3 chat client that talks to the NestJS backend (telegram_clone_backend). Supports auth, presence, avatars, and real-time messaging via WebSockets.

Deployed sample: https://projects.vladislav0151.ru/vue-chat/
Backend repo: https://github.com/89hikari/telegram_clone_backend

### Features

- Email signup/login with token-based auth
- Email verification + resend flow
- User search and online presence indicators
- Avatar upload and display (per-user avatar endpoints)
- Real-time chat with WebSocket gateway
- Responsive layout with left panel, chat view, and modals

### Stack

- Vue 3, TypeScript, Pinia, Vue Router
- Vite build tooling, Tailwind/Sass styling
- Socket.IO client for presence and messaging
- Axios for HTTP

### Prerequisites

- Node.js 20+
- npm (or pnpm/yarn if you prefer; adjust commands accordingly)
- Running instance of telegram_clone_backend v1 (NestJS). Default assumes http://localhost:5000/vue-chat/api/v1 and Socket.IO at http://localhost:5000.

### Quick Start (local)

1. Install deps

- npm install

2. Configure environment

- Create `.env.local` (Vite picks this up):

  ```env
  # Base REST API path (auto-appends /v1 if missing)
  VITE_SERVER_API_PATH=http://localhost:5000/vue-chat/api/v1

  # Socket.IO endpoint
  VITE_SERVER_URL=http://localhost:5000
  ```

3. Run dev server

- npm run dev
- Open the printed local URL (e.g., http://localhost:5173)

4. Type-check & build

- npm run type-check
- npm run build
- npm run preview (serves the production build locally)

5. Tests

- Unit: npm run test:unit
- E2E (needs backend running and `npm run preview`): npm run test:e2e

### Deployment notes

- The build uses `vite build --base=/vue-chat/` (see package.json). Keep the app served under that base path or override `--base` when building.
- Ensure `VITE_SERVER_API_PATH` points to the backend v1 routes (e.g., https://your-host/vue-chat/api/v1).

### Roadmap / TODO

- Load older messages (pagination/infinite scroll beyond last 30)
- Profile editing (bio, display settings)
- Rich presence and user info panel
- Voice messages and media attachments
- Per-chat settings (mute, pin) and read receipts
- More robust error states and offline handling

### Contributing

- Fork and PRs welcome. Please run lint/type-check/tests before submitting:
  - npm run lint
  - npm run type-check
  - npm run test:unit
