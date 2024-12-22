import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// Set up the Apollo Client to connect to your GraphQL server
const client = new ApolloClient({
  link: new HttpLink({
    uri: '/graphql',  // This will use the proxy configured in vite.config.js
  }),
  cache: new InMemoryCache(),
});

export default client;
