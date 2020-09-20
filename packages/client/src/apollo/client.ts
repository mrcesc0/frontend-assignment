import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const link = createHttpLink({
  uri: "http://localhost:4000/",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export default client;
