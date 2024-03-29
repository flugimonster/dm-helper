// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, globalShortcut } = require("electron");
const path = require("path");
const fs = require("fs");
const { avatarsPath, encountersPath } = require('./src/consts')
let child = null;

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    // width: 300,
    // height: 600,
    // frame: false,
    // transparent: true,
    useContentSize: true,

    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },

  });

  globalShortcut.register('f5', function () {
    BrowserWindow.getFocusedWindow().reload();
  });

  globalShortcut.register('CommandOrControl+R', function () {
    BrowserWindow.getFocusedWindow().reload();
  });

  // globalShortcut.register('f11', function () {
  //   BrowserWindow.getFocusedWindow().webContents.openDevTools();
  // });

  globalShortcut.register('CommandOrControl+Shift+I', function () {
    BrowserWindow.getFocusedWindow().webContents.openDevTools();
  });



  mainWindow.maximize();
  // mainWindow.webContents.openDevTools();

  // and load the index.html of the app.
  // mainWindow.setAlwaysOnTop("true");

  mainWindow.webContents.on("did-create-window", (childWindow) => {
    // For example...
    childWindow.setAlwaysOnTop("true");
    childWindow.
    child = childWindow;
  });

  mainWindow.setMenu(null);

  mainWindow.loadURL("http://localhost:3000");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  makeSureDirExists(avatarsPath);
  makeSureDirExists(encountersPath);
  createWindow();

  app.on("activate", function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.on("message", (event, message) => {
    if (child && !child.isDestroyed()) {
      child.webContents.send("turn", message);
    }
  });

  ipcMain.on("dataUpdate", (event, message) => {
    if (child && !child.isDestroyed()) {
      child.webContents.send("dataUpdate", message);
    }
  });

  ipcMain.on("variant", (event, message) => {
    if (child && !child.isDestroyed()) {
      child.webContents.send("variant", message);
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

function makeSureDirExists(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

}

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
