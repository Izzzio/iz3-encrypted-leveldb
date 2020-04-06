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

class Cache {

    /**
     * 
     * @param {array} keyRules 
     */
    constructor(keyRules = []) {
        this.data = {};
        this.keyRules = keyRules;

    }

    /**
     * 
     * @param {string} key 
     */
    _ckeckRule(key) {
        return this.keyRules.includes(key);
    }

    /**
     * 
     * @param {string} key 
     * @return {any}
     */
    get(key) {
        if (!this._ckeckRule(key)) {
            return false;
        }
        return this.data[key] || null;
    }

    /**
     * 
     * @param {string} key 
     * @param {string|object} value 
     * @return {boolean}
     */
    put(key, value) {
        if (!this._ckeckRule(key)) {
            return false;
        }
        this.data[key] = value;
        return true;
    }


}

module.exports = Cache;