import Component from "../../utils/Component";
import template from "./button.hbs";

interface ButtonProps {
    label: string,
    class: string,
    type: string,
    additionalClass?:string,
    events: {
        click: (event?: Event) => void
    }
}
export class Button extends Component {
    constructor(props: ButtonProps) {
        super('div', props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
