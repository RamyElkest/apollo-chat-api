/* eslint func-names:0 no-underscore-dangle: 0 */

import { assert } from 'chai';
import { Connection, User } from '..';


describe('user models the database', () => {
  before((done) => {
    Connection.then(() => {
      User.remove({}, done);
    });
  });

  it('should contain no users', () => {
    return User.find().exec()
    .catch(() => {
      assert.ok(false);
    })
    .then((doc) => {
      assert.equal(doc.length, 0);
    });
  });

  it('should error when username is not defined', () => {
    return new User().save()
    .then((doc) => {
      assert.notOk(doc);
    })
    .catch((error) => {
      assert.equal(error.errors.username.kind, 'required');
    });
  });

  it('should insert user into the database', () => {
    return new User({
      username: 'test',
      firstName: 'testFirst',
      lastName: 'testLast',
    }).save().then((doc) => {
      assert.isObject(doc._id);
      assert.isNumber(doc.createdAt.getTime());
      assert.isNumber(doc.updatedAt.getTime());
      assert.equal(doc.username, 'test');
      assert.equal(doc.firstName, 'testFirst');
      assert.equal(doc.lastName, 'testLast');
    });
  });

  it('should remove user from the database', () => {
    return User.remove({ username: 'test' })
    .then((doc) => {
      assert.equal(doc.result.ok, 1);
    })
    .then(() => {
      User.find().exec()
          .catch(() => {
            assert.ok(false);
          })
          .then((doc) => {
            assert.equal(doc.length, 0);
          });
    });
  });
});
