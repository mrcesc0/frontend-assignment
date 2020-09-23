import { ColumnsType } from "antd/lib/table";
import uniq from "lodash/uniq";
import flatMap from "lodash/flatMap";

import { Pokemon, PokemonsResponse } from "./table.interfaces";

/**
 * For each pokemon extract its types (they might have more than one)
 * and create a flat array of types as table wants (an object with "text" and "value")
 * @see {@link https://ant.design/components/table/#components-table-demo-head}
 * @param dataSource The table data (aka an array of pokemons)
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
 * Compute the table's columns
 * @todo Actually i don't like to obtain filters from dataSource and it's not quite right because we can't have all of them.
 * I would have preferred to don't have deps with dataSource since usually the columns define the shape of the table and not the contrary.
 * I think the server should give all possibile types to be used as filter, so we need to create a new query.
 * @param dataSource The table data (aka an array of pokemons)
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
 * Get the pokemons list
 * @param response The entire service response
 */
export function getDataSource(
  response: PokemonsResponse | undefined
): Pokemon[] {
  return response?.pokemons.edges.map((e) => e.node) || [];
}
