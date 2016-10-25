import { merge } from 'lodash';
import { schema as querySchema, resolvers as queryResolvers } from './query/schema';
import { makeExecutableSchema } from 'graphql-tools';

const rootSchema = [`

type Query {
  # Return the currently logged in user, or null if nobody is logged in
  user: User
}

schema {
  query: Query
}

`];

const rootResolvers = {
  Query: {
    user(root, args, context) {
      return context.Users;
    },
  },
};

// Put schema together into one array of schema strings
// and one map of resolvers, like makeExecutableSchema expects
const schema = [...rootSchema, ...querySchema];
const resolvers = merge(rootResolvers, queryResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
