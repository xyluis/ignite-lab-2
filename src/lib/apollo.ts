import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4oth672130j01xk9lvb5ph5/master',
  cache: new InMemoryCache()
})