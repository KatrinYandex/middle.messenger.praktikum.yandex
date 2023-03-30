import { expect } from 'chai';
import { set } from './Helpers';

describe('Method set', () => {
    const path = 'path';
    const value = 'value';
    let obj: Record<string, any>;

    beforeEach(() => {
        obj = {};
    });

    it('should set a value by path into the object', () => {
        set(obj, path, value);
        expect(obj).to.haveOwnProperty(path, value);
    });

    it('should return original object', () => {
        const result = set(obj, path, value);
        obj['anotherPath'] = 'anotherValue';
        expect(result).to.equal(obj);
    });

    it('should return original object if this object is not an object', () => {
        const notAnObject = 'string';
        const result = set(notAnObject, path, value);
        expect(result).to.eq(notAnObject);
    });

    it('should return an error if path is not a string', () => {
        const pathNotAString = 10;
        // @ts-ignore
        const fake = () => set(obj, pathNotAString, value);
        expect(fake).to.throw(Error);
    });
});
