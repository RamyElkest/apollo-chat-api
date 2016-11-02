import { merge } from 'lodash';
import { schema as querySchema, resolvers as queryResolvers } from './query/schema';
import { schema as mutationSchema, resolvers as mutationResolvers } from './mutation/schema';
import { schema as subscriptionSchema, resolvers as subscriptionResolvers } from './subscription/schema';
import { makeExecutableSchema } from 'graphql-tools';

const rootSchema = [`

schema {
  query: Query
  mutation: Mutation
  subscription: Subscription
}

`];

// Put schema together into one array of schema strings
// and one map of resolvers, like makeExecutableSchema expects
const schema = [...rootSchema, ...querySchema, ...mutationSchema, ...subscriptionSchema];
const resolvers = merge(queryResolvers, mutationResolvers, subscriptionResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
