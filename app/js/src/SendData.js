class SendData {
  setEntity (entity) {
    this.entity = entity;
  }

  prepare() {
    return this.entity.toObject();
  }

  send () {
    let data = this.prepare();

    return new Promise((resolve, reject) => {
      resolve({"status": "ok", "token": '123asd'});
      // reject({"status": "ok"});
    });
  }
}
