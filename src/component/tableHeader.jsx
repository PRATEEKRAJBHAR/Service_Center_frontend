export const serviceColumns = [
  { label: "S.N" },
  { label: "Name", field: "user.name" },
  { label: "Phone", field: "ticket.phone" },
  { label: "Device", field: "ticket.deviceName" },
  { label: "Price", field: "ticket.devicePrice" },
  { label: "Problem Description", field: "ticket.problemDescription" },
  { label: "Service Charge", field: "serviceCharge" },
  { label: "Status", field: "status" },
  { label: "Technician Assign", field: null },
  { label: "Date", field: "createdAt" },
  { label: "Updated At", field: "updatedAt" },
  { label: "Action" },
];



export const customerHead = [
    { label: "S.N", field: null },
    { label: "Name", field: "userId.name" },
    { label: "Phone", field: "phone" },
    { label: "Address", field: "address" },
    { label: "Device", field: "deviceName" },
    { label: "Price", field: "devicePrice" },
    { label: "Problem Description", field: "problemDescription" },
    { label: "Purchase Bill", field: null },
    { label: "Device Image", field: null },
    { label: "Status", field: "isActive" },
    { label: "Date", field: "createdAt" },
    { label: "Updated At", field: "updatedAt" },
    { label: "Action", field: null },
  ];