export const schema = [`
# A user
type User {
  # The name of the user, e.g. ramyelkest
  login: String!

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
  lastUpdated: Float! # Actually a date
}

# A message, attached to a thread
type Message {
  # The ID of this message
  id: String!

  # User that posted the message
  postedBy: String!

  # The text of the comment
  content: String!

  # A timestamp of when the message was submitted
  createdAt: Float! # Actually a date
}

type Query {
  # Return the currently logged in user, or null if nobody is logged in
  user: User
}
`];


export const resolvers = {
  Thread: {
    messages({ id }, _, context) {
      return context.Messages.getByThreadId(id);
    },
  },
  User: {
    threads({ login }, _, context) {
      return context.Threads.getByLogin(login);
    },
  },
  Query: {
    user(root, args, context) {
      return context.Users;
    },
  },
};
