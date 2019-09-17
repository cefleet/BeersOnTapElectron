//This is pretty much the quick start electron app with a few things added
const { app, BrowserWindow, Menu} = require('electron')
const ip = require('ip');
const fs = require("fs");

console.log(__dirname);
process.chdir(__dirname);

let mainWindow
let ps
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen:true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWindow.loadFile('public/index.html')


  // Emitted when the window is closed.
  mainWindow.on('closed', function () {    
    mainWindow = null
    ps.kill();
  })
  
  //watch the json files for changes
  fs.watch("data/beers.json", ()=>{
    mainWindow.webContents.send("dataChanged", "beers");
  });

  fs.watch("data/taps.json", ()=>{
    mainWindow.webContents.send("dataChanged","taps");
  });

  fs.watch("data/onDeck.json", ()=>{
    mainWindow.webContents.send("dataChanged","onDeck");
  });
}


app.on('ready', ()=>{
  createWindow();

  //launch the web server
  const { fork } = require('child_process');
  ps = fork(`${__dirname}/server.js`);
  
})

app.on('window-all-closed', function () {  
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

var menu = Menu.buildFromTemplate([
  {
    label: 'Menu',
    submenu: [
      {
        label: 'Present', accelerator: 'CmdOrCtrl+Shift+C', click() {
          mainWindow.webContents.send('viewChanged')
        }
      },
      { type: 'separator' },
      {
        label: 'Quit', click() {
          app.quit()
        }
      },
      { type: 'separator' },
      {
        label:`Update Url : http://${ip.address()}:7767`
      }
    ]
  }
]);

Menu.setApplicationMenu(menu);
