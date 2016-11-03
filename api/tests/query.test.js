/* eslint func-names:0 */

import '..';
import * as chai from 'chai';
import chaiHttp from 'chai-http';
import chaiAsPromised from 'chai-as-promised';
import { Connection, User } from '../db';
import config from '../../config';

chai.use(chaiHttp);
chai.use(chaiAsPromised);
const server = `http://localhost:${config.port}`;
// const wsServer = `http://localhost:${config.webSocketPort}`
const assert = chai.assert;
// const expect = chai.expect;
// const should = chai.should();

describe('Query Integration Tests', () => {
  before(function () {
    this.timeout(10000); // might have to wait for the db to start
    return Connection;
  });

  describe('Query for user', () => {
    it('throws an error pass an empty query', () => {
      const testQuery = {
        query: '{}',
      };

      return chai.request(server)
      .post('/graphql')
      .send(testQuery)
      .catch((err) => {
        assert.equal(err.status, 400);
        assert.ok(err.response.text.includes('Expected Name'));
      });
    });

    it('returns all the scalar values for a user', () => {
      const testQuery = {
        query: `
        {
          user {
            username
            firstName
            lastName
          }
        }`,
      };

      const expected = {
        username: 'relkest',
        firstName: 'ramy',
        lastName: 'elkest',
      };

      return new User(expected)
      .save()
      .then(() => {
        return chai.request(server)
                   .post('/graphql')
                   .send(testQuery);
      })
      .then((res) => {
        assert.equal(res.status, 200);
        assert.deepEqual(res.body.data.user, expected);
      });
    });
  });
});
/*
describe('SubscriptionManager', function() {
  const subManager = new SubscriptionManager({
    schema,
    pubsub: new PubSub(),
    setupFunctions: {
      'testFilter': (options, { filterBoolean }) => {
        return {
          'Filter1': {filter: (root) => root.filterBoolean === filterBoolean},
        };
      },
      'testFilterMulti': (options) => {
        return {
          'Trigger1': {filter: () => true},
          'Trigger2': {filter: () => true},
        };
      },
    },
  });

  it('throws an error if query is not valid', function() {
    const query = 'query a{ testInt }';
    const callback = () => null;
    return expect(subManager.subscribe({ query, operationName: 'a', callback }))
      .to.eventually.be.rejectedWith('Subscription query has validation errors');
  });

  it('rejects subscriptions with more than one root field', function() {
    const query = 'subscription X{ a: testSubscription, b: testSubscription }';
    const callback = () => null;
    return expect(subManager.subscribe({ query, operationName: 'X', callback }))
      .to.eventually.be.rejectedWith('Subscription query has validation errors');
  });

  it('can subscribe with a valid query and gets a subId back', function() {
    const query = 'subscription X{ testSubscription }';
    const callback = () => null;
    subManager.subscribe({ query, operationName: 'X', callback }).then(subId => {
      expect(subId).to.be.a('number');
      subManager.unsubscribe(subId);
    });
  });

  it('can subscribe with a valid query and get the root value', function(done) {
    const query = 'subscription X{ testSubscription }';
    const callback = function(err, payload){
      try {
        expect(payload.data.testSubscription).to.equals('good');
      } catch (e) {
        done(e);
        return;
      }
      done();
    };

    subManager.subscribe({ query, operationName: 'X', callback }).then(subId => {
      subManager.publish('testSubscription', 'good');
      setTimeout(() => {
        subManager.unsubscribe(subId);
      }, 1);
    });
  });

  it('can use filter functions properly', function(done) {
    const query = `subscription Filter1($filterBoolean: Boolean){
       testFilter(filterBoolean: $filterBoolean)
      }`;
    const callback = function(err, payload){
      try {
        expect(payload.data.testFilter).to.equals('goodFilter');
      } catch (e) {
        done(e);
        return;
      }
      done();
    };
    subManager.subscribe({
      query,
      operationName: 'Filter1',
      variables: { filterBoolean: true},
      callback,
    }).then(subId => {
      subManager.publish('Filter1', {filterBoolean: false });
      subManager.publish('Filter1', {filterBoolean: true });
      setTimeout(() => {
        subManager.unsubscribe(subId);
      }, 2);
    });
  });

  it('can subscribe to more than one trigger', function(done) {
    // I also used this for testing arg parsing (with console.log)
    // args a and b can safely be removed.
    // TODO: write real tests for argument parsing
    let triggerCount = 0;
    const query = `subscription multiTrigger($filterBoolean: Boolean, $uga: String){
       testFilterMulti(filterBoolean: $filterBoolean, a: $uga, b: 66)
      }`;
    const callback = function(err, payload){
      try {
        expect(payload.data.testFilterMulti).to.equals('goodFilter');
        triggerCount++;
      } catch (e) {
        done(e);
        return;
      }
      if (triggerCount === 2) {
        done();
      }
    };
    subManager.subscribe({
      query,
      operationName: 'multiTrigger',
      variables: { filterBoolean: true, uga: 'UGA'},
      callback,
    }).then(subId => {
      subManager.publish('NotATrigger', {filterBoolean: false});
      subManager.publish('Trigger1', {filterBoolean: true });
      subManager.publish('Trigger2', {filterBoolean: true });
      setTimeout(() => {
        subManager.unsubscribe(subId);
      }, 3);
    });
  });

  it('can unsubscribe', function(done) {
    const query = 'subscription X{ testSubscription }';
    const callback = (err, payload) => {
      try {
        assert(false);
      } catch (e) {
        done(e);
        return;
      }
      done();
    };
    subManager.subscribe({ query, operationName: 'X', callback }).then(subId => {
      subManager.unsubscribe(subId);
      subManager.publish('testSubscription', 'bad');
      setTimeout(done, 30);
    });
  });

  it('throws an error when trying to unsubscribe from unknown id', function () {
    expect(() => subManager.unsubscribe(123))
      .to.throw('undefined');
  });

  it('calls the error callback if there is an execution error', function(done) {
    const query = `subscription X($uga: Boolean!){
      testSubscription  @skip(if: $uga)
    }`;
    const callback = function(err, payload){
      try {
        expect(payload).to.be.undefined;
        expect(err.message).to.equals(
          'Variable "$uga" of required type "Boolean!" was not provided.'
        );
      } catch (e) {
        done(e);
        return;
      }
      done();
    };

    subManager.subscribe({ query, operationName: 'X', callback }).then(subId => {
      subManager.publish('testSubscription', 'good');
      setTimeout(() => {
        subManager.unsubscribe(subId);
      }, 4);
    });
  });

  it(`can use transform function to convert the
      trigger name given into more explicit channel name`, function (done) {
    const triggerTransform = (trigger, {path}) => [trigger, ...path].join('.');
    const pubsub = new RedisPubSub({
      triggerTransform,
    });

    const subManager2 = new SubscriptionManager({
      schema,
      setupFunctions: {
        testChannelOptions: (options, {repoName}) => ({
          comments: {
            channelOptions: {path: [repoName]},
          },
        }),
      },
      pubsub,
    });

    const callback = (err, payload) => {
      try {
        expect(payload.data.testChannelOptions).to.equals('test');
        done();
      } catch (e) {
        done(e);
      }
    };

    const query = `
      subscription X($repoName: String!) {
        testChannelOptions(repoName: $repoName)
      }
    `;

    const variables = {repoName: 'graphql-redis-subscriptions'};

    subManager2.subscribe({query, operationName: 'X', variables, callback}).then(subId => {
      pubsub.publish('comments.graphql-redis-subscriptions', 'test');

      setTimeout(() => pubsub.unsubscribe(subId), 4);
    });

  });
});
*/
