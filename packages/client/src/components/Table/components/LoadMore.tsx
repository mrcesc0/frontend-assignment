import React from "react";

interface LoadMoreProps {
  onClick: () => void;
}

const LoadMore = React.memo(
  ({ onClick: handleClick }: LoadMoreProps): JSX.Element => {
    return (
      <a rel="nofollow" onClick={handleClick}>
        Load more...
      </a>
    );
  }
);

export default LoadMore;
