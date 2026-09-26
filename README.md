# Freman Browser

Freman is a desktop-first browser built for real web browsing, Web3 wallet connectivity, and curated extension support using Electron's bundled Chromium.

## Product direction

- Real browser tabs, navigation, history, bookmarks, and downloads
- Freman Search as default new-tab/search experience
- Web3 wallet injection using EIP-1193 provider patterns
- Curated extension gallery with verified compatibility labels
- FastAPI backend for search proxy, sync, and metadata APIs

## Repository structure

- `apps/desktop` — Electron shell and Chromium browser lifecycle
- `apps/web-ui` — React + TypeScript UI for tabs, chrome, search, wallet, and gallery
- `apps/backend` — FastAPI API for search, wallet metadata, and sync endpoints
- `packages/shared` — shared schema and constants

## Quick start

### Install Node dependencies

```bash
npm install
```

### Start backend

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r apps/backend/requirements.txt
python -m uvicorn app.main:app --reload --app-dir apps/backend
```

### Start frontend UI

```bash
npm --workspace apps/web-ui run dev
```

### Start Electron app

```bash
npm --workspace apps/desktop run dev
```

## Important note

This project intentionally does not build Chromium from source. It uses Electron's bundled Chromium, which matches the product requirement for a real browser with extension compatibility and Web3 support without custom Chromium compilation.
