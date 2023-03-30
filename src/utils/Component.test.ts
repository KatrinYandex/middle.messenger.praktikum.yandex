import proxyquire from 'proxyquire';
import { expect } from 'chai';
import sinon from 'sinon';
import type BlockType from './Component'

const eventBusMock = {
    on: sinon.stub(),
    emit: sinon.stub(),
}

const { default: Block } = proxyquire('./Component', {
    './EventBus': {
        EventBus: class {
            emit = eventBusMock.emit;
            on = eventBusMock.on;
        }
    }
}) as { default: typeof BlockType };

describe('Block', () => {
    beforeEach(() => {
        eventBusMock.emit.reset();
        eventBusMock.on.reset();
    })
    class FakeComponent extends Block {}

    it('should call init event on initialization',  () => {
        new FakeComponent();
        expect(eventBusMock.emit.calledWith('init')).to.eq(true);
    });

    it('should call protected method ComponentDidMount on event dispatch', () => {
        let isCalled = false;

        class FakeClass extends Block{
            componentDidMount() {
                isCalled = true;
            }
        }

        const fakeObject = new FakeClass();
        fakeObject.componentDidMount();

        expect(isCalled).to.eq(true);
    })

    it('should call protected method ComponentDidUpdate on event dispatch', () => {
        let isCalled = false;

        class FakeClass extends Block{
            // @ts-ignore
            componentDidUpdate<P extends Record<string, any> = any>(oldP: P, newP: P) {
                isCalled = true;
                return true;
            }
        }

        const fakeObject = new FakeClass();
        fakeObject.componentDidUpdate({}, {});

        expect(isCalled).to.eq(true);
    })
});
