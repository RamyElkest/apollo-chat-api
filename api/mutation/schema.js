export const schema = [`
type Mutation {
  # Add a message to a thread, returns the new message
  addMessage(
    # thread id
    id: String!,

    # Message content
    content: String!
  ): Message

  # Mark a thread as read, 
  markThreadAsRead(
    
    # thread id
    id: String!

  ): Thread
}
`];


export const resolvers = {
  Mutation: {
    addMessage(root, { id, content }, context) {
      if (!context.User) {
        throw new Error('Must be logged in to add a message.');
      }

      return Promise.resolve()
        .then(() => context.Threads.getById(id))
        .then(() => (
          context.Messages.addMessage({ threadId: id, postedBy: context.User.login, content })
        ));
    },

    markThreadAsRead(root, { id }, context) {
      if (!context.User) {
        throw new Error('Must be logged in to mark a thread as read.');
      }

      return Promise.resolve()
        .then(() => context.Threads.getById(id))
        .then(() => (
          context.Threads.markAsRead({ id, username: context.User.login })
        ));
    },
  },
};
