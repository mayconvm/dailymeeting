class User {
  constructor(props) {
    let sufix = "user"
    
    this.storage = new LocalStorage(sufix);
    this.KEY_NAME = sufix + 'name';
    this.KEY_EMAIL = sufix + 'email';
    this.KEY_PASSWORD = sufix + 'password';
    this.KEY_TEAM = sufix + 'team';
    this.KEY_TOKEN = sufix + 'token';
    
    this.getData();
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

  getPassword() {
    return this.storage.get(this.KEY_PASSWORD);
  }

  setPassword(value) {
    this.storage.set(this.KEY_PASSWORD, value);
    this.password = value;
  }

  getTeam() {
    return this.storage.get(this.KEY_TEAM);
  }

  setTeam(value) {
    this.storage.set(this.KEY_TEAM, value);
    this.team = value;
  }

  getToken() {
    return this.storage.get(this.KEY_TOKEN);
  }

  setToken(value) {
    this.storage.set(this.KEY_TOKEN, value);
    this.token = value;
  }

  getNewPassword() {
    return this.storage.get(this.KEY_NEW_PASSWORD);
  }

  setNewPassword(value) {
    this.storage.set(this.KEY_NEW_PASSWORD, value);
    this.newPassword = value;
  }

  getData() {
    const that = this;

    return new Promise((resolve, reject) => {
      let getData = that.storage.get([that.KEY_EMAIL, that.KEY_NAME, that.KEY_PASSWORD, that.KEY_TEAM, that.KEY_TOKEN, that.KEY_NEW_PASSWORD]);

      if (typeof getData === 'function') {
        getData.then((data) => {
          that.email = data[that.KEY_EMAIL];
          that.user = data[that.KEY_NAME];
          that.password = data[that.KEY_PASSWORD];
          that.team = data[that.KEY_TEAM];
          that.token = data[that.KEY_TOKEN];
          that.newPassword = data[that.KEY_NEW_PASSWORD];
          resolve(data);
        });
      }

      that.email = getData[that.KEY_EMAIL];
      that.user = getData[that.KEY_NAME];
      that.password = getData[that.KEY_PASSWORD];
      that.team = getData[that.KEY_TEAM];
      that.token = getData[that.KEY_TOKEN];
      that.newPassword = getData[that.KEY_NEW_PASSWORD];
      return resolve(getData);
     });
  }

  toObject() {
    return {
      name: this.name,
      email: this.email,
      password: this.password,
      team: this.team,
      token: this.token,
      newPassword: this.newPassword,
    }
  }
}

// export default User
