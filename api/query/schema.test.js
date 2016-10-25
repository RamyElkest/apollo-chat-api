import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';
import { graphql } from 'graphql';
import { schema as schemaArray } from './schema';
import { assert } from 'chai';

import casual from 'casual';
import mocks from './mocks';

describe('Chat Query Schema', () => {
  // Fill this in with the schema string
  const schemaString = `
  ${schemaArray[0]}

  type Query {
    user: User
  }

  schema {
    query: Query
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

  it('returns all user scalar fields', () => {
    const testQuery = `
    {
      user {
        login
        firstName
        lastName
      }
    }`;
    const expected =
      {
        login: 'Larry_Raynor',
        firstName: 'Rosalind',
        lastName: 'Mertz',
      };

    return graphql(schema, testQuery).then((result) => {
      assert.deepEqual(result.data.user, expected);
    });
  });

  it('returns all thread scalar fields', () => {
    const testQuery = `
    {
      user {
        threads {
          id
          name
          isRead
          lastUpdated
        }
      }
    }`;
    const expected =
      {
        id: '858',
        isRead: true,
        name: 'perspiciatis nulla',
        lastUpdated: 624,
      };

    return graphql(schema, testQuery).then((result) => {
      assert.deepEqual(result.data.user.threads[0], expected);
    });
  });

  it('returns all message fields', () => {
    const testQuery = `
    {
      user {
        threads {
          messages {
            id
            postedBy
            content
            createdAt
          }
        }
      }
    }`;
    const expected =
      {
        id: '57',
        postedBy: 'Glover_Gerald',
        content: 'voluptatum temporibus consequatur',
        createdAt: 529,
      };

    return graphql(schema, testQuery).then((result) => {
      assert.deepEqual(result.data.user.threads[0].messages[0], expected);
    });
  });
});
