import React from "react";

interface TableErrorProps {
  name: string;
  message: string;
}

/**
 * @todo move to styles to "css" file
 */
const TableError = React.memo(
  ({ name, message }: TableErrorProps): JSX.Element => {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>
          <b>{name}</b>
        </h1>
        <h2>{message}</h2>
      </div>
    );
  }
);

export default TableError;
