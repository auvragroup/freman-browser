export type BrowserRuntime = {
  appName: string;
  version: string;
  backendUrl: string;
  searchProvider: string;
  getAppInfo: () => Promise<BrowserRuntime>;
  getBackendUrl: () => string;
  getSearchProvider: () => string;
};

declare global {
  interface Window {
    freman?: BrowserRuntime;
  }
}
