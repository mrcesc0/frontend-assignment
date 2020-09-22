import React from "react";
import { Table } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import {
  Key,
  SorterResult,
  TableCurrentDataSource,
} from "antd/lib/table/interface";
import { useLazyQuery } from "@apollo/client";

import { Store } from "../../store";
import { useSelector } from "../../hooks/useSelector";
import { POKEMONS } from "../../apollo/query.pokemons";
import { Pokemon, PokemonsResponse, QueryVariables } from "./table.interfaces";
import {
  computeColumnsWithFiltersOnTypeField,
  getDataSource,
} from "./table.utils";
import { DEFAULT_LIMIT } from "./table.constants";
import LoadMore from "./components/LoadMore";
import ScrollToTop from "./components/ScrollToTop";
import TableError from "./components/TableError";

const TableComponent = (): JSX.Element => {
  const [getPokemons, { error, loading, data, fetchMore }] = useLazyQuery<
    PokemonsResponse
  >(POKEMONS);
  const dataSource = getDataSource(data);
  const columns = computeColumnsWithFiltersOnTypeField(dataSource);
  const endCursor = data?.pokemons.pageInfo.endCursor;
  const hasNextPage = data?.pokemons.pageInfo.hasNextPage;

  // My store is just a singleton that handles the data
  // I need to share with other components
  const store = Store.getInstance();

  const searchTerm = useSelector(
    store.searchTerm$,
    store.searchTerm$.getValue()
  );

  const [variables, setVariables] = React.useState<QueryVariables>({
    name: searchTerm,
    types: null,
    after: null,
    limit: DEFAULT_LIMIT,
  });

  /**
   * Handle table changes
   * @description Set new variables when filters are changed
   * @see {@link https://ant.design/components/table/#API}
   */
  const handleOnChange = React.useCallback(
    (
      pagination: TablePaginationConfig,
      filters: Record<string, Key[] | null>,
      sorter: SorterResult<Pokemon> | SorterResult<Pokemon>[],
      extra: TableCurrentDataSource<Pokemon>
    ) => {
      switch (extra.action) {
        case "filter":
          setVariables((old) => ({
            ...old,
            types: filters.types,
            after: null,
          }));
          return;
        // Here we can handle other actions such as "sort" and "paginate"
        default:
          return;
      }
    },
    []
  );

  /**
   * Handle "load more" click
   * @description On button click load more pokemons starting from the endCursor.
   * In the browser console i get "The updateQuery callback for fetchMore is deprecated, and will be removed in the next major version of Apollo Client."
   * but the official docs are NOT updated.
   * How do i manage it?
   * Not enough experience with apollo to fix that in a short time.
   * @see {@link https://www.apollographql.com/docs/react/data/pagination/#relay-style-cursor-pagination}
   */
  const handleLoadMoreClick = React.useCallback(() => {
    fetchMore?.({
      variables: {
        after: endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult?.pokemons.edges;
        const pageInfo = fetchMoreResult?.pokemons.pageInfo;

        if (pageInfo == null || newEdges == null) return previousResult;

        return {
          pokemons: {
            edges: [...previousResult.pokemons.edges, ...newEdges],
            pageInfo,
          },
        };
      },
    });
  }, [endCursor, fetchMore]);

  const getFooter = () => {
    return hasNextPage ? (
      <LoadMore onClick={handleLoadMoreClick} />
    ) : (
      <ScrollToTop />
    );
  };

  //#region Effects

  React.useEffect(() => {
    store.loading$.next(loading);
  }, [loading, store.loading$]);

  React.useEffect(() => {
    store.error$.next(error);
  }, [error, store.error$]);

  React.useEffect(() => {
    setVariables((old) => ({
      ...old,
      name: searchTerm,
      after: null,
    }));
  }, [searchTerm]);

  React.useEffect(() => {
    getPokemons({ variables });
  }, [getPokemons, variables]);

  //#endregion Effects

  return error ? (
    <TableError name={error.name} message={error.message} />
  ) : (
    <Table<Pokemon>
      rowKey={(p) => p.id}
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      pagination={false}
      sticky={true}
      onChange={handleOnChange}
      footer={getFooter}
    />
  );
};

export default TableComponent;
