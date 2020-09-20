import { gql } from "@apollo/client";

export const POKEMONS = gql`
  query GetPokemons {
    pokemons {
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
