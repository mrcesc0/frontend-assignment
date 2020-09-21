import React from "react";
import { Input } from "antd";

import { Store } from "../../store";
import { useSelector } from "../../hooks/useSelector";

import "./searchBar.css";

interface SearchBarProps {
  placeholder: string;
}

export function SearchBar({ placeholder }: SearchBarProps): JSX.Element {
  const store = Store.getInstance();
  const loading = useSelector(store.loading$, store.loading$.getValue());
  const error = useSelector(store.error$, store.error$.getValue());

  const handleOnChange = (value: string) => {
    store.searchTerm$.next(value);
  };

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
