import Component from "../../../../utils/Component";
import template from "./dialod.hbs";
import {Button} from "../../../../components/Button";
import {RightMessage} from "../../../../components/RightMessage";
import {LeftMessage} from "../../../../components/LeftMessage";
import {DateMessage} from "../../../../components/DateMessage";
import {Input} from "../../../../components/Input";

interface DialogProps {
    name: string
}
export class Dialog extends Component {
    constructor(props: DialogProps) {
        super('div', props);
    }

    init() {
        this.children.addButton = new Button({
            label: '+',
            type: 'button',
            class: 'button-green button-filled_circle',
            events: {
                click: () => {}
            }
        })
        this.children.sendButton = new Button({
            label: '➤',
            type: 'submit',
            class: 'button-green button-filled_circle',
            events: {
                click: () => {}
            }
        })
        this.children.dateMessage = new DateMessage({
            date: 'Today'
        })
        this.children.leftMessage = new LeftMessage({
            text: 'Hello',
            time: '10:03'
        })
        this.children.rightMessage = new RightMessage({
            text: 'Hello, bro?',
            time: '10:05'
        })
        this.children.messageInput = new Input({
            class: 'message-input',
            name: 'message',
            placeholder: 'Введите сообщение...',
            value : ''
        })
    }

    render() {
        return this.compile(template, this.props);
    }
}
