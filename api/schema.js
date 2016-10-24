import { merge } from 'lodash';
import { schema as chatSchema, resolvers as chatResolvers } from './chat/schema';
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
const schema = [...rootSchema, ...chatSchema];
const resolvers = merge(rootResolvers, chatResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
