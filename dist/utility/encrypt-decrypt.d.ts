declare class EncryptDecryptClass {
    private AES_METHOD;
    private IV_LENGTH;
    private SALTROUNDS;
    private KEY;
    private IV;
    constructor();
    encrypt(text: string): string;
    decrypt(text: string): string | null;
    encryptBcrypt(pass: string): string;
    checkBcrypt(text: string, hash: string): Promise<boolean>;
    generateCode(digit?: number): string;
}
export default EncryptDecryptClass;
//# sourceMappingURL=encrypt-decrypt.d.ts.map