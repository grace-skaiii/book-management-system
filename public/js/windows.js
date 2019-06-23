const BrowserWindow = require('electron').BrowserWindow;
class initWindow {
  constructor() {
    this.window = null;
  }
  createWindow() {
    this.window = new BrowserWindow({
      width: 500,
      height: 350,
      // resizable: false,
      autoHideMenuBar: true,
      show: false,
      // webPreferences: { nodeIntegration: true } 
    });
    this.window.loadFile(__dirname + '/../html/init.html');
    this.window.once('ready-to-show', () => {
      this.window.show();
    });
    this.window.on('closed', () => {
      this.window = null;
    });
  }
  show() {
    this.window.show();
  }
  close() {
    this.window.close();
  }
}
class adminWindow {
  constructor() {
    this.window = null;
  }
  createWindow() {
    this.window = new BrowserWindow({
      width: 500,
      height: 350,
      // resizable: false,
      autoHideMenuBar: true,
      show: false,
      // webPreferences: { nodeIntegration: true } 
    });
    this.window.loadFile(__dirname + '/../html/login.html');
    this.window.once('ready-to-show', () => {
      this.window.show();
    });
    this.window.on('closed', () => {
      this.window = null;
    });
  }
  show() {
    this.window.show();
  }
  close() {
    this.window.close();
  }
}
class signupWindow {
  constructor() {
    this.window = null;
  }
  createWindow() {
    this.window = new BrowserWindow({
      width: 500,
      height: 350,
      // resizable: false,
      autoHideMenuBar: true,
      show: false,
      // webPreferences: { nodeIntegration: true } 
    });
    this.window.loadFile(__dirname + '/../html/signup.html');
    this.window.once('ready-to-show', () => {
      this.window.show();
    });
    this.window.on('closed', () => {
      this.window = null;
    });
  }
  show() {
    this.window.show();
  }
  close() {
    this.window.close();
  }
}
class lookupWindow {
  constructor() {
    this.window = null;
  }
  createWindow() {
    this.window = new BrowserWindow({
      width: 500,
      height: 350,
      // resizable: false,
      autoHideMenuBar: true,
      show: false,
      // webPreferences: { nodeIntegration: true } 
    });
    this.window.loadFile(__dirname + '/../html/lookup.html');
    this.window.once('ready-to-show', () => {
      this.window.show();
    });
    this.window.on('closed', () => {
      this.window = null;
    });
  }
  show() {
    this.window.show();
  }
  close() {
    this.window.close();
  }
}
class queryWindow {
  constructor() {
    this.window = null;
  }
  createWindow() {
    this.window = new BrowserWindow({
      width: 500,
      height: 350,
      // resizable: false,
      autoHideMenuBar: true,
      show: false,
      // webPreferences: { nodeIntegration: true } 
    });
    this.window.loadFile(__dirname + '/../html/query.html');
    this.window.once('ready-to-show', () => {
      this.window.show();
    });
    this.window.on('closed', () => {
      this.window = null;
    });
  }
  show() {
    this.window.show();
  }
  close() {
    this.window.close();
  }
}
class customerWindow {
  constructor() {
    this.window = null;
  }
  createWindow() {
    this.window = new BrowserWindow({
      width: 1000,
      height: 800,
      // resizable: false,
      autoHideMenuBar: true,
      show: false,
      // webPreferences: { nodeIntegration: true } 
    });
    this.window.loadFile(__dirname + '/../html/customer.html');
    this.window.once('ready-to-show', () => {
      this.window.show();
    });
    this.window.on('closed', () => {
      this.window = null;
    });
  }
  show() {
    this.window.show();
  }
  close() {
    this.window.close();
  }
}
class customerpageWindow {
  constructor() {
    this.window = null;
  }
  createWindow() {
    this.window = new BrowserWindow({
      width: 1000,
      height: 800,
      // resizable: false,
      autoHideMenuBar: true,
      show: false,
      // webPreferences: { nodeIntegration: true } 
    });
    this.window.loadFile(__dirname + '/../html/customerpage.html');
    this.window.once('ready-to-show', () => {
      this.window.show();
    });
    this.window.on('closed', () => {
      this.window = null;
    });
  }
  show() {
    this.window.show();
  }
  close() {
    this.window.close();
  }
}
// class SignupWindow {
//   constructor() {
//     this.window = null;
//   }
//   createWindow() {
//     this.window = new BrowserWindow({
//       width: 500,
//       height: 470,
//       // resizable: false,
//       autoHideMenuBar: true,
//       show: false
//     });
//     this.window.loadFile(__dirname + '/../html/signup.html');
//     // this.window.webContents.openDevTools();
//     this.window.once('ready-to-show', () => {
//       this.window.show();
//     });
//     this.window.on('closed', () => {
//       this.window = null;
//     });
//   }
//   show() {
//     this.window.show();
//   }
//   close() {
//     this.window.close();
//   }
// };
// class UserWindow {
//   constructor() {
//     this.window = null;
//   }
//   createWindow() {
//     this.window = new BrowserWindow({
//       width: 1000,
//       height: 700,
//       // resizable: false,
//       autoHideMenuBar: true,
//       show: false
//     });
//     this.window.loadFile(__dirname + '/../html/mainpage.html');
//     // this.window.webContents.openDevTools();
//     this.window.once('ready-to-show', () => {
//       this.window.show();
//     });
//     this.window.on('closed', () => {
//       this.window = null;
//     });
//   }
//   show() {
//     this.window.show();
//   }
//   close() {
//     this.window.close();
//   }
// }
module.exports.initWindow = initWindow;
module.exports.adminWindow = adminWindow;
module.exports.signupWindow = signupWindow;
module.exports.lookupWindow = lookupWindow;
module.exports.queryWindow = queryWindow;
module.exports.customerWindow = customerWindow;
module.exports.customerpageWindow = customerpageWindow;
// module.exports.SignupWindow = SignupWindow;
// module.exports.UserWindow = UserWindow;