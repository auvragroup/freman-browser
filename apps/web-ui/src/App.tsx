import { useEffect, useMemo, useState } from 'react';

const initialTabs = [
  { id: 'search', title: 'Freman Search', active: true },
  { id: 'wallet', title: 'Wallet', active: false },
  { id: 'gallery', title: 'Extensions', active: false }
];

const cardStats = [
  { label: 'Engine', value: 'Electron + Chromium' },
  { label: 'Search', value: 'Brave-ready' },
  { label: 'Wallet', value: 'EIP-1193-ready' },
  { label: 'Extensions', value: 'Curated gallery' }
];

const searchIdeas = [
  'What is the safest architecture for a Web3 desktop browser?',
  'How can a typical dApp detect an injected wallet provider?',
  'How do verified browser extensions load in Electron?',
  'Which API should power Freman Search and new-tab results?'
];

export default function App() {
  const [appInfo, setAppInfo] = useState<{ appName: string; version: string; backendUrl: string; searchProvider: string } | null>(null);
  const [query, setQuery] = useState('Freman Search');

  useEffect(() => {
    if (typeof window !== 'undefined' && 'freman' in window) {
      window.freman?.getAppInfo?.().then((data) => setAppInfo(data)).catch(() => null);
    }
  }, []);

  const searchUrl = useMemo(() => {
    if (!query.trim()) return 'https://freman.search';
    return `https://freman.search?q=${encodeURIComponent(query.trim())}`;
  }, [query]);

  return (
    <div className="h-full bg-[#091018] text-slate-100">
      <div className="border-b border-slate-800 bg-[#101b2a] px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>

          <div className="ml-3 flex flex-1 items-center gap-2 rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-300">
            <span className="text-lg">🔎</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full bg-transparent text-sm text-slate-200 outline-none"
            />
          </div>

          <button className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200">
            + New Tab
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2">
          {initialTabs.map((tab) => (
            <button
              key={tab.id}
              className={[
                'rounded-t-md border px-3 py-2 text-xs',
                tab.active
                  ? 'border-slate-700 bg-slate-900 text-slate-100'
                  : 'border-transparent bg-transparent text-slate-400'
              ].join(' ')}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      <div className="grid h-[calc(100%-110px)] grid-cols-[320px_1fr]">
        <aside className="border-r border-slate-800 bg-[#0c1320] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Freman</h2>
            <span className="rounded-full bg-brand-500/20 px-2 py-1 text-[10px] uppercase tracking-wide text-brand-200">
              {appInfo?.version ?? 'v0.1'}
            </span>
          </div>

          <div className="space-y-3">
            {cardStats.map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
                <div className="text-[11px] uppercase tracking-[0.08em] text-slate-400">{item.label}</div>
                <div className="mt-1 text-base font-medium text-slate-100">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <div className="text-[11px] uppercase tracking-[0.08em] text-slate-400">Runtime</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>• App: {appInfo?.appName ?? 'Freman'}</li>
              <li>• Search provider: {appInfo?.searchProvider ?? 'brave'}</li>
              <li>• Backend: {appInfo?.backendUrl ?? 'http://localhost:8000'}</li>
              <li>• URL: {searchUrl}</li>
            </ul>
          </div>
        </aside>

        <main className="bg-[#091018] p-4">
          <div className="rounded-2xl border border-slate-800 bg-[#101b2a] p-4 shadow-2xl shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Search</p>
                <h3 className="text-2xl font-semibold text-white">Freman Search</h3>
              </div>
              <button className="rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white">
                Search web
              </button>
            </div>

            <div className="grid gap-3 rounded-xl border border-slate-700 bg-slate-950/60 p-3">
              {searchIdeas.map((idea, index) => (
                <div key={idea} className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-500/15 text-[10px] text-brand-200">
                    {index + 1}
                  </span>
                  {idea}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
