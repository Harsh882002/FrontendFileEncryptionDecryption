import React, { useState } from "react";

function FileUpload() {
  const [fileToEncrypt, setFileToEncrypt] = useState(null);
  const [fileToDecrypt, setFileToDecrypt] = useState(null);
  const [encryptionKey, setEncryptionKey] = useState("");
  const [message, setMessage] = useState("");

  // Handle file selection for encryption
  const handleFileEncryptChange = (e) => {
    setFileToEncrypt(e.target.files[0]);
  };

  // Handle file selection for decryption
  const handleFileDecryptChange = (e) => {
    setFileToDecrypt(e.target.files[0]);
  };

  // Handle encryption
  const handleEncrypt = async () => {
    if (!fileToEncrypt) {
      alert("Please select a file to encrypt.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileToEncrypt);

    try {
      const response = await fetch("http://192.168.111.1:8080/file-encryption/encrypt", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `encrypted_${fileToEncrypt.name}.enc`;
        document.body.appendChild(link);
        link.click();
        link.remove();

        const encryptionKey = response.headers.get("Encryption-Key");
        console.log("Received Encryption Key:", encryptionKey);
        setEncryptionKey(encryptionKey);
        setMessage("File encrypted successfully! Encryption key: " + encryptionKey);
      } else {
        alert("Failed to encrypt the file.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while encrypting the file.");
    }
  };

  // Handle decryption
  const handleDecrypt = async () => {
    if (!fileToDecrypt || !encryptionKey) {
      alert("Please select a file and enter the encryption key.");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileToDecrypt);
    formData.append("key", encryptionKey);

    try {
      const response = await fetch("http://192.168.111.1:8080/file-encryption/decrypt", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `decrypted_${fileToDecrypt.name.replace(".enc", ".pdf")}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setMessage("File decrypted successfully!");
      } else {
        alert("Failed to decrypt the file.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while decrypting the file.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">File Encryption/Decryption</h1>

        {/* File Input for Encryption */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select File to Encrypt</label>
          <input
            type="file"
            onChange={handleFileEncryptChange}
            className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Encrypt Button */}
        <button
          onClick={handleEncrypt}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200 mb-6"
        >
          Encrypt and Download
        </button>

        {/* Encryption Key Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Enter Encryption Key for Decryption</label>
          <input
            type="text"
            value={encryptionKey}
            onChange={(e) => setEncryptionKey(e.target.value)}
            placeholder="Enter Encryption Key"
            className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* File Input for Decryption */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Select File to Decrypt</label>
          <input
            type="file"
            onChange={handleFileDecryptChange}
            className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        {/* Decrypt Button */}
        <button
          onClick={handleDecrypt}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Decrypt and Download
        </button>

        {/* Message Display */}
        {message && (
          <p className="mt-6 text-center text-sm text-gray-600 bg-gray-100 p-2 rounded-lg">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
