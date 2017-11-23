const path = require('path');
const url = require('url');
const { app, BrowserWindow } = require('electron');

const dialog = require('./dialog.js')
const docker = require('./docker.js')
const fs = require('./fs.js')
const misc = require('./misc.js')
const preferences = require('./preferences.js')

let win;

function createWindow() {
	win = new BrowserWindow({
		height: 250,
		width: 500,
	});

	win.loadURL(url.format({
		pathname: path.join(__dirname, '../front/index.html'),
		protocol: 'file:',
		slashes: true,
	}));

	win.setMenu(null);

	win.webContents.openDevTools();

	win.on('closed', ()=>{
		win = null;
	});
}

module.exports = {
	start() {
		app.on('ready', createWindow);

		app.on('window-all-closed', ()=>{
			if (process.platform !== 'darwin') {
				app.quit();
			}
		});

		app.on('activate', ()=>{
			if (!win) {
				createWindow();
			}
		});

		dialog.init()
		docker.init()
		fs.init()
		misc.init()
		preferences.init()
	}
}
