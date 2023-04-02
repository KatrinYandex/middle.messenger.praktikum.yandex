import store from "./Store";
import {expect} from "chai";

describe('Store', () => {
    it('should set an object by path into storage', () => {
        const path = 'currentChat';
        const value = 'chat';

        store.set(path, value);

        expect(store.getState().currentChat).to.be.eq(value)
    })
})
