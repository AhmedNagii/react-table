import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";

function GlobalFilter({ filter, setFilter }) {
  const [value, setValue] = useState(filter);
  const onChange = useAsyncDebounce((value) => {
    setFilter(value || undefined);
  });

  return (
    <span>
      Search:{""}
      <input
        value={filter || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
      />
    </span>
  );
}

export default GlobalFilter;
