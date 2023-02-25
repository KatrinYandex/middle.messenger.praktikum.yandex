import Component from "../../utils/Component";
import template from "./messenger-view.hbs";
import {DialogItem} from "../../components/DialogItem";
import {Dialog} from "./modules/Dialog";
import {Input} from "../../components/Input";
import {ClickableLabel} from "../../components/ClickableLabel";
import {Profile} from "../profile";
import {ProfileData} from "../../types";
import {ChatSettings} from "./modules/ChatSettings";

interface DialogProps {
    name: string,
    src: string,
    label: string
}

function openDialog(dialogName: string): void {
    const dialog = new Dialog({
        name: dialogName
    })
    console.log(dialog)
    const element = document.querySelector("#dialog-space");
    while (element!.firstChild) {
        element!.removeChild(element!.firstChild);
    }
    element!.appendChild(dialog.element)
}

function openSettings(chatName: string): void {
    const settings = new ChatSettings({name: chatName})
    const element = document.querySelector("#dialog-space");
    while (element!.firstChild) {
        element!.removeChild(element!.firstChild);
    }
    element!.appendChild(settings.element)
}

function openProfile(data: ProfileData): void {
    const profile = new Profile(data);
    const element = document.querySelector("#main");
    while (element!.firstChild) {
        element!.removeChild(element!.firstChild);
    }
    element!.appendChild(profile.element)
}

export class DialogPage extends Component {
    constructor(props: DialogProps) {
        super('div', props);
    }

    init() {
        this.children.profileLabel = new ClickableLabel({
            label: this.props.name,
            class: 'profile__name',
            events: {
                click: () => {
                    openProfile({
                        img: '',
                        name: this.props.name,
                        email: 'email',
                        login: 'login',
                        first_name: this.props.name,
                        second_name: this.props.name,
                        nick_name: this.props.name,
                        phone: 'string'
                    });
                }
            }
        })
        this.children.createChatLabel = new ClickableLabel({
            label: 'Создать чат',
            class: 'info__create-chat',
            events: {
                click: () => {
                    openSettings('Some Name');
                }
            }
        })
        this.children.dialogItem1 = new DialogItem({
            src: '',
            id: '1',
            name_message: 'Юрий Вадимов',
            date: '10:03',
            message: 'Сообщение важное очень, зайти пж на сайт наш, глянь..',
            count: 0,
            style: 'message__count-0',
            events: {
                click: () => {
                    openDialog('Юрий Вадимов')
                    console.log('Зарегестрироваться')
                }
            }
        })
        this.children.dialogItem2 = new DialogItem({
            src: '',
            id: '1',
            name_message: 'Юрий Вадимов',
            date: '10:05',
            message: 'Сообщение важное очень, зайти пж на сайт наш, глянь..',
            count: 5,
            style: 'message__count-1',
            events: {
                click: () => {
                    openDialog('Юрий Вадимов')
                    console.log('Зарегестрироваться')
                }
            }
        })
        this.children.infoInput = new Input({
            class: 'info__search',
            name: 'search',
            placeholder: 'Поиск...',
            value : ''
        })

        this.dispatchComponentDidMount()
    }
    render() {
        return this.compile(template, this.props);
    }
}
