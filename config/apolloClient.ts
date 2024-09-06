import { ApolloClient, InMemoryCache } from '@apollo/client';

const CONTENTFUL_SPACE=process.env.EXPO_PUBLIC_CONTENTFUL_SPACE;
const CONTENTFUL_ACCESS_TOKEN=process.env.EXPO_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const URL = `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE}`;


const client = new ApolloClient({
  uri: URL, // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
  headers: {
    authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
  },
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
  },
});

export default client;