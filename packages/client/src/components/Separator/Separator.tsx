import React from "react";

interface SeparatorProps {
  height?: string;
}

const Separator = React.memo(({ height = "50px" }: SeparatorProps) => {
  return <div style={{ height }} />;
});

export default Separator;
