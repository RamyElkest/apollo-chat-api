import { User } from '../db';

export default class Users {
  static username = null;

  constructor() {
    this.current = User.getUser().then((doc) => {
      this.username = doc.username;
      console.log(doc);
      return doc;
    });
  }

  getUser() {
    return User.getUser();
  }
}
