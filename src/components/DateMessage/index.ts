import Component from "../../utils/Component";
import template from "./date-message.hbs";

interface DateProps {
    date: string
}
export class DateMessage extends Component {
    constructor(props: DateProps) {
        super('div', props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
