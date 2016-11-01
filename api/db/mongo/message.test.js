/* eslint func-names:0 no-underscore-dangle: 0 */

import { assert } from 'chai';
import { Connection, Message } from '..';


describe('Message database model', () => {
  before(function () {
    this.timeout(10000); // might have to wait for the db to start
    return Connection;
  });

  beforeEach(() => {
    return Message.remove({});
  });

  it('should contain no messages', () => {
    return Message.find().exec()
    .then((doc) => {
      assert.equal(doc.length, 0);
    });
  });

  it('should error when name is not defined', () => {
    return new Message().save()
    .then((doc) => {
      assert.notOk(doc);
    })
    .catch((error) => {
      assert.equal(error.errors.content.kind, 'required');
      assert.equal(error.errors.postedBy.kind, 'required');
    });
  });

  it('should insert message into the database', () => {
    return new Message({
      threadId: 'testThreadId',
      content: 'testContent',
      postedBy: 'testUser',
    })
    .save()
    .then((doc) => {
      assert.isObject(doc._id);
      assert.isNumber(doc.createdAt.getTime());
      assert.isNumber(doc.updatedAt.getTime());
      assert.equal(doc.threadId, 'testThreadId');
      assert.equal(doc.content, 'testContent');
      assert.equal(doc.postedBy, 'testUser');
    });
  });

  it('should retrieve all messages by thread id', () => {
    return Promise.all([
      new Message({
        threadId: 't_1',
        content: 'content1',
        postedBy: 'user1',
      }).save(),
      new Message({
        threadId: 't_1',
        content: 'content2',
        postedBy: 'user2',
      }).save(),
      new Message({
        threadId: 't_2',
        content: 'content3',
        postedBy: 'user2',
      }).save(),
    ])
    .then(() => {
      return Message.find().exec().then((doc) => {
        assert.equal(doc.length, 3);
      });
    })
    .then(() => {
      return Message.getByThreadId('t_1').then((doc) => {
        assert.equal(doc.length, 2);
        assert.equal(doc[0].threadId, 't_1');
        assert.equal(doc[1].threadId, 't_1');
      });
    })
    .then(() => {
      return Message.getByThreadId('t_2').then((doc) => {
        assert.equal(doc.length, 1);
        assert.equal(doc[0].threadId, 't_2');
      });
    });
  });

  it('should remove message from the database', () => {
    return new Message({
      threadId: 'testThreadId',
      content: 'testContent',
      postedBy: 'testUser',
    })
    .save()
    .then(() => {
      return Message.remove({ threadId: 'testThreadId' })
      .then((doc) => {
        assert.equal(doc.result.n, 1);
      });
    })
    .then(() => {
      return Message.find().exec()
      .then((doc) => {
        assert.equal(doc.length, 0);
      });
    });
  });
});
