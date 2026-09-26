import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('freman', {
  appName: 'Freman',
  version: '0.1.0',
  getBackendUrl: () => 'http://localhost:8000',
  getSearchProvider: () => 'brave',
  getAppInfo: async () => {
    return ipcRenderer.invoke('get-app-info');
  }
});

export {};
