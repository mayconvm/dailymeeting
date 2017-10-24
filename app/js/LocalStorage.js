class LocalStorage
{
  constructor(prefix) {
    // this.storage = chrome.storage.local;
    this.storage = localStorage;
    this.prefix = prefix + "_";
  }

  get(key) {
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

  set(key, value) {
    this.storage.setItem(this.prefix + key, value);
  }
}
