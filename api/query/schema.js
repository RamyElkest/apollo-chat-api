export const schema = [`
# A user
type User {
  # The name of the user, e.g. ramyelkest
  username: String!

  # first name
  firstName: String

  # last name
  lastName: String

  # threads subscribed
  threads: [Thread]
}

# A message thread, attached to a user
type Thread {
  # The ID of this thread
  id: String!

  # Thread name
  name: String!

  # Has the thread been read
  isRead: Boolean!

  # List of messages in the thread
  messages: [Message]

  # A timestamp of when the thread was last updated
  updatedAt: Float! # Actually a date
}

# A message, attached to a thread
type Message {
  # The ID of this message
  id: String!

  # User id that posted the message
  postedBy: String!

  # The text of the comment
  content: String!

  # A timestamp of when the message was submitted
  createdAt: Float! # Actually a date
}

type Query {
  # Return the currently logged in user
  user: User!
}
`];


export const resolvers = {
  Thread: {
    messages({ id }, _, context) {
      return context.Messages.getByThreadId(id);
    },
    isRead() {
      return false;
    },
  },
  User: {
    threads({ threads }, _, context) {
      return context.Threads.getByIds(threads);
    },
  },
  Query: {
    user(root, _, context) {
      return context.Users.current;
    },
  },
};
