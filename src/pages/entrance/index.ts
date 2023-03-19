import Component from "../../utils/Component";
import template from "./entrance-view.hbs";
import {Button} from "../../components/Button";
import {Input} from "../../components/Input";
import {checkError} from "../../utils/errors";
import AuthController from "../../controllers/AuthController";
import store from "../../utils/Store";
import Router from "../../utils/Router";

async function userLogin(login: string, password: string) {
    await AuthController.signin({login: login, password: password})
}
export class Entrance extends Component {
    constructor() {
        super('div');
    }

    init() {
        const that = this;
        this.children.entranceButton = new Button({
            label: 'Войти',
            type: 'submit',
            class: 'button-green button-filled',
            events: {
                click: async (event) => {
                    event!.preventDefault();
                    const login = that.children.loginInput;
                    const password = that.children.passwordInput;
                    const loginCheck = checkError(login, 'login');
                    const passwordCheck = checkError(password, 'password');
                    if (loginCheck && passwordCheck) {
                        event!.preventDefault();
                        await userLogin(login.inputValue, password.inputValue).then(() => {
                            if (store.getState().user && store.getState().user!.data!.id) {
                                //
                            }
                            else {}
                        });
                    }
                }
            }
        })

        this.children.registerButton = new Button({
            label: 'Зарегестрироваться',
            type: 'button',
            class: 'button-white button-empty',
            events: {
                click: () => {
                    Router.go('/register')
                }
            }
        })

        this.children.loginInput = new Input({
            class: 'form__input',
            name: 'login',
            placeholder: 'Введите логин',
            value : '',
            events: {
                focus: () => {
                    that.children.loginInput.element.classList.remove('error');
                    if (document.getElementById(`error${that.children.loginInput.id}`)) {
                        document.getElementById(`error${that.children.loginInput.id}`)!.remove();
                    }
                },
                blur () {
                    const loginInput = that.children.loginInput;
                    checkError(loginInput, 'login');
                }
            }
        });

        this.children.passwordInput = new Input({
            class: 'form__input',
            name: 'password',
            type: 'password',
            placeholder: 'Введите пароль',
            value : '',
            events: {
                focus: () => {
                    that.children.passwordInput.element.classList.remove('error');
                },
                blur () {
                    const passwordInput = that.children.passwordInput;
                    checkError(passwordInput, 'password');
                }
            }
        })
    }

    render() {
        return this.compile(template, {});
    }
}
