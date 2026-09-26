import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('freman', {
  appName: 'Freman',
  version: '0.1.0',
  
  // App info
  getAppInfo: () => ipcRenderer.invoke('get-app-info'),
  
  // Navigation
  openUrl: (url: string) => ipcRenderer.invoke('open-url', url),
  
  // History
  getHistory: () => ipcRenderer.invoke('get-history'),
  
  // Bookmarks
  getBookmarks: () => ipcRenderer.invoke('get-bookmarks'),
  addBookmark: (title: string, url: string) => ipcRenderer.invoke('add-bookmark', { title, url }),
  
  // Extensions
  loadExtension: (path: string) => ipcRenderer.invoke('load-extension', path),
  getLoadedExtensions: () => ipcRenderer.invoke('get-loaded-extensions'),
  
  // Wallet
  injectWalletProvider: () => {
    window.ethereum = {
      isMetaMask: false,
      isFreman: true,
      chainId: '0x1',
      networkVersion: '1',
      selectedAddress: null,
      request: async ({ method, params }: { method: string; params?: unknown[] }) => {
        if (method === 'eth_chainId') return '0x1';
        if (method === 'eth_accounts') return [];
        if (method === 'eth_requestAccounts') {
          return ipcRenderer.invoke('wallet-request-accounts');
        }
        throw new Error(`Method ${method} not supported`);
      },
      on: (event: string, callback: Function) => {
        ipcRenderer.on(`wallet-${event}`, (_, data) => callback(data));
      },
      once: (event: string, callback: Function) => {
        ipcRenderer.once(`wallet-${event}`, (_, data) => callback(data));
      },
      removeListener: (event: string) => {
        ipcRenderer.removeAllListeners(`wallet-${event}`);
      }
    };
  }
});

export {};
