import CryptoJS from "crypto-js";

const ENCRYPT_KEY = process.env.ENCRYPTION_KEY;

export const encryptData = (text) =>{
    return CryptoJS.AES.encrypt(text,ENCRYPT_KEY).toString();
};

export const decryptData = (text) =>{
    const bytes = CryptoJS.AES.decrypt(cipher,ENCRYPT_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
};
