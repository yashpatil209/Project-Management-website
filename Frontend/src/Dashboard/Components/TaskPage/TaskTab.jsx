import { useState } from "react";

export default function TaskTab() {
  const [selected, setSelected] = useState("All");

  const options = ["All", "Low", "Medium", "High"];

  return (
      <div className="bg-white border-2 border-gray-150 w-fit p-1 rounded-lg flex">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => setSelected(option)}
            className={`px-4 py-1 rounded-md text-gray-600 font-medium transition ${
              selected === option
                ? "bg-gray-100 text-teal-600 shadow-sm"
                : "hover:bg-gray-50"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
  );
}
