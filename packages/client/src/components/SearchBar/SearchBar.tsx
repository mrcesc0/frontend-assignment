import React from "react";
import { Input } from "antd";

import { Store } from "../../store";
import { useSelector } from "../../hooks/useSelector";

import "./searchBar.css";

interface SearchBarProps {
  placeholder: string;
}

const SearchBar = React.memo(
  ({ placeholder }: SearchBarProps): JSX.Element => {
    const store = Store.getInstance();
    const loading = useSelector(store.loading$, store.loading$.getValue());
    const error = useSelector(store.error$, store.error$.getValue());

    const handleOnChange = React.useCallback(
      (value: string) => {
        store.setSearchTerm(value.trim());
      },
      [store]
    );

    return (
      <Input.Group size="large">
        <Input.Search
          className="input-search-pokemons"
          placeholder={placeholder}
          size="large"
          loading={loading}
          disabled={!!error}
          onSearch={handleOnChange}
        />
      </Input.Group>
    );
  }
);

export default SearchBar;
