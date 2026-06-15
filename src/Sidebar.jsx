import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

// MUI Icons
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import BuildIcon from "@mui/icons-material/Build";
import SettingsIcon from "@mui/icons-material/Settings";
import ReceiptIcon from "@mui/icons-material/Receipt";
import LogoutIcon from "@mui/icons-material/Logout";
import AcUnitIcon from '@mui/icons-material/AcUnit';
const Sidebar = ({ isOpen }) => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const menuItems = [
    {
      name: "Dashboard",
      path: "/listing-allregisteruser",
      icon: <DashboardIcon />,
      roles: ["admin"],
    },
    {
      name: "Customers",
      path: "/listing-cutomer",
      icon: <PeopleIcon />,
      roles: ["admin", "customer"],
    },
    {
      name: "Services",
      path: "/listing-service",
      icon: <BuildIcon />,
      roles: ["admin", "technician"],
    },
    {
      name: "Parts",
      path: "/parts-list",
      icon: <ReceiptIcon />,
      roles: ["admin"],
    },
    // {
    //   name: "Invoices",
    //   path: "/invoices",
    //   icon: <ReceiptIcon />,
    //   roles: ["admin", "technician", "customer"],
    // },
  ];

  const filteredMenu = menuItems.filter((item) =>
    item.roles.includes(role)
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    handleClose();
  };
  return (
    <div
      className={`bg-[#0f172a] text-gray-300 flex flex-col h-screen transition-all duration-300 ${
        isOpen ? "w-64" : "w-0 overflow-hidden"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-700">
        <div className="bg-blue-600 p-2 rounded-lg">
          <AcUnitIcon className="text-white" />
        </div>
        <h1 className="text-lg font-semibold text-white">AtechSeva</h1>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4 py-6 space-y-2">
        {filteredMenu.map((item, index) => (
          <NavLink key={index} to={item.path}>
            {({ isActive }) => (
              <div
                className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all relative cursor-pointer ${
                  isActive
                    ? "bg-[#1e293b] text-white"
                    : "text-gray-400 hover:text-white hover:bg-[#1e293b]"
                }`}
              >
                {/* Left Blue Indicator */}
                <span
                  className={`absolute left-0 top-0 h-full w-1 rounded-r-md ${
                    isActive ? "bg-blue-500" : ""
                  }`}
                />

                {/* Icon */}
                <span
                  className={`text-xl ${
                    isActive ? "text-blue-400" : "text-gray-400"
                  }`}
                >
                  {item.icon}
                </span>

                {/* Text */}
                <span className="text-sm font-medium">
                  {item.name}
                </span>
              </div>
            )}
          </NavLink>
        ))}
      </div>


    </div>
  );
};

export default Sidebar;