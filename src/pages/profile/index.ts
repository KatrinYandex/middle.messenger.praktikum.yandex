import Component from "../../utils/Component";
import template from "./profile-view.hbs";
import {Button} from "../../components/Button";
import {ProfileData} from "../../types";
import {withStore} from "../../utils/Store";
import Router from "../../utils/Router";
import AuthController from "../../controllers/AuthController";
import ChatController from "../../controllers/ChatController";

class Profile extends Component {
    constructor(props: ProfileData) {
        super('div', props);
    }

    init() {
        this.props.avatar = 'https://ya-praktikum.tech/api/v2/resources/' + this.props.avatar;
        this.children.changeDataButton = new Button({
            label: 'Изменить данные',
            type: 'button',
            class: 'button-green button-filled-bordered',
            events: {
                click: () => {
                    Router.go('/profile_settings')
                }
            }
        })
        this.children.changePasswordButton = new Button({
            label: 'Изменить пароль',
            type: 'button',
            class: 'button-green button-filled-bordered',
            events: {
                click: () => {
                    Router.go('/change_password')
                }
            }
        })
        this.children.backButton = new Button({
            label: 'Назад к мессенджеру',
            type: 'button',
            class: 'button-white button-empty-bordered',
            events: {
                click: () => {
                    ChatController.getChats({});
                    Router.go('/messenger');
                }
            }
        })
        this.children.exitButton = new Button({
            label: 'Выйти',
            type: 'button',
            class: 'button-white button-empty-bordered',
            events: {
                click: () => {
                    AuthController.logout().then(() => {
                        Router.go('/');
                    })
                }
            }
        })
    }

    render() {
        return this.compile(template, this.props);
    }
}

export const ProfilePage = withStore((state) => {
    if (state.user) return state.user.data
    else return {}
})(Profile)
