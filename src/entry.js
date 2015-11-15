var app = require("app");
var BrowserWindow = require("browser-window");

var mainWindow = null;

app.on('window-all-closed', function(){
    app.quit();
});

app.on('ready', function(){
    mainWindow = new BrowserWindow({
        width: 220, 
        height: 150, 
        x: 0, 
        y: 0, 
        frame: false, transparent: true, resizable: true, "always-on-top": true});
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    //mainWindow.toggleDevTools();
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
