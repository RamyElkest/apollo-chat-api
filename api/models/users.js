import { User } from '../db';

export default class Users {
  constructor() {
    this.current = User.getUser();
  }

  getUser() {
    return User.getUser();
  }
}
