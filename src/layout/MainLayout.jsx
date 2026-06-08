// its working

// import { Outlet } from "react-router-dom";
// import Sidebar from "../Sidebar";
// import Header from "../pages/headAndFoot/Header";

// export default function MainLayout() {
//   return (
//     <div className="flex h-screen overflow-hidden">

//       {/* Sidebar */}
//       <Sidebar />

//       {/* Right Side */}
//       <div className="flex-1 flex flex-col">
//         <Header />

//         {/* Page Content */}
//         <div className="p-6 bg-gray-100 flex-1 overflow-auto">
//           <Outlet />
//         </div>
//       </div>

//     </div>
//   );
// }




import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Header from "../pages/headAndFoot/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen">

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Header */}
        <Header toggleSidebar={() => setIsOpen(!isOpen)} />

        {/* Pages */}
        <div className="p-4 bg-gray-100 flex-1 overflow-auto">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default MainLayout;