import React from "react";
import { Input } from "antd";

import "./searchBar.css";

export function SearchBar() {
  return (
    <Input.Group size="large">
      <Input.Search
        className="input-search-pokemons"
        placeholder="Search a pokemon..."
        defaultValue=""
        size="large"
        allowClear={true}
        minLength={3}
        loading={false}
      />
    </Input.Group>
  );
}
