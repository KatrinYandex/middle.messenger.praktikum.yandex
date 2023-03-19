import Component from "../../utils/Component";
import template from "./member.hbs";
import {ClickableLabel} from "../ClickableLabel";
import ChatController from "../../controllers/ChatController";

interface MemberProps {
    name: string,
    id: number | string,
    chatId?: number | string,
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
                    const obj = document.getElementById(this.props.id);
                    if (obj) {
                        obj.remove();
                        ChatController.deleteUser({users: [this.props.id], chatId: this.props.chatId})
                    }
                }
            }
        })
    }
    render() {
        return this.compile(template, this.props);
    }
}
