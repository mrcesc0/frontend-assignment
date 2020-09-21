export interface Edge<A> {
  cursor: string;
  node: A;
}

export interface PageInfo {
  endCursor?: string;
  hasNextPage: boolean;
  total: number;
}

export interface Connection<A> {
  edges: Array<Edge<A>>;
  pageInfo: PageInfo;
}
