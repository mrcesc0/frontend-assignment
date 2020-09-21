import { ColumnsType } from "antd/lib/table";
import { uniq, flatMap } from "lodash";
import { DEFAULT_AFTER } from "./table.constants";

import { Pokemon, PokemonsResponse } from "./table.interfaces";

/**
 *
 * @param dataSource
 */
function computeTypeFieldFilters(dataSource?: Pokemon[]) {
  if (!dataSource) return;

  const values = uniq(flatMap(dataSource, (p) => p.types));
  return values.map((v) => ({
    text: v,
    value: v,
  }));
}

/**
 *
 * @param dataSource
 */
export function computeColumnsWithFiltersOnTypeField(
  dataSource: Pokemon[] | undefined
): ColumnsType<Pokemon> {
  return [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Type",
      dataIndex: "types",
      filters: computeTypeFieldFilters(dataSource),
      filterMultiple: true,
      render: (types) => {
        return types.join(", ");
      },
    },
    {
      title: "Classification",
      dataIndex: "classification",
    },
  ];
}

/**
 *
 * @param response
 */
export function getDataSource(
  response: PokemonsResponse | undefined
): Pokemon[] | undefined {
  return response?.pokemons.edges.map((e) => e.node);
}

/**
 *
 * @param pageSize
 * @param currentPage
 */
export function computeAfter(
  pageSize: number | undefined,
  currentPage: number | undefined
): string {
  if (pageSize === undefined || currentPage === undefined) return DEFAULT_AFTER;

  const after = pageSize * (currentPage - 1);
  return after.toString().padStart(3, "0");
}
