/* eslint func-names:0 no-underscore-dangle:0, arrow-parens:0 */

import { assert } from 'chai';
import { Connection, Thread } from '..';


describe('Thread database model', () => {
  before(function () {
    this.timeout(10000); // might have to wait for the db to start
    return Connection;
  });

  beforeEach(() => {
    return Thread.remove({});
  });

  it('should contain no threads', () => {
    return Thread.find().exec()
    .catch(() => {
      assert.ok(false);
    })
    .then((doc) => {
      assert.equal(doc.length, 0);
    });
  });

  it('should error when name is not defined', () => {
    return new Thread().save()
    .then((doc) => {
      assert.notOk(doc);
    })
    .catch((error) => {
      assert.equal(error.errors.name.kind, 'required');
    });
  });

  it('should retrieve a thread by id', () => {
    return new Thread({
      name: 'test',
      readBy: ['testUser'],
    })
    .save()
    .then((doc) => {
      return doc.id;
    })
    .then((id) => {
      return Thread.getById(id).then((doc) => {
        assert.isObject(doc);
        assert.equal(doc.name, 'test');
      });
    })
    .then(() => {
      return Thread.getById('000000000000000000000000').then((doc) => {
        assert.notOk(doc);
      });
    });
  });

  it('should retrieve a threads by ids', () => {
    const ids = [];
    return Promise.all([
      new Thread({
        name: 'thread 1',
        readBy: ['user1'],
      }).save().then((doc) => ids.push(doc.id)),
      new Thread({
        name: 'thread 2',
        readBy: ['user2'],
      }).save().then((doc) => ids.push(doc.id)),
      new Thread({
        name: 'thread 3',
        readBy: ['user1'],
      }).save().then((doc) => ids.push(doc.id)),
    ])
    .then(() => {
      assert.equal(ids.length, 3);
    })
    .then(() => {
      return Thread.getByIds([]).then((doc) => {
        assert.equal(doc.length, 0);
      });
    })
    .then(() => {
      return Thread.getByIds([ids[0]]).then((doc) => {
        assert.equal(doc.length, 1);
      });
    })
    .then(() => {
      return Thread.getByIds(ids).then((doc) => {
        assert.equal(doc.length, 3);
      });
    });
  });

  it('should insert thread into the database', () => {
    return new Thread({
      name: 'test',
      readBy: ['testUser'],
    }).save().then((doc) => {
      assert.isObject(doc._id);
      assert.isNumber(doc.createdAt.getTime());
      assert.isNumber(doc.updatedAt.getTime());
      assert.equal(doc.name, 'test');
      assert.equal(doc.readBy.length, 1);
      assert.equal(doc.readBy[0], 'testUser');
    });
  });

  it('should remove thread from the database', () => {
    return new Thread({
      name: 'test',
      readBy: ['testUser'],
    })
    .save()
    .then(() => {
      return Thread.remove({ name: 'test' })
      .then((doc) => {
        assert.equal(doc.result.n, 1);
      });
    })
    .then(() => {
      return Thread.find().exec()
      .catch(() => {
        assert.ok(false);
      })
      .then((doc) => {
        assert.equal(doc.length, 0);
      });
    });
  });
});
