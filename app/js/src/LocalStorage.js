class LocalStorage
{
  constructor(prefix) {
    this.prefix = prefix + "_";
    this.type = LocalStorage.WEBSITE;
    this.storage = window.localStorage;

    if ('storage' in chrome && 'local' in chrome.storage){
      this.type = LocalStorage.EXTENSION;
      // this.storage = chrome.storage.local;
      this.storage = chrome.storage.local;
    }
  }

  static get EXTENSION() {
    return "extension";
  }

  static get WEBSITE() {
    return "website";
  }

  get(key) {
    if (this.type == LocalStorage.EXTENSION) {
      return this.getExtension(key);
    }

    return this.getWebSite(key);
  }

  set(key, value) {
    if (this.type == LocalStorage.EXTENSION) {
      return this.setExtension(key, value);
    }

    return this.setWebSite(key, value);
  }

  getExtension(key) {
    let that = this;
    let list = [];

    if (typeof key ===  "string") {
      list = this.prefix + key;
    }

    if (typeof key === 'object') {
      key.forEach((data) => {
        list.push(this.prefix + data);
      });
    }

    return new Promise((resolve, reject) => {
      that.storage.get(list, data => resolve(data));
    });


  }
  
  getWebSite(key) {
    let that = this;
    let list = [];

    if (typeof key ===  "string") {
      return this.storage.getItem(this.prefix + key);
    }

    if (typeof key === 'object') {
      key.forEach((data) => {
        list.push(this.prefix + data);
      });
    }

    let result = {};
    list.forEach((key) => {
      result[key] = that.storage.getItem(key);
    });

    return result;
  }

  setWebSite(key, value) {
    this.storage.setItem(this.prefix + key, value);
  }

  setExtension(key, value) {
    let label= this.prefix + key;
    this.storage.set({label: value }); }
}
