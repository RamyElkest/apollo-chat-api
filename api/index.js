import path from 'path';
import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import bodyParser from 'body-parser';

import config from '../config';
import { Users, Threads, Messages } from './models';

// import { createServer } from 'http';
// import { SubscriptionServer } from 'subscriptions-transport-ws';
// import { subscriptionManager } from './subscriptions';

import schema from './schema';

let PORT = config.port;
if (process.env.PORT) {
  PORT = parseInt(process.env.PORT, 10) + 100;
}

// const WS_PORT = process.env.WS_PORT || 8080;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// setUpGitHubLogin(app);

app.use('/graphql', graphqlExpress((req) => {
  // Get the query, the same way express-graphql does it
  // https://github.com/graphql/express-graphql/blob/3fa6e68582d6d933d37fa9e841da5d2aa39261cd/src/index.js#L257
  const query = req.query.query || req.body.query;
  if (query && query.length > 2000) {
    // None of our app's queries are this long
    // Probably indicates someone trying to send an overly expensive query
    throw new Error('Query too large.');
  }

  return {
    schema,
    context: {
      Users: new Users(),
      Messages: new Messages(),
      Threads: new Threads(),
    },
  };
}));


app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  query: `{
  user {
    username
    firstName
    lastName
    threads {
      name
      isRead
      updatedAt
      messages {
        postedBy
        content
        createdAt
      }
    }
  }
}`,
}));

// Serve our helpful static landing page. Not used in production.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => console.log(`API Server is now running on http://localhost:${PORT}`));

/*
// WebSocket server for subscriptions
const websocketServer = createServer((request, response) => {
  response.writeHead(404);
  response.end();
});

websocketServer.listen(WS_PORT, () => console.log( // eslint-disable-line no-console
  `Websocket Server is now running on http://localhost:${WS_PORT}`
));
// eslint-disable-next-line
new SubscriptionServer(
  {
    subscriptionManager,

    // the obSubscribe function is called for every new subscription
    // and we use it to set the GraphQL context for this subscription
    onSubscribe: (msg, params) => {
      const gitHubConnector = new GitHubConnector({
        clientId: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
      });
      return Object.assign({}, params, {
        context: {
          Repositories: new Repositories({ connector: gitHubConnector }),
          Users: new Users({ connector: gitHubConnector }),
          Entries: new Entries(),
          Comments: new Comments(),
        },
      });
    },
  },
  websocketServer
);
*/
