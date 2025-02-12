// src/main/preload.js
const { contextBridge, clipboard } = require('electron');

contextBridge.exposeInMainWorld('myClipboard', {
  writeText: (text) => clipboard.writeText(text),
  readText: () => clipboard.readText(),
});

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  replaceText('js-version', process.versions.node);
  replaceText('chrome-version', process.versions.chrome);
  replaceText('electron-version', process.versions.electron);
});
