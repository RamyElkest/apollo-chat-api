require('babel-register');

import mongoose from 'mongoose';
import { Connection, User, Thread, Message } from '../api/db/mongo';

const messages = [
  {
    id: 'm_1',
    threadId: 't_1',
    postedBy: 'relkest',
    content: 'Hey Jing, want to give a Flux talk at ForwardJS?',
    createdAt: Date.now() - 99999,
  },
  {
    id: 'm_2',
    threadId: 't_1',
    postedBy: 'relkest',
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
    postedBy: 'relkest',
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
    postedBy: 'relkest',
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
    readBy: ['relkest'],
    lastUpdated: Date.now() - 79999,
  },
  {
    id: 't_2',
    name: 'Dave and me',
    readBy: ['relkest'],
    lastUpdated: Date.now() - 59999,
  },
  {
    id: 't_3',
    name: 'Brian and me',
    readBy: [],
    lastUpdated: Date.now() - 39999,
  },
];
const users = [
  {
    username: 'relkest',
    firstName: 'ramy',
    lastName: 'elkest',
    threads: ['t_1', 't_2', 't_3'],
  },
];

(function seed() {
  console.log('starting to seed..');
  Connection.then(() => {
    return new Promise((resolve, reject) => {
      mongoose.connection.db.dropDatabase((err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    });
  }).then(() => {
    return Promise.all([
      ...users.map((user) => {
        return new User(user).save();
      }),
      ...threads.map((thread) => {
        return new Thread(thread).save();
      }),
      ...messages.map((message) => {
        return new Message(message).save();
      }),
    ]);
  }).then(() => {
    return User.find().then((doc) => {
      if (doc.length) {
        console.log('Database has been populated');
      } else {
        console.log('Database failed to populate');
      }
      process.exit();
    });
  });
}());
