// this is working code

// // src/components/common/FileUpload.jsx
// import React from "react";

// function FileUpload({ label, multiple, accept, onChange }) {
//   return (
//     <div>
//       <label className="text-sm font-medium">{label}</label>
//       <input
//         type="file"
//         multiple={multiple}
//         accept={accept}
//         onChange={onChange}
//             className="w-full border p-2 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400"
//       />
//     </div>
//   );
// }


// export default FileUpload;








// src/components/common/FileUpload.jsx

import React from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import DeleteIcon from "@mui/icons-material/Delete";

function FileUpload({
  label,
  name,
  multiple = false,
  accept,
  onChange,
  file,
  preview,
  setPreview,
  setFieldValue,
  showPreview = true,
}) {
  const handleChange = (e) => {
    const selectedFile = multiple
      ? Array.from(e.target.files)
      : e.target.files[0];

    // Formik Support
    if (setFieldValue) {
      setFieldValue(name, selectedFile);
    }

    // Image Preview
    if (!multiple && selectedFile && showPreview) {
      if (selectedFile.type?.startsWith("image")) {
        setPreview && setPreview(URL.createObjectURL(selectedFile));
      }
    }

    onChange && onChange(e);
  };

  const handleRemove = () => {
    if (setFieldValue) {
      setFieldValue(name, multiple ? [] : null);
    }

    setPreview && setPreview(null);
  };

  return (
    <div className="w-full">

      {/* Label */}
      {label && (
        <label className="block text-cyan-400 font-medium mb-2 ml-1">
          {label}
        </label>
      )}

      {/* Upload Box */}
      <label className="relative flex flex-col items-center justify-center w-full min-h-[130px] px-4 py-6 border-2 border-dashed border-cyan-400/50 rounded-2xl bg-white/5 cursor-pointer hover:border-cyan-300 hover:bg-cyan-500/5 transition-all duration-300">

        <UploadFileIcon className="text-cyan-400 !text-4xl mb-2 animate-bounce" />

        <span className="text-white text-sm text-center">
          Click to Upload {multiple ? "Files" : "File"}
        </span>

        <span className="text-gray-400 text-xs mt-1">
          {accept || "All files supported"}
        </span>

        <input
          type="file"
          name={name}
          multiple={multiple}
          accept={accept}
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {/* Image Preview */}
      {showPreview && preview && (
        <div className="mt-4 text-center animate-[fadeIn_0.5s_ease-in-out]">

          <img
            src={preview}
            alt="preview"
            className="h-28 w-28 object-cover rounded-xl mx-auto border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          />

          <button
            type="button"
            onClick={handleRemove}
            className="mt-3 inline-flex items-center gap-1 text-red-400 hover:text-red-300 text-sm transition-all duration-300"
          >
            <DeleteIcon fontSize="small" />
            Remove
          </button>
        </div>
      )}

      {/* File Name Preview */}
      {!preview && file && typeof file === "object" && file.name && (
        <div className="mt-3 text-green-400 text-sm flex items-center gap-2">
          📄 {file.name}
        </div>
      )}
    </div>
  );
}

export default FileUpload;