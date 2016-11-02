import { SubscriptionManager } from 'graphql-subscriptions';
import pubsub from './pubsub';
import schema from '../schema';

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
