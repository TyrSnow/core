"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
const chai_1 = require("chai");
require("mocha");
describe('Test generate_sault', () => {
    it('should return a hex number string, and it\'s length is bigger or equal 64. ', () => {
        const result = util_1.generate_sault();
        chai_1.assert.isString(result);
        chai_1.assert.match(result, /^[\da-fA-F]{64,}$/);
    });
    it('should return a string with seed string before it when a seed argument passed into.', () => {
        const result = util_1.generate_sault('test');
        chai_1.assert.isString(result);
        chai_1.assert.match(result, /^test[\da-fA-F]{60,}$/);
    });
    it('should return normally when called it 10000 in 100ms.', () => {
        let arr = [];
        let timeStart = new Date().getMilliseconds();
        for (let i = 0; i < 10000; i++) {
            arr.push(util_1.generate_sault());
        }
        let timeEnd = new Date().getMilliseconds();
        chai_1.expect(arr.length).equal(10000);
        chai_1.expect(timeEnd - timeStart).lessThan(100);
    });
});
describe('Test hash_password', () => {
});
//# sourceMappingURL=util.spec.js.map