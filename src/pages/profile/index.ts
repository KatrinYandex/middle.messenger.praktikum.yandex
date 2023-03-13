import Component from "../../utils/Component";
import template from "./profile-view.hbs";
import {Button} from "../../components/Button";
import {ProfileData} from "../../types";
import {DialogPage} from "../messenger";
import {ChangePassword} from "./modules/changePassword";
import {ChangeData} from "./modules/changeData";

function changeData(profileData: ProfileData): void {
    const data = new ChangeData(profileData);
    const element = document.querySelector("#main");
    while (element!.firstChild) {
        element!.removeChild(element!.firstChild);
    }
    element!.appendChild(data.element)
}

function changePassword(): void {
    const password = new ChangePassword();
    const element = document.querySelector("#main");
    while (element!.firstChild) {
        element!.removeChild(element!.firstChild);
    }
    element!.appendChild(password.element)
}

function exit(): void {
    const dialog = new DialogPage({
        name: 'Someone',
        src: '',
        label: 'Выберите диалог'
    })
    const element = document.querySelector("#main");
    while (element!.firstChild) {
        element!.removeChild(element!.firstChild);
    }
    element!.appendChild(dialog.element)
}

export class Profile extends Component {
    constructor(props: ProfileData) {
        super('div', props);
    }

    init() {
        this.children.changeDataButton = new Button({
            label: 'Изменить данные',
            type: 'button',
            class: 'button-green button-filled-bordered',
            events: {
                click: () => {
                    console.log('Изменить данные')
                    changeData(this.props);
                }
            }
        })
        this.children.changePasswordButton = new Button({
            label: 'Изменить пароль',
            type: 'button',
            class: 'button-green button-filled-bordered',
            events: {
                click: () => {
                    console.log('Изменить пароль')
                    changePassword();
                }
            }
        })
        this.children.exitButton = new Button({
            label: 'Выйти',
            type: 'button',
            class: 'button-white button-empty-bordered',
            events: {
                click: () => {
                    console.log('Изменить пароль');
                    exit();
                }
            }
        })
    }

    render() {
        return this.compile(template, this.props);
    }
}
