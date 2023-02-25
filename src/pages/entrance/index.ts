import Component from "../../utils/Component";
import template from "./entrance-view.hbs";
import {Button} from "../../components/Button";
import {Registration} from "../registration";
import {DialogPage} from "../messenger";
import {Input} from "../../components/Input";
import inputCheck from "../../utils/inputCheck";
import Block from "../../utils/Component";

function checkError(field: Block, type: string): boolean {
    const check = inputCheck(field.inputValue, type);
    if (!check) {
        field.element.classList.add('error');
    }
    return check
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
                click: (event) => {
                    const login = that.children.loginInput;
                    const password = that.children.passwordInput;
                    const loginCheck = checkError(login, 'login');
                    const passwordCheck = checkError(password, 'password');
                    if (loginCheck && passwordCheck) {
                        console.log(login.inputValue, password.inputValue)

                        const dialog = new DialogPage({
                            name: "Vitali Gregor",
                            src: '',
                            label: 'Выберите диалог'
                        })

                        const element = document.querySelector("#main");
                        while (element!.firstChild) {
                            element!.removeChild(element!.firstChild);
                        }
                        element!.appendChild(dialog.element);
                    }
                    else {
                        event!.preventDefault();
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
                    console.log('Зарегестрироваться')

                    const registration = new Registration();
                    const element = document.querySelector("#main");
                    while (element!.firstChild) {
                        element!.removeChild(element!.firstChild);
                    }
                    element!.appendChild(registration.element);
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
