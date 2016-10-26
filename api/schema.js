import { merge } from 'lodash';
import { schema as querySchema, resolvers as queryResolvers } from './query/schema';
import { schema as mutationSchema, resolvers as mutationResolvers } from './mutation/schema';
import { makeExecutableSchema } from 'graphql-tools';

const rootSchema = [`


schema {
  query: Query
  mutation: Mutation
}

`];

// Put schema together into one array of schema strings
// and one map of resolvers, like makeExecutableSchema expects
const schema = [...rootSchema, ...querySchema, ...mutationSchema];
const resolvers = merge(queryResolvers, mutationResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
