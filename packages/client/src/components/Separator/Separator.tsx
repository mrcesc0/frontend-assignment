import React from "react";

interface SeparatorProps {
  height?: string;
}

export const Separator = React.memo(({ height = "50px" }: SeparatorProps) => {
  return <div style={{ height }} />;
});
