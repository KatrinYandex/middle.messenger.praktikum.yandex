import {BlockConstructable, State} from "../types";
import {isEqual, set} from "./Helpers";
import {EventBus} from "./EventBus";

enum StoreEvents {
    update = 'update'
}
class Store extends EventBus {
    private state: State = {};

    set(path: string, value: any) {
        set(this.state, path, value);
        this.emit(StoreEvents.update, this.state);
    }

    getState(): State {
        return this.state;
    }
}
const store = new Store();

export const withStore = (mapStateToProps: (state: any) => any) => (Component: BlockConstructable) => {
    let previousState: any;
    return class WithStore extends Component {
        constructor(props: any) {
            previousState = mapStateToProps(store.getState());
            super({ ...props, ...previousState });
            store.on(StoreEvents.update, () => {
                const stateProps = mapStateToProps(store.getState());
                if(previousState && stateProps && isEqual(previousState, stateProps)) {
                    return;
                }
                previousState = stateProps;
                this.setProps({ ...stateProps });
            });
        }
    }
}

export default store;
