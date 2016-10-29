import User from './user';
import Thread from './thread';
import Message from './message';

import config from '../../../config';
import isMongoRunning from 'is-mongodb-running';
import mongoRunner from 'mongodb-runner';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const Connection = new Promise((resolve, reject) => {
  isMongoRunning((err, res) => {
    if (err) reject(err);

    if (res && res.length > 0) {
      if (res[0].port === config.mongo.port) {
        console.log('mongodb is now running on `localhost:%s`', config.mongo.port);
        resolve();
        return;
      }

      if (process.env.NODE_ENV !== 'production') {
        console.log(`mongodb is running on localhost:${res[0].port} and we need 
                    localhost:${config.mongo.port} so starting up a new one.`);

        mongoRunner({
          action: 'start',
          port: config.mongo.port,
        }, () => {
          console.log(`mongodb started on localhost:${config.mongo.port}`);
          resolve();
        });
      }
      return;
    }

    if (process.env.NODE_ENV !== 'production') {
      console.log('no mongodb running so starting one up');
      mongoRunner({
        action: 'start',
        port: config.mongo.port,
      }, () => {
        console.log(`mongodb started on localhost:${config.mongo.port}`);
        resolve();
      });
      return;
    }
  });
}).then(() => {
  return new Promise((resolve) => {
    mongoose.connect(config.mongo.uri, resolve);
  });
});

export {
  Connection,
  User,
  Thread,
  Message,
};
