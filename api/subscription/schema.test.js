import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import { schema as querySchema } from '../query/schema';
import { schema as schemaArray } from './schema';
import { assert } from 'chai';

import casual from 'casual';
import mocks from '../query/mocks'; // TODO: move mocks to a separate folder

describe('Chat Mutation Schema', () => {
  // Fill this in with the schema string
  const schemaString = `
  ${querySchema[0]}
  ${schemaArray[0]}

  schema {
    query: Query
    subscription: Subscription
  }`;

  // Make a GraphQL schema with no resolvers
  const schema = makeExecutableSchema({ typeDefs: schemaString });

  // Add mocks, modifies schema in place
  addMockFunctionsToSchema({ schema, mocks, preserveResolvers: false });

  before(() => {
    casual.seed();
  });

  it('throws an error pass an empty query', () => {
    const testQuery = '{}';

    return graphql(schema, testQuery).then((result) => {
      assert.notEqual(result.errors.length, 0);
    });
  });

  describe('newMessage subscription', () => {
    it('returns all message scalar fields', () => {
      const testSubscription = `
      subscription {
        newMessage(id: "581934600e35da4c5ea3e763") {
          id
          postedBy
          content
          createdAt
        }
      }`;
      const expected =
        {
          id: '549',
          content: 'animi vero perspiciatis',
          postedBy: 'Michale_Sporer',
          createdAt: 847,
        };

      return graphql(schema, testSubscription).then((result) => {
        assert.deepEqual(result.data.newMessage, expected);
      });
    });
  });
});
