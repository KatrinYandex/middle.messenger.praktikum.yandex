import Component from "../../utils/Component";
import template from "./input.hbs";

interface InputProps {
    name: string,
    class: string,
    placeholder: string,
    value?: string,
    additionalClass?: string,
    type?: string,
    events?: {
        blur?: () => void,
        focus?: () => void
    }
}

export class Input extends Component {
    constructor(props: InputProps) {
        super('div', props);
    }


    render() {
        return this.compile(template, this.props);
    }
}
