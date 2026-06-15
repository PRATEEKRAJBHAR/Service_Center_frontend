import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  customerHistory,
  downloadTicket,
} from "../../features/service/serviceThunk";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../component/commonButton";
import AddIcon from "@mui/icons-material/Add";

function TicketHistory() {
  const dispatch = useDispatch();
const navigate=useNavigate();

  const { customerHistory: history, loading } = useSelector(
    (state) => state.service
  );

  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(customerHistory(userId));
    }
  }, [dispatch, userId]);

const handleDownload = async (id) => {
  const result = await dispatch(downloadTicket(id));

  const blob = result.payload;

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `service-${id}.pdf`;

  document.body.appendChild(a);
  a.click();

  a.remove();
 setTimeout(() => {
  window.location.reload();
}, 500);
  window.URL.revokeObjectURL(url);
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      {history && history.length > 0 ? (
        history.map((item) => (
          <div
            key={item._id}
            className="bg-white max-w-5xl mx-auto mb-10 p-8 border border-black shadow-lg"
          >
            {/* Header */}
            <h2 className="text-center text-2xl font-bold border-b-2 border-black pb-3 mb-6">
              SERVICE REPORT
            </h2>

            {/* Service Info */}
            <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
              <div className="space-y-2">
                <p>
                  <strong>Service ID:</strong> {item._id}
                </p>

                <p>
                  <strong>Status:</strong> {item.status}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(item.createdAt).toDateString()}
                </p>

                <p>
                  <strong>Problem:</strong>{" "}
                  {item.ticketId?.problemDescription || "N/A"}
                </p>
              </div>

              <Button
                text="Download Report"
                onClick={() => handleDownload(item._id)}
                icon={<AddIcon />}
              />
            </div>

            {/* Customer & Technician */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
              <div className="border border-black p-4">
                <h3 className="font-bold underline mb-2">Customer</h3>

                <p>
                  <strong>Name:</strong>{" "}
                  {item.customerId?.name || "N/A"}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {item.ticketId?.phone || "N/A"}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {item.ticketId?.address || "N/A"}
                </p>

                <p>
                  <strong>Device:</strong>{" "}
                  {item.ticketId?.deviceName || "N/A"}
                </p>
              </div>

              <div className="border border-black p-4">
                <h3 className="font-bold underline mb-2">Technician</h3>

                <p>
                  <strong>Name:</strong>{" "}
                  {item.technicianId?.name || "Not Assigned"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {item.technicianId?.email || "N/A"}
                </p>
              </div>
            </div>

            {/* Parts Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-black">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-black p-2">Sr No</th>
                    <th className="border border-black p-2">Part Name</th>
                    <th className="border border-black p-2">Qty</th>
                    <th className="border border-black p-2">Price</th>
                    <th className="border border-black p-2">Total</th>
                  </tr>
                </thead>

                <tbody>
                  {item.parts && item.parts.length > 0 ? (
                    item.parts.map((part, index) => (
                      <tr key={part._id || index}>
                        <td className="border border-black p-2 text-center">
                          {index + 1}
                        </td>

                        <td className="border border-black p-2 text-center">
                          {part.partId?.partName || "N/A"}
                        </td>

                        <td className="border border-black p-2 text-center">
                          {part.quantity}
                        </td>

                        <td className="border border-black p-2 text-center">
                          ₹{part.price}
                        </td>

                        <td className="border border-black p-2 text-center">
                          ₹{part.total}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="border border-black p-3 text-center"
                      >
                        No Parts Added
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="flex justify-end mt-6">
              <table className="w-full md:w-80 border border-black">
                <tbody>
                  <tr>
                    <td className="border border-black p-2">
                      Parts Total
                    </td>
                    <td className="border border-black p-2">
                      ₹{item.partsTotal}
                    </td>
                  </tr>

                  <tr>
                    <td className="border border-black p-2">
                      Service Charge
                    </td>
                    <td className="border border-black p-2">
                      ₹{item.serviceCharge}
                    </td>
                  </tr>

                  <tr className="font-bold">
                    <td className="border border-black p-2">
                      Grand Total
                    </td>
                    <td className="border border-black p-2">
                      ₹{item.grandTotal}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Signatures */}
            <div className="flex justify-between mt-16">
              <div className="w-40 md:w-52 text-center border-t border-black pt-2">
                Customer Signature
              </div>

              <div className="w-40 md:w-52 text-center border-t border-black pt-2">
                Authorized Signature
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-600 text-lg font-semibold mt-20">
          No History Found 🚫
        </div>
      )}
    </div>
  );
}

export default TicketHistory;