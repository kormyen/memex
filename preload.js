// This formats 'require' for use in logic/add.js used for send-ing a method call to the electron app/
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;

// This preload.js file is included by electron, but not loaded in the web version. 
// Defining 'window.showAdd' to true tells the app to include the add entry 
// menu button and functionality which is not currently supported in the web version.
window.showAdd = true;