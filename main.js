const {app, BrowserWindow, screen} = require('electron')
const path = require('path')

const winWidth = 800;
const winHeight = 600;

const SAFETY_MARGINS = 10;

let mainWindow;

// setPosition //////////////////////////////////////////////////////////////////////////

function setPosition(x, y) {
  const displayBounds = screen.getPrimaryDisplay().bounds
  const fixedX = Math.min(
    displayBounds.x + displayBounds.width,
    Math.max(x, displayBounds.x)
  );
  const fixedY = Math.min(
    displayBounds.y + displayBounds.height,
    Math.max(y, displayBounds.y)
  );
  mainWindow.setPosition(fixedX, fixedY);

  const fixedWidth = Math.max(SAFETY_MARGINS, Math.min(winWidth, displayBounds.width + displayBounds.x - x, winWidth - displayBounds.x + x));
  const fixedHeight = Math.max(SAFETY_MARGINS, Math.min(winHeight, displayBounds.height + displayBounds.y - y, winHeight - displayBounds.y + y));
  mainWindow.setSize(fixedWidth, fixedHeight);
}

// Demo SetPosition //////////////////////////////////////////////////////////////////////////

function demoSetPosition() {
  const displayBounds = screen.getPrimaryDisplay().bounds

  // const dX = winWidth / 2;
  // const dY = winHeight / 2;

  setInterval(() => {
    const x = Math.floor(Math.random() * (displayBounds.width + winWidth) - winWidth);
    const y = Math.floor(Math.random() * (displayBounds.height + winHeight) - winHeight);
    setPosition(x, y);
  }, 500);
}

/// init boilerplate /////////////////////////////////////

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: winWidth,
    height: winHeight,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.loadFile('index.html');

  demoSetPosition();
}

app.whenReady().then(createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
})
