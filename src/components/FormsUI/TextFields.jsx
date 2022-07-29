import React from "react";

const TextFields = ({ props }) => {
  return (
    <input
      {...props}
      className="w-[90%] h-12 rounded-sm bg-transparent px-4 border border-slate-400"
    />
  );
};

export default TextFields;
