# Freman Browser

A desktop-first browser platform built on Electron + Chromium, with a React browser chrome, FastAPI backend, and Web3/extension scaffolding.

## Why Electron instead of Chromium source?

This project intentionally uses Electron's bundled Chromium rather than building Chromium from source. That matches the product constraints:

- real browser engine via Electron/Chromium
- extension support through `session.loadExtension()`
- fast iteration and a desktop-first workflow
- no custom Chromium source build in scope

## Architecture

- `apps/desktop` — Electron shell, BrowserWindow, preload IPC, app lifecycle
- `apps/web-ui` — React + TypeScript + Tailwind browser chrome UI
- `apps/backend` — FastAPI API for search, sync, and wallet metadata
- `packages/shared` — shared types/contracts between UI and backend

## Quick start

### 1) Install Node dependencies

```bash
npm install
```

### 2) Start the backend

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r apps/backend/requirements.txt
python -m uvicorn app.main:app --reload --app-dir apps/backend
```

### 3) Start the UI

```bash
npm --workspace apps/web-ui run dev
```

### 4) Start the Electron app

```bash
npm --workspace apps/desktop run dev
```

## Product goals

- real browser tabs and navigation
- Freman Search as default new-tab/search page
- synced bookmarks/history/settings
- wallet provider injection and read-only balances
- curated extension gallery support

## Notes

This is a starter scaffold designed to be extended toward the full Freman product roadmap.
