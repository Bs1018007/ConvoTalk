import CryptoJS from "crypto-js";

const ENCRYPT_KEY = import.meta.env.VITE_ENCRYPTION_KEY;

export const encryptData = (text) =>{
    return CryptoJS.AES.encrypt(text,ENCRYPT_KEY).toString();
};

export const decryptData = (cipher) =>{
    const bytes = CryptoJS.AES.decrypt(cipher,ENCRYPT_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};
