import casual from 'casual';
import { MockList } from 'graphql-tools';

const mocks = {
  User: () => ({
    username: () => casual.username,
    firstName: () => casual.first_name,
    lastName: () => casual.last_name,
    threads: () => new MockList(2, mocks.Thread),
  }),
  Thread: () => ({
    id: () => casual.integer(0),
    name: () => casual.words(2),
    isRead: () => casual.coin_flip,
    messages: () => new MockList(2, mocks.Message),
    updatedAt: () => casual.integer(0),
  }),
  Message: () => ({
    id: () => casual.integer(0),
    postedBy: () => casual.username,
    content: () => casual.words(3),
    createdAt: () => casual.integer(0),
  }),
};

export default mocks;
