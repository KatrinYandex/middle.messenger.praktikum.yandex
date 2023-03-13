import Component from "../../utils/Component";
import template from "./label.hbs";

interface LabelProps {
    label: string,
    class: string,
    events: {
        click: () => void;
    }
}
export class ClickableLabel extends Component {
    constructor(props: LabelProps) {
        super('div', props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
