import Component from "../../utils/Component";
import template from "./right-message.hbs";

interface MessageProps {
    text: string,
    time: string
}
export class RightMessage extends Component {
    constructor(props: MessageProps) {
        super('div', props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
