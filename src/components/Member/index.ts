import Component from "../../utils/Component";
import template from "./member.hbs";

interface MemberProps {
    name: string
}
export class Member extends Component {
    constructor(props: MemberProps) {
        super('div', props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
