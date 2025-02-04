import React, { useState } from "react";
import { motion } from "framer-motion";

function FileUpload() {
  const [fileToEncrypt, setFileToEncrypt] = useState(null);
  const [fileToDecrypt, setFileToDecrypt] = useState(null);
  const [encryptionKey, setEncryptionKey] = useState("");
  const [message, setMessage] = useState("");

  const handleFileEncryptChange = (e) => setFileToEncrypt(e.target.files[0]);
  const handleFileDecryptChange = (e) => setFileToDecrypt(e.target.files[0]);

  const handleEncrypt = async () => {
    if (!fileToEncrypt) {
      alert("Please select a file to encrypt.");
      return;
    }
    setMessage("Encrypting file...");
    // Simulating encryption for demo purposes
    setTimeout(() => {
      setMessage("File encrypted successfully! Encryption key: 12345");
    }, 2000);
  };

  const handleDecrypt = async () => {
    if (!fileToDecrypt || !encryptionKey) {
      alert("Please select a file and enter the encryption key.");
      return;
    }
    setMessage("Decrypting file...");
    setTimeout(() => {
      setMessage("File decrypted successfully!");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient">
      <motion.div
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          File Encryption/Decryption
        </h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select File to Encrypt
          </label>
          <input
            type="file"
            onChange={handleFileEncryptChange}
            className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEncrypt}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-200 mb-6"
        >
          Encrypt and Download
        </motion.button>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Enter Encryption Key for Decryption
          </label>
          <input
            type="text"
            value={encryptionKey}
            onChange={(e) => setEncryptionKey(e.target.value)}
            placeholder="Enter Encryption Key"
            className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Select File to Decrypt
          </label>
          <input
            type="file"
            onChange={handleFileDecryptChange}
            className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-green-500"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleDecrypt}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          Decrypt and Download
        </motion.button>

        {message && (
          <motion.p
            className="mt-6 text-center text-sm text-gray-700 bg-gray-100 p-3 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default FileUpload;
