import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import DateRangeIcon from "@mui/icons-material/DateRange";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";

function CommonFilters({
  search,
  setSearch,
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
  handleAdd,
  role,
}) {

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">

        {/* 📅 DATE + 💰 PRICE GROUP */}
        <div className="flex items-center gap-3 flex-wrap">

          {/* DATE */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Date Range</span>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
              {/* <DateRangeIcon className="text-gray-500  border border-yellow-500" /> */}
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent outline-none text-sm "
              />
              {/* <span className="text-gray-400">-</span> */}
              {/* <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent outline-none text-sm"
              /> */}
            </div>
          </div>

           <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Date Range</span>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
              {/* <DateRangeIcon className="text-gray-500  border border-yellow-500" /> */}
              {/* <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-transparent outline-none text-sm  border border-red-500"
              />
              <span className="text-gray-400">-</span> */}
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-transparent outline-none text-sm"
              />
            </div>
          </div>

          {/* PRICE */}
          <div className="flex flex-col ">
            <span className="text-xs text-gray-500 mb-1">Min Price</span>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
              <CurrencyRupeeIcon className="text-gray-500" />
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
                className="bg-transparent outline-none w-16 text-sm"
              />
              {/* <span className="text-gray-400">-</span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
                className="bg-transparent outline-none w-16 text-sm"
              /> */}
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Max Price</span>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg ">
              <CurrencyRupeeIcon className="text-gray-500" />
              {/* <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="Min"
                className="bg-transparent outline-none w-16 text-sm"
              /> */}
              {/* <span className="text-gray-400">-</span> */}
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="Max"
                className="bg-transparent outline-none w-16 text-sm"
              />
            </div>
          </div>

        </div>

        {/* 📌 STATUS + LIMIT */}
        <div className="flex items-end gap-3">

          {/* STATUS */}
          <div className="flex flex-col">
            <span className="text-xs text-gray-500 mb-1">Status</span>
            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
              <FilterListIcon className="text-gray-500 mr-1" />
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
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