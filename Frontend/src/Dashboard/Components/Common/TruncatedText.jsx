import React from "react";
import { useState } from "react";

export default function TruncatedText({ text }){
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <p
      className={`text-gray-700 text-sm mt-2 ${
        isExpanded ? "" : "line-clamp-2 overflow-hidden"
      }`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {text}
    </p>
  );
};