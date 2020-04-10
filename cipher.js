
/**
 iZ³ | Izzzio blockchain - https://izzz.io

 Copyright 2018 Izio LLC (OOO "Изио")

 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at

 http://www.apache.org/licenses/LICENSE-2.0

 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

class Cipher {

    /**
     * Cipher class is layer module 
     * @param {*} crypyoModule - Crypto module 
     * @param {string} salt  - Key salt
     */
    constructor(crypyoModule, salt) {
        this.crypto = crypyoModule;
        this.iv = Buffer.alloc(16, 0);
        this.salt = salt;
    }

    /**
     * Private method for password hashing
     * @param {string} password 
     * @return {string|null}
     */
    _passwordHash(password) {
        try {
            return this.crypto.createHash('sha256').update(password).digest('hex');
        } catch (err) {
            console.error('_passwordHash Error:', err);
            return null;
        }
    }

    /**
     * Private method that creates a key from a password and salt
     * @param {string} password  - is required
     * @return {string|null}
     */
    _key(password) {
        try {
            return this.crypto.scryptSync(this._passwordHash(password), this.salt, 32);
        } catch (err) {
            console.error('_key Error:', err);
            return null;
        }
    }

    /**
     * Method encrypts input data
     * @param {string} password  - is required
     * @param {string} data  - is required
     * @return {string|null}
     */
    encrypt(password, data) {
        try {
            const key = this._key(password);
            const encryptedData = this.crypto.createCipheriv('aes-256-cbc', key, this.iv);
            let encrypted = encryptedData.update(data, 'utf8', 'hex');
            encrypted += encryptedData.final('hex');
            return encrypted;
        } catch (err) {
            console.error('encrypt Error:', err);
            return null;
        }
    }

    /**
     * Method decrypts input data
     * @param {string} password - password is required
     * @param {string} data - data is required
     * @return {string|null}
     */
    decrypt(password, data) {
        try {
            const key = this._key(password);
            const decryptedData = this.crypto.createDecipheriv('aes-256-cbc', key, this.iv);
            let decrypted = decryptedData.update(data, 'hex', 'utf8');
            decrypted += decryptedData.final('utf-8');
            return decrypted;
        } catch (err) {
            console.error('decrypt Error:', err);
            return null;
        }
    }
}

module.exports = Cipher;