import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

/**
 * @todo Read more about it
 * @see {@link https://www.apollographql.com/docs/link/links/http/}
 */
const link = createHttpLink({
  uri: "http://localhost:4000/",
});

/**
 * @todo Configure InMemoryCache
 * @see {@link https://www.apollographql.com/docs/react/caching/cache-configuration/}
 */
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
