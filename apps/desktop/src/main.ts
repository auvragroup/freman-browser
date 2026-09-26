import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 980,
    minWidth: 1200,
    minHeight: 760,
    backgroundColor: '#091018',
    titleBarStyle: 'hiddenInset',
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  const startUrl = 'http://localhost:5173';
  mainWindow.loadURL(startUrl).catch(() => {
    console.warn('Local UI not available yet; start the Vite dev server first.');
  });

  mainWindow.webContents.setWindowOpenHandler(() => ({ action: 'deny' }));
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

ipcMain.handle('get-app-info', () => ({
  appName: 'Freman',
  version: '0.1.0',
  backendUrl: 'http://localhost:8000',
  searchProvider: 'brave'
}));
