import {BlockConstructable} from "../types";
import sinon from "sinon";
import Router from "./Router";
import {expect} from "chai";
import {afterEach} from "mocha";

describe('Router', () => {
    let originalBack = global.window.history.back;
    let originalForward = global.window.history.forward;

    const getContentFake = sinon.fake.returns(document.createElement('div'));
    const FakeBlock = class { getContent = getContentFake; } as unknown as BlockConstructable;

    beforeEach(() => {
        getContentFake.callCount = 0;

        global.window.history.back = () => {
            if (typeof window.onpopstate === 'function') {
                window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
            }
        };

        global.window.history.forward = () => {
            if (typeof window.onpopstate === 'function') {
                window.onpopstate({currentTarget: window} as unknown as PopStateEvent);
            }
        }
    })

    afterEach(() => {
        global.window.history.back = originalBack;
        global.window.history.forward = originalForward;
    })

    it('method .use() should return instance of Router', () => {
        const result = Router.use('/', FakeBlock);
        expect(result).to.eq(Router);
    });

    it('method .back() should render a page on history back action', () => {
        Router
            .use('/', FakeBlock)
            .start();

        Router.back();

        expect(getContentFake.callCount).to.eq(2);
    });

    it('should render start page', () => {
        Router
            .use('/', FakeBlock)
            .start();

        expect(getContentFake.callCount).to.eq(1);
    });
})
