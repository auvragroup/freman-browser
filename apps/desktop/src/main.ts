import { app, BrowserWindow, ipcMain, Menu } from 'electron';
import path from 'path';
import fs from 'fs';

let mainWindow: BrowserWindow | null = null;
const windowStateFile = path.join(app.getPath('userData'), 'window-state.json');

interface WindowState {
  x?: number;
  y?: number;
  width: number;
  height: number;
}

const getWindowState = (): WindowState => {
  try {
    if (fs.existsSync(windowStateFile)) {
      return JSON.parse(fs.readFileSync(windowStateFile, 'utf8'));
    }
  } catch {}
  return { width: 1440, height: 980 };
};

const saveWindowState = (win: BrowserWindow) => {
  const bounds = win.getBounds();
  fs.writeFileSync(windowStateFile, JSON.stringify({
    x: bounds.x,
    y: bounds.y,
    width: bounds.width,
    height: bounds.height
  }));
};

const createWindow = () => {
  const state = getWindowState();
  
  mainWindow = new BrowserWindow({
    x: state.x,
    y: state.y,
    width: state.width,
    height: state.height,
    minWidth: 1200,
    minHeight: 760,
    backgroundColor: '#091018',
    titleBarStyle: 'hiddenInset',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
      sandbox: true
    }
  });

  mainWindow.on('close', () => {
    if (mainWindow) saveWindowState(mainWindow);
  });

  const startUrl = process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173'
    : `file://${path.join(__dirname, '../web-ui/dist/index.html')}`;

  mainWindow.loadURL(startUrl).catch((err) => {
    console.error('Failed to load URL:', err);
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      return { action: 'allow' };
    }
    return { action: 'deny' };
  });

  mainWindow.webContents.session.setPreference('preload-extensions', true);
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC handlers for browser state
ipcMain.handle('get-app-info', () => ({
  appName: 'Freman',
  version: '0.1.0',
  platform: process.platform,
  backendUrl: process.env.BACKEND_URL || 'http://localhost:8000',
  searchProvider: process.env.SEARCH_PROVIDER || 'brave'
}));

ipcMain.handle('open-url', async (_, url: string) => {
  if (mainWindow && (url.startsWith('http:') || url.startsWith('https:'))) {
    mainWindow.webContents.loadURL(url);
    return { success: true };
  }
  return { success: false, error: 'Invalid URL' };
});

ipcMain.handle('get-history', async () => {
  return [
    { id: '1', title: 'Freman Search', url: 'https://freman.search', timestamp: Date.now() },
    { id: '2', title: 'Ethereum', url: 'https://ethereum.org', timestamp: Date.now() - 3600000 }
  ];
});

ipcMain.handle('add-bookmark', async (_, { title, url }) => {
  return { id: Math.random().toString(), title, url, timestamp: Date.now() };
});

ipcMain.handle('get-bookmarks', async () => {
  return [
    { id: '1', title: 'Freman GitHub', url: 'https://github.com/auvragroup/freman-browser' },
    { id: '2', title: 'Ethereum', url: 'https://ethereum.org' },
    { id: '3', title: 'OpenSea', url: 'https://opensea.io' }
  ];
});

ipcMain.handle('load-extension', async (_, extensionPath: string) => {
  try {
    if (mainWindow) {
      const ext = await mainWindow.webContents.session.loadExtension(extensionPath);
      return { success: true, ext: ext?.id };
    }
  } catch (err) {
    return { success: false, error: (err as Error).message };
  }
});

ipcMain.handle('get-loaded-extensions', async () => {
  if (mainWindow) {
    const extensions = mainWindow.webContents.session.getAllExtensions();
    return extensions.map(ext => ({
      id: ext.id,
      name: ext.name,
      version: ext.version,
      path: ext.path
    }));
  }
  return [];
});
