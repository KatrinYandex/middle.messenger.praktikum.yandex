import Component from "../../../../utils/Component";
import template from "./dialod.hbs";
import {Button} from "../../../../components/Button";
import {RightMessage} from "../../../../components/RightMessage";
import {LeftMessage} from "../../../../components/LeftMessage";
import {Input} from "../../../../components/Input";
import {ClickableLabel} from "../../../../components/ClickableLabel";
import {ChatSettings} from "../ChatSettings";
import ChatController from "../../../../controllers/ChatController";
import store from "../../../../utils/Store";
import MessagesController from "../../../../controllers/MessagesController";
import {Container} from "../../../../components/Container";

interface DialogProps {
    name: string,
    id: number | string,
    messages?: any[]
}
export class Dialog extends Component {
    constructor(props: DialogProps) {
        super('div', props);
    }

    init() {
        const that = this;
        this.children.messageContainer = new Container();
        this.drawMessages();

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
                click: (e) => {
                    e?.preventDefault();
                    const message = that.children.messageInput.inputValue;
                    MessagesController.sendMessage(this.props.id, message);
                    // @ts-ignore
                    document.getElementsByName('message')[0].value = '';
                }
            }
        })
        this.children.add = new ClickableLabel({
            label: '⋮',
            class: '',
            events: {
                click: () => {
                    const container = document.getElementById('dialog-space');
                    ChatController.getUsers({id: this.props.id}).
                    then(() => {
                        console.log(store.getState().chat, this.props.name)
                        const settings = new ChatSettings({
                            name: this.props.name,
                            users: store.getState().chat ? store.getState().chat!.users : [
                                {name: 'test', id: 1},
                                {name: 'tesrr', id: 2}
                            ],
                            id: this.props.id
                        })
                        if (container) {
                            container.appendChild(settings.getContent());
                        }
                    })
                }
            }
        })

        this.children.messageInput = new Input({
            class: 'message-input',
            name: 'message',
            placeholder: 'Введите сообщение...',
            value : ''
        })
    }

    private drawMessages() {
        this.props.messages = store.getState().messages![this.props.id]
        if (this.props.messages && this.props.messages.length > 0) {
            const userId = store.getState().user!.data!.id;
            this.props.messages.forEach((message: any) => {
                if (userId === message.user_id) {
                    const temp = new RightMessage({
                        text: message.content,
                        time: message.time.substring(11, 16)
                    }).getContent();

                    this.children.messageContainer.getContent().appendChild(temp);
                }
                else {
                    const temp = new LeftMessage({
                        text: message.content,
                        time: message.time.substring(11, 16)
                    }).getContent();

                    this.children.messageContainer.getContent().appendChild(temp);
                }
            })
        }
    }
    render() {
        return this.compile(template, this.props);
    }
}

// const DialogComponent = withStore(state => {
//     return {
//         messages: state.messages
//     }
// })
//
// export const DialogPart = DialogComponent(Dialog);
