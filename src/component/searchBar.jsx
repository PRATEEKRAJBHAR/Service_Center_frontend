import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

function SearchBar({ search, setSearch }) {
  return (
    <div className="flex items-center bg-gray-200 px-3 py-2 rounded-lg w-full max-w-[320px] relative">

      <SearchIcon className="text-gray-400 mr-2" />

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        className="bg-transparent outline-none w-full text-sm pr-6 "
      />

      {search && (
        <CloseIcon
          className="text-gray-400 cursor-pointer hover:text-gray-600 absolute right-2"
          onClick={() => setSearch("")}
        />
      )}
    </div>
  );
}

export default SearchBar;