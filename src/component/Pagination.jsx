import React from "react";

function Pagination({
  page = 1,
  limit = 10,
  totalCount = 0,
  onPageChange,
}) {
  const totalPages = Math.ceil(totalCount / limit);

  // generate page numbers (max 5 visible)
  const getPages = () => {
    let pages = [];
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, start + 4);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-4 bg-white px-4 py-3 rounded-xl shadow-sm">

      {/* LEFT INFO */}
      <span className="text-sm text-gray-500">
        Showing {(page - 1) * limit + 1} - 
        {Math.min(page * limit, totalCount)} of {totalCount}
      </span>

      {/* RIGHT CONTROLS */}
      <div className="flex items-center gap-2">

        {/* PREV */}
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className={`px-3 py-1 rounded-lg text-sm transition
            ${page === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"}`}
        >
          Prev
        </button>

        {/* PAGE NUMBERS */}
        {getPages().map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded-lg text-sm transition
              ${p === page
                ? "bg-black text-white"
                : "bg-gray-100 hover:bg-gray-200"}`}
          >
            {p}
          </button>
        ))}

        {/* NEXT */}
        <button
          disabled={page === totalPages || totalPages === 0}
          onClick={() => onPageChange(page + 1)}
          className={`px-3 py-1 rounded-lg text-sm transition
            ${page === totalPages || totalPages === 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 hover:bg-gray-200"}`}
        >
          Next
        </button>

      </div>
    </div>
  );
}

export default Pagination;