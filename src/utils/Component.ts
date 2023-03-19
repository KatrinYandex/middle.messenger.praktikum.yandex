import { EventBus } from "./EventBus";
import { nanoid } from 'nanoid';

class Block<P extends Record<string, any> = any> {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render",
        FLOW_CWU: "flow:component-will-unmount"
    } as const;

    public id = nanoid(6);
    protected props: P;
    public children: Record<string, Block>;
    private eventBus: () => EventBus;
    private _element: HTMLElement | null = null;
    private _meta: { tagName: string; props: P; };

    /** JSDoc
     * @param propsWithChildren
     * @returns {void}
     * @param tagName
     * @param propsWithChildren
     */
    constructor(tagName = "div", propsWithChildren: any = {}) {
        const eventBus = new EventBus();
        const { props, children } = this._getChildrenAndProps(propsWithChildren);
        this._meta = {
            tagName,
            props
        };

        this.children = children;
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _getChildrenAndProps(childrenAndProps: P): { props: P, children: Record<string, Block>} {
        const props: Record<string, unknown> = {};
        const children: Record<string, Block> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key as string] = value;
            } else {
                props[key] = value;
            }
        });

        return { props: props as P, children };
    }

    private _addEvents(): void {
        const {events = {}} = this.props as P & { events: Record<string, () => void> };

        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    private _removeEvents(): void {
        const events = this.props.events;
        if (events) {
            Object.keys(events).forEach(eventName => {
                this._element?.removeEventListener(eventName, events[eventName]);
            });
        }
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    }

    private _createResources(): void {
        const { tagName } = this._meta;
        this._element = this._createDocumentElement(tagName);
    }

    private _init(): void {
        this._createResources();
        this.init();
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init(): void {}

    private _componentDidMount(): void {
        this.componentDidMount();
    }

    componentDidMount(): void {}

    public dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

    private _componentDidUpdate(oldProps: P, newProps: P) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: P, newProps: P): boolean {
        console.log(oldProps, newProps);
        return true;
    }

    private _componentWillUnmount(): void {
        this._removeEvents();
        this.componentWillUnmount();
    }

    protected componentWillUnmount(): void {}

    public dispatchComponentWillUnmount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CWU);
        Object.values(this.children).forEach(child => child.dispatchComponentWillUnmount());
    }

    setProps = (nextProps: P) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement {
        return this._element!;
    }

    get inputValue(): string {
        return (this._element as HTMLInputElement).value;
    }

    get labelValue(): string | null {
        return (this._element as HTMLElement).textContent;
    }

    private _render(): void {
        const fragment = this.render();
        this._removeEvents();
        const newElement = fragment.firstElementChild as HTMLElement;
        if (this._element) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
    }

    protected compile(template: (context: any) => string, context: any): any {
        const contextAndStubs = { ...context };
        Object.entries(this.children).forEach(([name, component]) => {
            contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
        });

        const html = template(contextAndStubs);
        const temp = document.createElement('template');
        temp.innerHTML = html;
        Object.entries(this.children).forEach(([_, component]) => {
            const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
            if (!stub) {
                return;
            }

            component.getContent()?.append(...Array.from(stub.childNodes));
            stub.replaceWith(component.getContent()!);
        });
        return temp.content;
    }

    protected render(): DocumentFragment {
        return new DocumentFragment();
    }

    public getContent(): HTMLElement {
        return this.element!;
    }

    private _makePropsProxy(props: any): any {
        const self = this;

        return new Proxy(props, {
            get(target, prop: string) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop: string, value) {
                const oldTarget = { ...target }
                target[prop as keyof P] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty() {
                throw new Error("Нет доступа");
            }
        });
    }

    private _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }
}

export default Block;
