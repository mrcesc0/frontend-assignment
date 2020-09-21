import { gql } from "@apollo/client";

export const POKEMONS = gql`
  query GetPokemons($name: String, $types: [String]) {
    pokemons(name: $name, types: $types) {
      pageInfo {
        hasNextPage
        endCursor
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
