const tabs = [
  { id: 'tab-1', title: 'Freman Search', active: true },
  { id: 'tab-2', title: 'Wallet', active: false },
  { id: 'tab-3', title: 'Gallery', active: false }
];

const stats = [
  { label: 'Extensions', value: '3 loaded' },
  { label: 'Wallet', value: 'Connected' },
  { label: 'Sync', value: 'Live' }
];

export default function App() {
  return (
    <div className="h-full bg-[#0a0d14] text-slate-100">
      <div className="border-b border-slate-800 bg-[#101824] px-4 py-3">
        <div className="flex items-center gap-2 text-sm">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
          <div className="ml-3 flex flex-1 items-center gap-2 rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-300">
            <span className="text-lg">🔎</span>
            <input
              value="Freman Search"
              readOnly
              className="w-full bg-transparent text-sm text-slate-200 outline-none"
            />
          </div>
          <button className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200">
            + New Tab
          </button>
        </div>

        <div className="mt-3 flex items-center gap-2">
          {tabs.map((tab) => (
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

      <div className="grid h-[calc(100%-120px)] grid-cols-[320px_1fr]">
        <aside className="border-r border-slate-800 bg-[#0d1520] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Freman</h2>
            <span className="rounded-full bg-brand-500/20 px-2 py-1 text-[10px] uppercase tracking-wide text-brand-200">
              v0.1
            </span>
          </div>

          <div className="space-y-3">
            {stats.map((item) => (
              <div key={item.label} className="rounded-xl border border-slate-800 bg-slate-900/70 p-3">
                <div className="text-[11px] uppercase tracking-[0.08em] text-slate-400">{item.label}</div>
                <div className="mt-1 text-base font-medium text-slate-100">{item.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950/60 p-3">
            <div className="text-[11px] uppercase tracking-[0.08em] text-slate-400">Browser state</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>• Real Chromium shell active</li>
              <li>• Search engine proxy ready</li>
              <li>• Wallet injection scaffolded</li>
              <li>• Extension gallery ready</li>
            </ul>
          </div>
        </aside>

        <main className="bg-[#0a0d14] p-4">
          <div className="rounded-2xl border border-slate-800 bg-[#0f1724] p-4 shadow-2xl shadow-black/20">
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
              {[
                'Browser engine and extension compatibility',
                'Web3 wallet provider injection',
                'Brave Search API proxy patterns',
                'Sync bookmarks and settings securely'
              ].map((query, index) => (
                <div key={query} className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-200">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-500/15 text-[10px] text-brand-200">
                    {index + 1}
                  </span>
                  {query}
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
