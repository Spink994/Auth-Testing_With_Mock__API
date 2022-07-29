import React from "react";

const Submitbutton = ({ children }) => {
  return (
    <button
      type="submit"
      className="w-max bg-sky-500 px-8 py-2 rounded-sm font-bold text-slate-100 cursor-pointer transition-all hover:bg-sky-400 active:scale-[1.1]"
    >
      {children}
    </button>
  );
};

export default Submitbutton;
