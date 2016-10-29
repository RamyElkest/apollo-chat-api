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
    mutation: Mutation
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

  describe('addMessage mutation', () => {
    it('returns all message scalar fields', () => {
      const testMutation = `
      mutation example {
        addMessage(
          id:"1"
          content:"Hello World"
        )
        {
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

      return graphql(schema, testMutation).then((result) => {
        assert.deepEqual(result.data.addMessage, expected);
      });
    });
  });

  describe('markThreadAsRead mutation', () => {
    it('returns all thread scalar fields', () => {
      const testMutation = `
      mutation example {
       markThreadAsRead(id:"1")  {
        id
        name
        isRead
        updatedAt
       }
      }`;
      const expected =
        {
          id: '424',
          isRead: true,
          updatedAt: 438,
          name: 'fuga facilis',
        };

      return graphql(schema, testMutation).then((result) => {
        assert.deepEqual(result.data.markThreadAsRead, expected);
      });
    });
  });
});
