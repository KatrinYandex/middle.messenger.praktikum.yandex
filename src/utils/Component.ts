import { EventBus } from "./EventBus";
import { nanoid } from "nanoid";

class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    public id = nanoid(6);
    protected props: any;
    public children: Record<string, Block>;
    private eventBus: () => EventBus;
    private _element: HTMLElement | null = null;
    private _meta: { tagName: string; props: any; };

    /** JSDoc
     * @param {string} tagName
     * @param propsWithChildren
     * @returns {void}
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

    private _getChildrenAndProps(childrenAndProps: any): any {
        const props: Record<string, any> = {};
        const children: Record<string, Block> = {};

        Object.entries(childrenAndProps).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value;
            } else {
                props[key] = value;
            }
        });

        return { props, children };
    }

    private _addEvents(): void {
        const {events = {}} = this.props as { events: Record<string, () =>void> };

        Object.keys(events).forEach(eventName => {
            this._element?.addEventListener(eventName, events[eventName]);
        });
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
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

    private _componentDidUpdate(oldProps: any, newProps: any): void {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        return true;
    }

    setProps = (nextProps: any) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element(): HTMLElement {
        return this._element;
    }

    get inputValue(): string {
        return (this._element as HTMLInputElement).value;
    }

    get labelValue(): string {
        return (this._element as HTMLElement).textContent;
    }

    private _render(): void {
        const fragment = this.render();
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

    protected getContent(): HTMLElement {
        return this.element;
    }

    private _makePropsProxy(props: any): any {
        const self = this;

        return new Proxy(props, {
            get(target, prop) {
                const value = target[prop];
                return typeof value === "function" ? value.bind(target) : value;
            },
            set(target, prop, value) {
                const oldTarget = { ...target }
                target[prop] = value;
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
