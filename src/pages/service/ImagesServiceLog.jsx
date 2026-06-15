import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addServiceLogImg } from "../../features/service/serviceThunk";
import FileUpload from "../../component/FileUpload";
import Button from "../../component/commonButton";
import {showLoader, hideLoader, showSuccess, showError } from "../../component/swalLoader";


function ImagesServiceLog() {
  const [preview, setPreview] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const formik = useFormik({
  //   initialValues: {
  //     images: null,
  //   },
  //   onSubmit: (values) => {
  //     if (!values.images) {
  //       alert("Please select image");
  //       return;
  //     }

  //     const formData = new FormData();
  //     formData.append("file", values.images);

  //     dispatch(addServiceLogImg({ id, data: formData }));

  //     alert("Image added successfully");
  //     navigate(-1);

  //     formik.resetForm();
  //     setPreview(null);
  //   },
  // });


  const formik = useFormik({
  initialValues: {
    images: null,
  },

  onSubmit: async (values) => {
    if (!values.images) {
      showError("Please select image");
      return;
    }

    const formData = new FormData();
    formData.append("file", values.images);

    try {
      // ✅ Start Loader
      showLoader("Uploading Image...");

      // ✅ Wait for API
      await dispatch(addServiceLogImg({ id, data: formData })).unwrap();

      // ✅ Stop Loader
      hideLoader();

      // ✅ Success
      showSuccess("Image added successfully");

      formik.resetForm();
      setPreview(null);

      navigate(-1);

    } catch (err) {
      // ✅ Stop Loader
      hideLoader();

      // ❌ Error
      showError(err?.message || "Upload failed");
    }
  },
});
  return (
<div className="min-h-screen flex items-center justify-center">
  <div className="p-6 bg-white shadow-md rounded-lg w-1/2 border ">
    {/* <div className="p-6 bg-white shadow-md rounded-lg max-w-2xl w-full border border-red-900"> */}

      <form onSubmit={formik.handleSubmit}>

        {/* ✅ Reusable File Upload */}
        <FileUpload
          label="Upload Service Image"
          name="images"
          accept="image/*"
          file={formik.values.images}
          preview={preview}
          setPreview={setPreview}
          setFieldValue={formik.setFieldValue}
        />

        {/* ✅ Reusable Button */}
        <div className="mt-4">
          <Button text="Upload Image" type="submit" />
        </div>

      </form>
    {/* </div> */}
    </div>
</div>
  );
}

export default ImagesServiceLog;