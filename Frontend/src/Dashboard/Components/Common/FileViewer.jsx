import React, { useState, useEffect } from "react";
import { Paperclip } from "lucide-react";

const FileViewer = ({ fileData }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (!fileData || !fileData.content || !fileData.type) {
      setFileUrl(""); // Reset URL if no file
      return;
    }

    // Convert Base64 to Blob
    const byteCharacters = atob(fileData.content);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: fileData.type });

    // Create Object URL
    const url = URL.createObjectURL(blob);
    setFileUrl(url);

    // Cleanup: Revoke URL on unmount
    return () => URL.revokeObjectURL(url);
  }, [fileData]);

  if (!fileData || !fileData.content || !fileData.type) {
    return null; // Don't render file viewer if no file data
  }

  // Full-Screen Mode Toggle
  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div>
      {/* Only show the button to toggle full screen */}
      {!isFullScreen && (
        <button
          onClick={toggleFullScreen}
          className="flex gap-2 items-center justify-center text-blue-600 rounded-md px-2 py-1"
        >
          <Paperclip className="w-4 h-4" /> View Attachment
        </button>
      )}

      {/* Full-Screen Content */}
      {isFullScreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          style={{ zIndex: 1000 }}
        >
          <div className="relative w-full h-full">
            <button
              onClick={toggleFullScreen}
              className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>

            {/* Show file based on type */}
            {fileData.type.startsWith("image/") ? (
              <img
                src={fileUrl}
                alt={fileData.fileName}
                className="w-full h-full object-contain"
              />
            ) : fileData.type === "application/pdf" ? (
              <iframe
                src={fileUrl}
                title="PDF Viewer"
                className="w-full h-full border-0"
              />
            ) : (
              <a
                href={fileUrl}
                download={fileData.fileName}
                className="text-blue-500 underline"
              >
                Download File
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileViewer;
