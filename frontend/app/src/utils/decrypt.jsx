export const decryptData = (encryptedData) => {
    try {
      const decodedData = atob(encryptedData);  // ✅ atob() decodes base64 to normal string
      return decodedData;
    } catch (error) {
      console.error("Failed to decrypt data:", error);
      return null;
    }
  };
  