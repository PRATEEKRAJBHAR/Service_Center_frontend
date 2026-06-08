import * as Yup from "yup";


// registration schema


export const registerSchema = Yup.object({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required"),

  // role: Yup.string()
  //   .oneOf(["customer", "technician", "admin"], "Invalid role")
  //   .required("Role is required"),

  // profileImage: Yup.mixed()
  //   .required("Profile image is required")
  //   .test(
  //     "fileType",
  //     "Only image files are allowed",
  //     (value) =>
  //       value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
  //   ),

  // documents: Yup.mixed()
  //   .required("Document is required")
  //   .test(
  //     "fileType",
  //     "Only PDF or DOC files are allowed",
  //     (value) =>
  //       value &&
  //       [
  //         "application/pdf",
  //         "application/msword",
  //         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  //       ].includes(value.type)
    // ),
});

// login


export const loginSchema = Yup.object({

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required"),


});


// create service

export const serviceSchema = Yup.object({
  // problemDescription: Yup.string()
  //   .required("Problem description is required"),

  serviceCharge: Yup.number()
    .required("Service charge is required")
    .positive("Must be positive"),

  // status: Yup.string()
  //   .required("Status is required"),

  customerId: Yup.string()
    .required("Customer Name is required"),
    ticketId: Yup.string()
    .required("Ticket is required"),
});



// raise ticket


export const customerSchema = Yup.object({
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone is required"),

  address: Yup.string()
    .min(5, "Address too short")
    .required("Address is required"),

  deviceName: Yup.string()
    .required("Device name is required"),

  devicePrice: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Device price is required"),

  problemDescription: Yup.string()
    .required("Problem description is required"),


});





// forgert password

export const ForgetPasswordSchema =Yup.object({
      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    });



    // reset password



    export const ResetPasswordSchema =Yup.object({
          password: Yup.string()
            .required("Password is required"),

          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm password is required"),
        })



        // added parts stock


  export      const addedPartsStock = Yup.object({
  partId: Yup.string().required("Please select a part"),
  quantity: Yup.number()
    .required("Quantity is required")
    .min(1, "Quantity must be greater than 0"),
});