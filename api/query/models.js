// Mock raw message data then we can transform
const messages = [
  {
    id: 'm_1',
    threadId: 't_1',
    postedBy: 'me',
    content: 'Hey Jing, want to give a Flux talk at ForwardJS?',
    createdAt: Date.now() - 99999,
  },
  {
    id: 'm_2',
    threadId: 't_1',
    postedBy: 'me',
    content: 'Seems like a pretty cool conference.',
    createdAt: Date.now() - 89999,
  },
  {
    id: 'm_3',
    threadId: 't_1',
    postedBy: 'Jing',
    content: 'Sounds good.  Will they be serving dessert?',
    createdAt: Date.now() - 79999,
  },
  {
    id: 'm_4',
    threadId: 't_2',
    postedBy: 'me',
    content: 'Hey Dave, want to get a beer after the conference?',
    createdAt: Date.now() - 69999,
  },
  {
    id: 'm_5',
    threadId: 't_2',
    postedBy: 'Dave',
    content: 'Totally!  Meet you at the hotel bar.',
    createdAt: Date.now() - 59999,
  },
  {
    id: 'm_6',
    threadId: 't_3',
    postedBy: 'me',
    content: 'Hey Brian, are you going to be talking about functional stuff?',
    createdAt: Date.now() - 49999,
  },
  {
    id: 'm_7',
    threadId: 't_3',
    postedBy: 'Brian',
    content: 'At ForwardJS?  Yeah, of course.  See you there!',
    createdAt: Date.now() - 39999,
  },
];
const threads = [
  {
    id: 't_1',
    name: 'Jing and Me',
    isRead: true,
    lastUpdated: Date.now() - 79999,
  },
  {
    id: 't_2',
    name: 'Dave and me',
    isRead: true,
    lastUpdated: Date.now() - 59999,
  },
  {
    id: 't_3',
    name: 'Brian and me',
    isRead: false,
    lastUpdated: Date.now() - 39999,
  },
];

export class Messages {
  getByThreadId(threadId) {
    return Promise.resolve()
                  .then(() => messages.filter(x => x.threadId === threadId)
                                      .sort((x, y) => x.createdAt - y.createdAt));
  }
}
export class Threads {
  getByLogin() {
    return Promise.resolve().then(() => threads);
  }
}
export class Users {
  constructor({ login }) {
    this.login = login;
  }
}
