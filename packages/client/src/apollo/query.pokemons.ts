import { gql } from "@apollo/client";

export const POKEMONS = gql`
  query GetPokemons($name: String, $types: [String], $after: ID, $limit: Int) {
    pokemons(name: $name, types: $types, after: $after, limit: $limit) {
      pageInfo {
        hasNextPage
        endCursor
        total
      }
      edges {
        node {
          id
          classification
          name
          types
        }
      }
    }
  }
`;
