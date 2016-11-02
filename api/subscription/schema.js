export const schema = [`
type Subscription {
  # Subscription fires on every message added
  newMessage(id: String!): Message
}
`];

export const resolvers = {
  Subscription: {
    newMessage(message) {
      // the subscription payload is the message.
      return message;
    },
  },
};
