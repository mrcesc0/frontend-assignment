import { Key } from "antd/lib/table/interface";

export interface Pokemon {
  id: string;
  name: string;
  types: string[];
  classification: string;
}

export interface Edge {
  cursor?: string;
  node: Pokemon;
}

export interface PageInfo {
  hasNextPage: boolean;
  endCursor: string;
  total: number;
}

export interface PokemonsResponse {
  pokemons: {
    edges: Edge[];
    pageInfo: PageInfo;
  };
}

export interface QueryVariables {
  name: string;
  types: Key[] | null;
  after: string;
  limit: number;
}
