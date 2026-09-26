import { app, BrowserWindow } from 'electron';
import path from 'path';

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1400,
    height: 1000,
    minWidth: 1200,
    minHeight: 760,
    titleBarStyle: 'hiddenInset',
    backgroundColor: '#091018',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (process.env.NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '../web-ui/dist/index.html'));
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
