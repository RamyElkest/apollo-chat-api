import { Thread } from '../db';

export default class Threads {
  getById(id) {
    return Thread.getById(id);
  }

  getByIds(ids) {
    return Thread.getByIds(ids);
  }
}
