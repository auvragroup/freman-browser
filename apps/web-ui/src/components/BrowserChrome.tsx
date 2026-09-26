import { useState } from 'react';
import { BrowserTab } from '../App';

interface BrowserChromeProps {
  tabs: BrowserTab[];
  onNewTab: () => void;
  onCloseTab: (id: string) => void;
  onTabSwitch: (id: string) => void;
  onSearch: (query: string) => void;
  onNavigate: (url: string) => void;
}

export default function BrowserChrome({
  tabs,
  onNewTab,
  onCloseTab,
  onTabSwitch,
  onSearch,
  onNavigate
}: BrowserChromeProps) {
  const [addressInput, setAddressInput] = useState('');

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInput.trim()) {
      let url = addressInput.trim();
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      onNavigate(url);
      setAddressInput('');
    }
  };

  return (
    <div className="border-b border-slate-800 bg-[#101b2a] px-4 py-3">
      <div className="flex items-center gap-2 text-sm mb-3">
        <div className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-400" />
          <span className="h-3 w-3 rounded-full bg-yellow-400" />
          <span className="h-3 w-3 rounded-full bg-green-400" />
        </div>

        <div className="ml-3 flex flex-1 items-center gap-2 rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-300">
          <button className="text-lg">←</button>
          <button className="text-lg">→</button>
          <button className="text-lg">⟳</button>
          <form onSubmit={handleAddressSubmit} className="flex-1">
            <input
              value={addressInput}
              onChange={(e) => setAddressInput(e.target.value)}
              placeholder="Search or enter URL"
              className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder-slate-500"
            />
          </form>
        </div>

        <button
          onClick={onNewTab}
          className="rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-xs text-slate-200"
        >
          + New Tab
        </button>
      </div>

      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={[
              'rounded-t-md border px-3 py-2 text-xs flex items-center gap-2',
              tab.active
                ? 'border-slate-700 bg-slate-900 text-slate-100'
                : 'border-transparent bg-transparent text-slate-400'
            ].join(' ')}
          >
            <button
              onClick={() => onTabSwitch(tab.id)}
              className="flex-1"
            >
              {tab.title}
            </button>
            <button
              onClick={() => onCloseTab(tab.id)}
              className="text-slate-500 hover:text-slate-200 text-[10px]"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
