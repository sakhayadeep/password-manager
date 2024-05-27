const crypto = require("crypto");

const algorithm = process.env.CRYPTO_ALGORITHM;
const key = process.env.CRYPTO_KEY;
const hashSecret = process.env.CRYPTO_HASH_SECRET;

export const getEncryptedData = (data: string): { iv: string; encryptedData: string; } => {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encryptedData = cipher.update(data, "utf-8", "hex");
    encryptedData += cipher.final("hex");

    const base64data = Buffer.from(iv, "binary").toString("base64");
    return {
        iv: base64data,
        encryptedData
    }
}

export const getDecryptedData = (encryptedData: { iv: string; data: string; }): string => {
    const originalData = Buffer.from(encryptedData.iv, "base64");
    const decipher = crypto.createDecipheriv(algorithm, key, originalData);
    let decryptedData = decipher.update(encryptedData.data, "hex", "utf-8");
    decryptedData += decipher.final("utf8");
    return decryptedData;
}

export const getHashedData = (data: string): string => {
    const hash = crypto.createHash('sha256', hashSecret).update(data).digest("hex");
    const base64data = Buffer.from(hash, "binary").toString("base64");
    return base64data;
}
