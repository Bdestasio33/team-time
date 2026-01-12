# Claude Instructions for Team-Time

## Working Memory

See `CLAUDE-WORKING.md` for:
- Rules that must always be followed
- Current task progress and context
- Notes and observations

**Always check and update CLAUDE-WORKING.md when working on tasks.**

## Project Overview

Team-Time is a React web application built with:
- React 19 + TypeScript
- Vite (build tool)
- Material-UI (styling)
- Biome (linting/formatting)
- nginx + Docker (production deployment to fly.io)

## Key Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npm run lint         # Lint and fix
npm run format       # Format code
```

## Deployment

Deploy to fly.io with `fly deploy`
