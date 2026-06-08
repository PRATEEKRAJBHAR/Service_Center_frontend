import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { customerHistory, downloadTicket } from "../../features/service/serviceThunk";
import { useParams } from "react-router-dom";

function TicketHistory() {
  const dispatch = useDispatch();

  const { customerHistory: history, loading } = useSelector(
    (state) => state.service
  );

console.log(history,"customer hystory");
  const { userId,id} = useParams();

  useEffect(() => {
    if (userId) {
      dispatch(customerHistory(userId));
    }

  }, [dispatch, userId,id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading...
      </div>
    );
  }
const handleDownload = async (id) => {
  try {
    const result = await dispatch(downloadTicket(id));

    const blob = result.payload;

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `service-${id}.pdf`;
    document.body.appendChild(a);
    a.click();

    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.log("Download error", error);
  }
};
  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      {history && history.length > 0 ? (
        history.map((item) => (
          <div
            key={item._id}
            className="bg-white max-w-3xl mx-auto mb-8 p-6 rounded-xl shadow-md"
          >
            <h2 className="text-center text-xl font-bold border-b-2 border-black pb-2 mb-5">
              SERVICE REPORT
            </h2>
                   <button onClick={()=>handleDownload(item._id)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mb-3 rounded-lg">
                    Download Report
                  </button>
            {/* Top Section */}
            <div className="flex justify-between mb-5 text-sm md:text-base">

              <div className="space-y-1">
                <p><span className="font-semibold">Ticket ID:</span> {item.ticketId}</p>
                <p><span className="font-semibold">Problem:</span> {item.problemDescription}</p>
                <p><span className="font-semibold">Status:</span> {item.status}</p>
                <p>
                  <span className="font-semibold">Date:</span>{" "}
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-1 text-right">
                <p><span className="font-semibold">Technician:</span> {item.technicianId?.name}</p>
                <p><span className="font-semibold">Grand Total:</span> ₹{item.grandTotal}</p>
              </div>
            </div>

            {/* Parts Table */}
            {item.parts && item.parts.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">Part</th>
                      <th className="border p-2">Qty</th>
                      <th className="border p-2">Price</th>
                      <th className="border p-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.parts.map((part) => (
                      <tr key={part._id} className="text-center">
                        <td className="border p-2">{part.partId?.partName}</td>
                        <td className="border p-2">{part.quantity}</td>
                        <td className="border p-2">{part.price}</td>
                        <td className="border p-2">{part.total}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>
            )}

            {/* PDF Button */}
            {item.reports && item.reports.length > 0 && (
              <div className="mt-4 text-center">
                <a
                  href={item.reports[0].url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                    View PDF
                  </button>
                </a>
              </div>
            )}
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