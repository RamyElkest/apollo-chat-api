import { Message } from '../db';

export default class Messages {
  getByThreadId(threadId) {
    return Message.getByThreadId(threadId);
  }

  addMessage(message) {
    return new Message(message).save();
  }
}
