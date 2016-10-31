/* eslint new-cap:0, no-underscore-dangle: 0 */
import mongoose from 'mongoose';
import { Connection, User, Thread, Message } from '../api/db/mongo';

const threads = [
  {
    _id: mongoose.Types.ObjectId(),
    name: 'Jing and Me',
    readBy: ['relkest'],
    lastUpdated: Date.now() - 79999,
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: 'Dave and me',
    readBy: ['relkest'],
    lastUpdated: Date.now() - 59999,
  },
  {
    _id: mongoose.Types.ObjectId(),
    name: 'Brian and me',
    readBy: [],
    lastUpdated: Date.now() - 39999,
  },
];
const messages = [
  {
    threadId: threads[0]._id,
    postedBy: 'relkest',
    content: 'Hey Jing, want to give a Flux talk at ForwardJS?',
    createdAt: Date.now() - 99999,
  },
  {
    threadId: threads[0]._id,
    postedBy: 'relkest',
    content: 'Seems like a pretty cool conference.',
    createdAt: Date.now() - 89999,
  },
  {
    threadId: threads[0]._id,
    postedBy: 'Jing',
    content: 'Sounds good.  Will they be serving dessert?',
    createdAt: Date.now() - 79999,
  },
  {
    threadId: threads[1]._id,
    postedBy: 'relkest',
    content: 'Hey Dave, want to get a beer after the conference?',
    createdAt: Date.now() - 69999,
  },
  {
    threadId: threads[1]._id,
    postedBy: 'Dave',
    content: 'Totally!  Meet you at the hotel bar.',
    createdAt: Date.now() - 59999,
  },
  {
    threadId: threads[2]._id,
    postedBy: 'relkest',
    content: 'Hey Brian, are you going to be talking about functional stuff?',
    createdAt: Date.now() - 49999,
  },
  {
    threadId: threads[2]._id,
    postedBy: 'Brian',
    content: 'At ForwardJS?  Yeah, of course.  See you there!',
    createdAt: Date.now() - 39999,
  },
];
const users = [
  {
    username: 'relkest',
    firstName: 'ramy',
    lastName: 'elkest',
    threads: [threads[0]._id, threads[1]._id, threads[2]._id],
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
