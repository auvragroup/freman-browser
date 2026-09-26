import { useEffect, useState } from 'react';
import BrowserChrome from './components/BrowserChrome';
import SearchPage from './pages/SearchPage';
import TabContent from './components/TabContent';

export type TabType = 'search' | 'page' | 'wallet' | 'gallery';

export interface BrowserTab {
  id: string;
  type: TabType;
  title: string;
  url?: string;
  favicon?: string;
  active: boolean;
}

export default function App() {
  const [tabs, setTabs] = useState<BrowserTab[]>([
    { id: '1', type: 'search', title: 'Freman Search', active: true }
  ]);
  const [currentQuery, setCurrentQuery] = useState('');
  const [bookmarks, setBookmarks] = useState<Array<{ id: string; title: string; url: string }>>([]);
  const [extensions, setExtensions] = useState<Array<{ id: string; name: string; version: string; path: string }>>([]);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'freman' in window) {
      window.freman?.getBookmarks?.().then(setBookmarks);
      window.freman?.getLoadedExtensions?.().then(setExtensions);
      window.freman?.injectWalletProvider?.();
    }
  }, []);

  const handleNewTab = () => {
    const id = Math.random().toString();
    const newTab: BrowserTab = { id, type: 'search', title: 'New Tab', active: true };
    setTabs(prev => [
      ...prev.map(t => ({ ...t, active: false })),
      newTab
    ]);
  };

  const handleCloseTab = (id: string) => {
    const remaining = tabs.filter(t => t.id !== id);
    if (remaining.length === 0) {
      handleNewTab();
    } else {
      const nextActive = remaining[0];
      setTabs(remaining.map(t => ({ ...t, active: t.id === nextActive.id })));
    }
  };

  const handleTabSwitch = (id: string) => {
    setTabs(prev => prev.map(t => ({ ...t, active: t.id === id })));
  };

  const handleSearch = async (query: string) => {
    setCurrentQuery(query);
    const backendUrl = 'http://localhost:8000';
    try {
      const res = await fetch(`${backendUrl}/search?query=${encodeURIComponent(query)}&provider=brave`);
      const data = await res.json();
      console.log('Search results:', data);
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  const handleNavigate = async (url: string) => {
    const activeTab = tabs.find(t => t.active);
    if (activeTab) {
      setTabs(prev => prev.map(t => 
        t.id === activeTab.id 
          ? { ...t, url, type: 'page', title: url }
          : t
      ));
      if (typeof window !== 'undefined' && 'freman' in window) {
        await window.freman?.openUrl?.(url);
      }
    }
  };

  const handleAddBookmark = async (title: string, url: string) => {
    if (typeof window !== 'undefined' && 'freman' in window) {
      const bookmark = await window.freman?.addBookmark?.(title, url);
      if (bookmark) {
        setBookmarks(prev => [...prev, bookmark]);
      }
    }
  };

  const activeTab = tabs.find(t => t.active);

  return (
    <div className="h-full bg-[#091018] text-slate-100 flex flex-col">
      <BrowserChrome
        tabs={tabs}
        onNewTab={handleNewTab}
        onCloseTab={handleCloseTab}
        onTabSwitch={handleTabSwitch}
        onSearch={handleSearch}
        onNavigate={handleNavigate}
      />

      <div className="flex-1 overflow-hidden bg-[#091018]">
        {activeTab?.type === 'search' && (
          <SearchPage onSearch={handleSearch} query={currentQuery} />
        )}
        {activeTab?.type === 'page' && activeTab.url && (
          <TabContent url={activeTab.url} />
        )}
        {activeTab?.type === 'wallet' && (
          <div className="p-4 text-center text-slate-400">
            <p>Wallet panel — Web3 provider injection ready</p>
          </div>
        )}
        {activeTab?.type === 'gallery' && (
          <div className="p-4 text-center text-slate-400">
            <p>Extension gallery — {extensions.length} extensions loaded</p>
          </div>
        )}
      </div>
    </div>
  );
}
