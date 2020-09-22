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
import { Pokemon, PokemonsResponse, QueryVariables } from "./table.interfaces";
import { POKEMONS } from "../../apollo/query.pokemons";
import {
  DEFAULT_AFTER,
  DEFAULT_LIMIT,
  PAGE_SIZE_OPTIONS,
} from "./table.constants";
import {
  computeAfter,
  computeColumnsWithFiltersOnTypeField,
  getDataSource,
} from "./table.utils";

export function TableComponent(): JSX.Element {
  const [getPokemons, { error, loading, data }] = useLazyQuery<
    PokemonsResponse
  >(POKEMONS);
  const dataSource = getDataSource(data);
  const columns = computeColumnsWithFiltersOnTypeField(dataSource);
  const hasNextPage = data?.pokemons.pageInfo.hasNextPage;
  const total = data?.pokemons.pageInfo.total;

  const store = Store.getInstance();
  const searchTerm = useSelector(
    store.searchTerm$,
    store.searchTerm$.getValue()
  );

  const [variables, setVariables] = React.useState<QueryVariables>({
    name: searchTerm,
    types: null,
    after: DEFAULT_AFTER,
    limit: DEFAULT_LIMIT,
  });

  const handleOnChange = React.useCallback(
    (
      pagination: TablePaginationConfig,
      filters: Record<string, Key[] | null>,
      sorter: SorterResult<Pokemon> | SorterResult<Pokemon>[],
      extra: TableCurrentDataSource<Pokemon>
    ) => {
      switch (extra.action) {
        case "paginate":
          setVariables((old) => ({
            ...old,
            limit: pagination.pageSize as number,
            after: computeAfter(pagination.pageSize, pagination.current),
          }));
          return;
        case "filter":
          setVariables((old) => ({
            ...old,
            types: filters.types,
            after: DEFAULT_AFTER,
          }));
          return;
        default:
          return;
      }
    },
    []
  );

  const paginationOptions = React.useMemo(() => {
    return {
      defaultPageSize: DEFAULT_LIMIT,
      pageSizeOptions: PAGE_SIZE_OPTIONS,
      showSizeChanger: true,
      disabled: !hasNextPage,
      total,
    };
  }, [hasNextPage, total]);

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
      after: DEFAULT_AFTER,
    }));
  }, [searchTerm]);

  React.useEffect(() => {
    getPokemons({ variables });
  }, [getPokemons, variables]);

  //#endregion Effects

  return error ? (
    <div>Error...</div>
  ) : (
    <Table<Pokemon>
      rowKey={(p) => p.id}
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      pagination={paginationOptions}
      onChange={handleOnChange}
      sticky={true}
    />
  );
}
