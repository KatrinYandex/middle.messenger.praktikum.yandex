import Component from "../../utils/Component";
import template from "./container.hbs";

export class Container extends Component {
    constructor() {
        super('div', {});
    }

    render() {
        return this.compile(template, {});
    }
}
