import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import aesConfig from '../config/aes.config';

class EncryptDecryptClass {
    private AES_METHOD: string = 'aes-256-cbc';
    private IV_LENGTH: number = 16; // For AES, this is always 16, checked with php
    private SALTROUNDS: number = 10; // bcrypt
    private KEY: string;
    private IV: string;

    constructor() {
        this.KEY = aesConfig.KEY; // Must be 256 bytes (32 characters)
        this.IV = aesConfig.IV;
    }

    encrypt(text: string): string {
        if (process.versions.openssl <= '1.0.1f') {
            throw new Error('OpenSSL Version too old, vulnerability to Heartbleed');
        }

        const cipher = crypto.createCipheriv(
            this.AES_METHOD,
            Buffer.from(this.KEY),
            this.IV
        );
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        return encrypted;
    }

    decrypt(text: string): string | null {
        try {
            const decipher = crypto.createDecipheriv(
                this.AES_METHOD,
                Buffer.from(this.KEY),
                this.IV
            );
            let decrypted = decipher.update(text, 'hex', 'utf8');
            decrypted += decipher.final('utf8');

            return decrypted;
        } catch (error) {
            return null;
        }
    }

    encryptBcrypt(pass: string): string {
        return bcrypt.hashSync(pass, this.SALTROUNDS);
    }

    async checkBcrypt(text: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(text, hash.replace(/^\$2y(.+)$/i, '$2a$1'));
    }

    generateCode(digit: number = 5): string {
        let result = '';
        const characters = '0123456789';

        for (let i = 0; i < digit; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters.charAt(randomIndex);
        }

        return result;
    }
}

export default EncryptDecryptClass;
