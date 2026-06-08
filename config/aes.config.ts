export const aesConfig = {
    IV: process.env.AES_IV as string,
    KEY: process.env.AES_KEY as string,
};

export default aesConfig;
