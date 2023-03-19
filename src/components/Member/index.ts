import Component from "../../utils/Component";
import template from "./member.hbs";
import {ClickableLabel} from "../ClickableLabel";

interface MemberProps {
    name: string,
    id: number | string
}
export class Member extends Component {
    constructor(props: MemberProps) {
        super('div', props);
    }

    init() {
        this.children.deleteLabel = new ClickableLabel({
            label: '🗑',
            class: 'member-delete',
            events: {
                click: () => {
                    const obj = document.querySelector(`#${this.props.id}`);
                    if (obj) obj.remove();
                }
            }
        })
    }
    render() {
        return this.compile(template, this.props);
    }
}
