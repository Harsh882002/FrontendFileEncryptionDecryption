
import axios from 'axios'

const App_URL = "http://localhost:8080/file-encryption"

export const uploadFile = async (file) =>{
    const formData = new FormData();
    formData.append("file", file);

    return axios.post(App_URL, formData,{
        headers: { "Content-Type": "multipart/form-data" }
    })
};

export const encryptFile = async(file) =>{
    const formData = new FormData();
    formData.append("file", file);

    try{
    const response = await axios.post(`${App_URL}/encrypt`, formData,{
        headers:{ "Content-Type" : "multipart/form-data" }
    });

    const encryptionKey = response.headers.get("Encryption-Key");
    console.log("Received Encryption Key:", encryptionKey); 
     

    // Return the encrypted file (as a blob) and the encryption key
    const encryptedFile = response.data;
    return { encryptedFile, encryptionKey };

}catch (error) {
    console.error("Error encrypting the file:", error);
    throw error;  // Propagate error to be handled later
  }
};

export const decryptFile = async (file, key) =>{
    const formData = new FormData();
     formData.append("file", file);
     formData.append("key", key);

     return axios.post(`${App_URL}/decrypt`, formData, {
        headers: { "Content-Type" : "multipart/form-data" }
     });
};
