const { app, BrowserWindow } = require('electron');
const path = require('path');

// Lancer le serveur Express (et donc la base de données)
// Assure-toi que le chemin vers server.js est correct (ici, on suppose qu'il est dans le même dossier que main.js)
require('./server.js');

const isDev = process.env.NODE_ENV === 'development'; // ou utilisez un package comme electron-is-dev

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: isDev
      ? {
          nodeIntegration: true,
          contextIsolation: false,
        }
      : {
          preload: path.join(__dirname, 'preload.js'),
          nodeIntegration: false,
          contextIsolation: true,
        },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    // Assurez-vous que le chemin correspond à la structure générée par React
    mainWindow.loadURL(`file://${path.join(__dirname, '../renderer/build/index.html')}`);
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
