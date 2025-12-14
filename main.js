const { app, BrowserWindow, Menu } = require('electron');
require('@electron/remote/main').initialize();

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 900,
    minWidth: 300,
    minHeight: 400,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  require('@electron/remote/main').enable(win.webContents);
  win.loadFile('index.html');

  // Context menu
  win.webContents.on('context-menu', (e, params) => {
    const isOnTop = win.isAlwaysOnTop();
    const menu = Menu.buildFromTemplate([
      {
        label: isOnTop ? '✓ Stay on Top' : 'Stay on Top',
        type: 'checkbox',
        checked: isOnTop,
        click: () => {
          win.setAlwaysOnTop(!isOnTop);
        }
      }
    ]);
    menu.popup();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});