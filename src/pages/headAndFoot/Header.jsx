import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import originalLotos from "../../assets/images/originalLotos.webp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";

const Header = ({ toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleRegister = () => {
    navigate("/register");
    handleClose();
  };

  const handleLogin = () => {
    navigate("/login");
    handleClose();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    handleClose();
  };

  return (
    <header className="w-full h-[64px] bg-gray-800 border-b border-gray-700 shadow-md px-6 flex justify-between items-center">

      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">

        {/* Toggle */}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md hover:bg-white/10 transition"
        >
          <MenuIcon className="text-white" />
        </button>

        {/* Logo */}
        <img
          src={originalLotos}
          alt="logo"
          className="h-9 w-9 object-contain rounded"
        />

        {/* Title */}
        <h1 className="text-white text-lg font-medium tracking-wide">
          Service Management Panel
        </h1>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">

        {/* Username */}
        <p className="text-white text-sm font-medium hidden sm:block">
          {user?.name || "User"}
        </p>

        {/* Profile */}
        <IconButton
          onClick={handleClick}
          className="hover:bg-white/10"
        >
          <AccountCircleIcon sx={{ color: "white", fontSize: 30 }} />
        </IconButton>

        {/* Dropdown */}
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              mt: 1.5,
              borderRadius: 2,
              minWidth: 150,
            },
          }}
        >
          {/* <MenuItem onClick={handleRegister}>Register</MenuItem> */}
          {/* <MenuItem onClick={handleLogin}>Login</MenuItem> */}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
};

export default Header;