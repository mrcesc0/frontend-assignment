import { ColumnsType } from "antd/lib/table";
import { uniq, flatMap } from "lodash";

import { Pokemon } from "./table.interfaces";

function computeTypeFieldFilters(dataSource?: Pokemon[]) {
  if (!dataSource) return;

  const values = uniq(flatMap(dataSource, (p) => p.types));
  return values.map((v) => ({
    text: v,
    value: v,
  }));
}

export function computeColumnsWithFiltersOnTypeField(
  dataSource?: Pokemon[]
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
      onFilter: (value, record) => {
        return record.types.includes(value as string);
      },
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
