import Component from "../../utils/Component";
import template from "./messenger-view.hbs";
import {Input} from "../../components/Input";
import {ClickableLabel} from "../../components/ClickableLabel";
import {ChatSettings} from "./modules/ChatSettings";
import store, {withStore} from "../../utils/Store";
import Router from "../../utils/Router";
import {Chat} from "../../types";
import {DialogItem} from "../../components/DialogItem";
import {Container} from "../../components/Container";
import {Dialog} from "./modules/Dialog";

interface DialogProps {
    user: {
        first_name: string,
        avatar?: string,
        label?: string
    },
    currentChat: any,
    chats: Chat[] | any
}

function openSettings(chatName: string): void {
    const settings = new ChatSettings({name: chatName, id: '', img: ''})
    const element = document.querySelector("#dialog-space");
    while (element!.firstChild) {
        element!.removeChild(element!.firstChild);
    }
    element!.appendChild(settings.element)
}

export class DialogPage extends Component {
    constructor(props: DialogProps) {
        super('div', props);
    }
    // @ts-ignore
    protected componentDidUpdate(oldProps: any, newProps: any): boolean {
        this.children.dialogContainer.getContent().innerHTML = '';
        if (this.props.chats && this.props.chats.length > 0 && store.getState().chats && store.getState().chats!.length > 1) {
            if (Array.isArray(this.props.chats)) {
                this.props.chats.forEach((chat: Chat) => {
                    this.children.dialogContainer.getContent().appendChild(new DialogItem({
                        img: chat.avatar,
                        id: chat.id,
                        date: chat.last_message ? chat.last_message.time.substring(11, 16) : '',
                        name_message: chat.title ? chat.title : (chat.last_message ? chat.last_message.user.first_name: chat.title),
                        message: chat.last_message ? chat.last_message.user.first_name + ': ' + chat.last_message.content : '',
                        count: chat.unread_count,
                        style: chat.unread_count === 0 ? 'message__count-0' : 'message__count-1',
                        events: {
                            click: () => {
                                this.children.messengerContainer = new Dialog({
                                    name: chat.title,
                                    id: chat.id,
                                    img: chat.avatar
                                })
                                store.set('currentChat', chat.id);
                            }
                        }
                    }).getContent())
                })
            }
            else {
                const chat = this.props.chats
                this.children.dialogContainer.getContent().appendChild(new DialogItem({
                    img: chat.avatar,
                    id: chat.id,
                    date: chat.last_message ? chat.last_message.time.substring(11, 16) : '00:00',
                    name_message: chat.title ? chat.title : (chat.last_message ? chat.last_message.user.first_name: chat.title),
                    message: chat.last_message ? chat.last_message.user.first_name + ': ' + chat.last_message.content : 'someone',
                    count: chat.unread_count,
                    style: chat.unread_count === 0 ? 'message__count-0' : 'message__count-1',
                    events: {
                        click: () => {
                            this.children.messengerContainer = new Dialog({
                                name: chat.title,
                                id: chat.id,
                                img: 'chat.avatar'
                            })
                            store.set('currentChat', chat.id);
                        }
                    }
                }).getContent())
            }
        }
        return true
    }

    drawDialogs() {

    }
    init() {
        this.children.profileLabel = new ClickableLabel({
            label: this.props.user ? this.props.user.first_name : '',
            class: 'profile__name',
            events: {
                click: () => {
                    Router.go('/profile')
                }
            }
        })
        this.children.createChatLabel = new ClickableLabel({
            label: 'Создать чат',
            class: 'info__create-chat',
            events: {
                click: () => {
                    openSettings('');
                }
            }
        })

        this.children.infoInput = new Input({
            class: 'info__search',
            name: 'search',
            placeholder: 'Поиск...',
            value : ''
        })

        this.children.dialogContainer = new Container();
        this.dispatchComponentDidMount()
    }

    render() {
        return this.compile(template, this.props);
    }
}

export const MessengerPage = withStore((state) => {
    if (state.user) return {user: state.user.data, chats: state.chats, currentChat: state.currentChat}
    else return {}
})(DialogPage)

