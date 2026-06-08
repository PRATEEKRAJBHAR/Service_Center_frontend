import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AllRegisterUser, AssignRole } from '../../features/auth/authThunk';
import Swal from "sweetalert2";

function ListingAllRegisterUser() {
  const dispatch = useDispatch();

  const { allRegisterUser, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    dispatch(AllRegisterUser());
  }, [dispatch]);

  // ✅ Handle role change
  const handleRoleChange = (id, newRole) => {
    dispatch(AssignRole({ id, role: newRole }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Registered Users</h2>

      {/* Loading */}
      {loading && <p className="text-blue-500">Loading...</p>}

      {/* Error */}
      {error && <p className="text-red-500">{error?.message || error}</p>}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">S.No</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
            </tr>
          </thead>

          <tbody>
            {allRegisterUser?.length > 0 ? (
              allRegisterUser.map((user, index) => (
                <tr key={user._id} className="text-center">
                  <td className="p-3 border">{index + 1}</td>
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>

                  {/* ✅ Role Dropdown */}

<td className="p-3 border">
  <select
    value={user.role}
    onChange={(e) => {
      const selectedRole = e.target.value;

      // ❌ अगर customer select किया
      if (selectedRole === "customer") {
        Swal.fire({
          icon: "warning",
          title: "Not Allowed",
          text: "Customer role cannot be selected!",
          confirmButtonColor: "#3085d6",
        });

        return; // ❌ stop further execution
      }

      // ✅ valid roles
      handleRoleChange(user._id, selectedRole);
    }}
    className="border px-2 py-1 rounded"
  >
    <option value="customer">Customer</option>
    <option value="admin">Admin</option>
    <option value="technician">Technician</option>
  </select>
</td>

                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default ListingAllRegisterUser;