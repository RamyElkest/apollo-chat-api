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
};


/*

var GraphQLUser = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalIdField('User'),
    threads: {
      type: ThreadConnection,
      args: connectionArgs,
      resolve: (obj, args) => connectionFromArray(getThreads(), args),
    }
  },
  interfaces: [nodeInterface]
});

var Root = new GraphQLObjectType({
  name: 'Root',
  fields: {
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer()
    },
    node: nodeField
  },
});

var GraphQLAddMessageMutation = mutationWithClientMutationId({
  name: 'AddMessage',
  inputFields: {
    text: { type: new GraphQLNonNull(GraphQLString) },
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    messageEdge: {
      type: GraphQLMessageEdge,
      resolve: ({ messageID, threadID }) => {
        var message = getMessage(messageID);
        return {
          cursor: cursorForObjectInConnection(getMessagesByThreadId(
            threadID), message),
          node: message,
        };
      }
    },
    thread: {
      type: GraphQLThread,
      resolve: ({threadID}) => getThread(threadID)
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({text, id}) => {
    // important, else it would be encoded client id,
    // then database don't know how to handle
    var localThreadId = fromGlobalId(id).id;
    var {messageID, threadID} = addMessage(text, localThreadId);
    return {messageID, threadID};
  }
});

var GraphQLMarkThreadAsReadMutation = mutationWithClientMutationId({
  name: 'MarkThreadAsRead',
  inputFields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  },
  outputFields: {
    thread: {
      type: GraphQLThread,
      resolve: ({localThreadId}) => getThread(localThreadId),
    },
    viewer: {
      type: GraphQLUser,
      resolve: () => getViewer(),
    },
  },
  mutateAndGetPayload: ({id}) => {
    var localThreadId = fromGlobalId(id).id;
    markThreadAsRead(localThreadId);
    return {localThreadId};
  },
});

var Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addMessage: GraphQLAddMessageMutation,
    markThreadAsRead: GraphQLMarkThreadAsReadMutation
  },
});*/
