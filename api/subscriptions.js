import { PubSub, SubscriptionManager } from 'graphql-subscriptions';
import schema from './schema';

const pubsub = new PubSub();
const subscriptionManager = new SubscriptionManager({
  schema,
  pubsub,
  setupFunctions: {
    newMessage: (options, args) => ({
      newMessage: message => message.threadId === args.id,
    }),
  },
});

export { subscriptionManager, pubsub };
