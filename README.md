# Team Time

A React web application built with Vite, TypeScript, and Material-UI.

## Prerequisites

- Node.js 22+
- npm

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at http://localhost:5173

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run linter and fix issues |
| `npm run lint:check` | Check for lint errors |
| `npm run format` | Format code |
| `npm run format:check` | Check code formatting |
| `npm run quality-checks` | Run all quality checks |
| `npm run quality-checks:write` | Run quality checks and fix issues |

## Deployment to fly.io

1. Install the fly CLI: https://fly.io/docs/hands-on/install-flyctl/

2. Login to fly.io:
   ```bash
   fly auth login
   ```

3. Create the app (first time only):
   ```bash
   fly apps create team-time
   ```

4. Deploy:
   ```bash
   fly deploy
   ```

## Tech Stack

- React 19
- TypeScript
- Vite
- Material-UI (MUI)
- Biome (linting/formatting)
- nginx (production server)
