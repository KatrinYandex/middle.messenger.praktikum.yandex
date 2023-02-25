import Component from "../../utils/Component";
import template from "./left-message-group.hbs";

interface LeftMessageGroupProps {
    name: string,
    text: string,
    time: string
}
export class LeftMessageGroup extends Component {
    constructor(props: LeftMessageGroupProps) {
        super('div', props);
    }

    init() {}

    render() {
        return this.compile(template, this.props);
    }
}
