import React, { useState } from "react";
import "./SearchBar.css";

export default function SearchBar() {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    alert(`Searching for: ${query}`);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search city..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}
