import React from "react";
import { Table } from "antd";
import { TablePaginationConfig } from "antd/lib/table";
import { Key } from "antd/lib/table/interface";
import { useLazyQuery } from "@apollo/client";

import { Store } from "../../store";
import { useSelector } from "../../hooks/useSelector";
import { POKEMONS } from "../../apollo/query.pokemons";
import { Pokemon, PokemonsResponse } from "./table.interfaces";
import {
  computeColumnsWithFiltersOnTypeField,
  getDataSource,
} from "./table.utils";

export function TableComponent(): JSX.Element {
  const [filterTypes, setFilterTypes] = React.useState<Key[] | null>(null);
  const [getPokemons, { error, loading, data }] = useLazyQuery<
    PokemonsResponse
  >(POKEMONS);
  const dataSource = getDataSource(data);
  const columns = computeColumnsWithFiltersOnTypeField(dataSource);

  const store = Store.getInstance();
  const searchTerm = useSelector(
    store.searchTerm$,
    store.searchTerm$.getValue()
  );

  const handleOnChange = (
    pagination: TablePaginationConfig,
    filters: Record<string, Key[] | null>
  ) => {
    setFilterTypes(filters.types);
  };

  React.useEffect(() => {
    getPokemons({ variables: { name: searchTerm, types: filterTypes } });
  }, [filterTypes, searchTerm, getPokemons]);

  React.useEffect(() => {
    store.loading$.next(loading);
  }, [loading, store.loading$]);

  React.useEffect(() => {
    store.error$.next(error);
  }, [error, store.error$]);

  return error ? (
    <div>Error...</div>
  ) : (
    <Table<Pokemon>
      rowKey={(p) => p.id}
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      onChange={handleOnChange}
    />
  );
}
