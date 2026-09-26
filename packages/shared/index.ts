export type BrowserRuntime = {
  appName: string;
  version: string;
  getBackendUrl: () => string;
  getSearchProvider: () => string;
};

declare global {
  interface Window {
    freman?: BrowserRuntime;
  }
}
