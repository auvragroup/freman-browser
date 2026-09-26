export type BrowserRuntime = {
  appName: string;
  version: string;
  getAppInfo: () => Promise<{ appName: string; version: string; platform: string; backendUrl: string; searchProvider: string }>;
  openUrl: (url: string) => Promise<{ success: boolean }>;
  getHistory: () => Promise<Array<{ id: string; title: string; url: string; timestamp: number }>>;
  getBookmarks: () => Promise<Array<{ id: string; title: string; url: string }>>;
  addBookmark: (title: string, url: string) => Promise<{ id: string; title: string; url: string; timestamp: number }>;
  loadExtension: (path: string) => Promise<{ success: boolean; ext?: string; error?: string }>;
  getLoadedExtensions: () => Promise<Array<{ id: string; name: string; version: string; path: string }>>;
  injectWalletProvider: () => void;
};

declare global {
  interface Window {
    freman?: BrowserRuntime;
    ethereum?: {
      isMetaMask: boolean;
      isFreman: boolean;
      chainId: string;
      networkVersion: string;
      selectedAddress: string | null;
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
      on: (event: string, callback: Function) => void;
      once: (event: string, callback: Function) => void;
      removeListener: (event: string) => void;
    };
  }
}
