import React from "react";

const ScrollToTop = React.memo(
  (): JSX.Element => {
    const handleClick = () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };

    return (
      <a rel="nofollow" onClick={handleClick}>
        Scroll to top
      </a>
    );
  }
);

export default ScrollToTop;
