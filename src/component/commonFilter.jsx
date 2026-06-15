import React from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";

function CommonFilters({
  status,
  setStatus,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  limit,
  setLimit,
  statusOptions = [],
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,

  // Visibility Controls
  showDate = true,
  showStatus = true,
  showPrice = true,
}) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">

        {/* DATE + PRICE SECTION */}
        <div className="flex items-center gap-3 flex-wrap">

          {/* DATE FILTERS */}
          {showDate && (
            <>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">
                  From Date Range
                </span>
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <input
                    type="date"
                    value={startDate || ""}
                    onChange={(e) => setStartDate?.(e.target.value)}
                    className="bg-transparent outline-none text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">
                  To Date Range
                </span>
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <input
                    type="date"
                    value={endDate || ""}
                    onChange={(e) => setEndDate?.(e.target.value)}
                    className="bg-transparent outline-none text-sm"
                  />
                </div>
              </div>
            </>
          )}

          {/* PRICE FILTERS */}
          {showPrice && (
            <>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">Min Price</span>
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <CurrencyRupeeIcon className="text-gray-500" />
                  <input
                    type="number"
                    value={minPrice || ""}
                    onChange={(e) => setMinPrice?.(e.target.value)}
                    placeholder="Min"
                    className="bg-transparent outline-none w-20 text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">Max Price</span>
                <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
                  <CurrencyRupeeIcon className="text-gray-500" />
                  <input
                    type="number"
                    value={maxPrice || ""}
                    onChange={(e) => setMaxPrice?.(e.target.value)}
                    placeholder="Max"
                    className="bg-transparent outline-none w-20 text-sm"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* STATUS + LIMIT */}
        <div className="flex items-end gap-3">

          {/* STATUS FILTER */}
          {showStatus && (
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 mb-1">Status</span>
              <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
                <FilterListIcon className="text-gray-500 mr-1" />
                <select
                  value={status || ""}
                  onChange={(e) => setStatus?.(e.target.value)}
                  className="bg-transparent outline-none text-sm"
                >
                  <option value="">All</option>
                  {statusOptions.map((opt, i) => (
                    <option key={i} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* LIMIT */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Rows</span>
            <select
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="bg-gray-100 px-3 py-2 rounded-lg text-sm outline-none"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommonFilters;