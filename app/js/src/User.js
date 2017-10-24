class User {
  constructor(props) {
    let sufix = "user"
    
    this.storage = new LocalStorage(sufix);
    this.KEY_NAME = sufix + 'name';
    this.KEY_EMAIL = sufix + 'email';
    // this.getData();
  }

  getName() {
    return this.storage.get(this.KEY_NAME);
  }

  setName(value) {
    this.storage.set(this.KEY_NAME, value);
    this.name = value;
  }

  getEmail() {
    return this.storage.get(this.KEY_EMAIL);
  }

  setEmail(value) {
    this.storage.set(this.KEY_EMAIL, value);
    this.email = value;
  }

  getData() {
    const that = this;

    return new Promise((resolve, reject) => {
      that.storage.get([that.KEY_EMAIL, that.KEY_NAME]).then((data) => {
        that.email= data[that.KEY_EMAIL];
        that.user= data[that.KEY_NAME];
      });
     });
  }
}

// export default User
