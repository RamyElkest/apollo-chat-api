import { Thread } from '../db';

export default class Threads {
  getById(id) {
    return Thread.getById(id);
  }

  getByIds(ids) {
    console.log(ids);
    return Thread.getByIds(ids);
  }
}
