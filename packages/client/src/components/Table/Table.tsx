import React from "react";
import { Table } from "antd";
import { useQuery } from "@apollo/client";

import { POKEMONS } from "../../apollo/queries/pokemons";
import { Pokemon, PokemonsResponse } from "./table.interfaces";
import { computeColumnsWithFiltersOnTypeField } from "./table.columns";

export function TableComponent() {
  const { loading, error, data } = useQuery<PokemonsResponse>(POKEMONS);
  const dataSource = data?.pokemons.edges.map((e) => e.node);
  const columns = computeColumnsWithFiltersOnTypeField(dataSource);

  return error ? (
    <div>Error...</div>
  ) : (
    <Table<Pokemon>
      rowKey={(p) => p.id}
      dataSource={dataSource}
      columns={columns}
      loading={loading}
    />
  );
}
