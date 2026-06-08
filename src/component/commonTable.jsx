import React, { useEffect } from "react";
import {
  Table, TableHead, TableRow, TableCell,
  TableBody, Paper, TableContainer
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { hideLoader, showLoader } from "./swalLoader";

function CommonTable({
  columns = [],
  data = [],
  loading,
  onSort,
  renderRow,
}) {

  useEffect(() => {
    if (loading) showLoader("Loading Data...");
    else hideLoader();
  }, [loading]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        maxHeight: 520,
        borderRadius: 3,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    >
<Table
  stickyHeader
  sx={{
    // ✅ apply to ALL header + body cells
    "& th, & td": {
      borderRight: "1px solid #e5e7eb",
    },

    // ✅ remove last column border
    "& th:last-child, & td:last-child": {
      borderRight: "none",
    },
  }}
>
        {/* HEADER */}
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
<TableCell
  key={index}
  sx={{
    fontWeight: 600,
    fontSize: "13px",
    backgroundColor: "#1f2937 ",   // ✅ light highlight
    color: "#ffffff",             // ✅ strong readable text
    borderBottom: "1px solid #e5e7eb",
    whiteSpace: "nowrap",
    textTransform: "uppercase",   // ✅ makes header stand out
    letterSpacing: "0.5px",       // ✅ premium feel
        borderRight: "1px solid #374151", // ✅ vertical line

  }}
>
  <div className="flex items-center gap-1">
    {col.label}

    {col.field && (
      <span className="flex flex-col -space-y-2">
        <ArrowDropUpIcon
          fontSize="small"
          onClick={() => onSort(col.field, "asc")}
        />
        <ArrowDropDownIcon
          fontSize="small"
          onClick={() => onSort(col.field, "desc")}
        />
      </span>
    )}
  </div>
</TableCell>
            ))}
          </TableRow>
        </TableHead>

        {/* BODY */}
        <TableBody>
          {!loading && data.length === 0 && (
            <TableRow>
              <TableCell colSpan={columns.length} align="center">
                No data found
              </TableCell>
            </TableRow>
          )}

          {!loading &&
            data.map((row, index) =>
              renderRow(row, index)
            )}
        </TableBody>

      </Table>
    </TableContainer>
  );
}

export default CommonTable;