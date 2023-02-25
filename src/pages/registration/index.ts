import Component from "../../utils/Component";
import template from "./registration-view.hbs";
import {Button} from "../../components/Button";
import {Entrance} from "../entrance";
import {Input} from "../../components/Input";
import {DialogPage} from "../messenger";
import {checkError} from "../../utils/errors";

export class Registration extends Component {
    constructor() {
        super('div');
    }

    init() {
        const that = this;
        this.children.entranceButton = new Button({
            label: 'Войти',
            type: 'button',
            class: 'button-white button-empty',
            events: {
                click: () => {
                    console.log('Войти')

                    const entrance = new Entrance();
                    const element = document.querySelector("#main");
                    while (element!.firstChild) {
                        element!.removeChild(element!.firstChild);
                    }
                    element!.appendChild(entrance.element);
                }
            }
        })
        this.children.registerButton = new Button({
            label: 'Зарегестрироваться',
            type: 'submit',
            class: 'button-green button-filled',
            events: {
                click: (event) => {
                    event!.preventDefault();
                    const email = that.children.emailInput;
                    const login = that.children.loginInput;
                    const firstName = that.children.firstNameInput;
                    const secondName = that.children.secondNameInput;
                    const phone = that.children.phoneInput;
                    const password = that.children.passwordInput;
                    const passwordAgain = that.children.passwordAgainInput;

                    const emailCheck = checkError(email, 'email');
                    const loginCheck = checkError(login, 'login');
                    const firstNameCheck = checkError(firstName, 'name');
                    const secondNameCheck = checkError(secondName, 'name');
                    const phoneCheck = checkError(phone, 'phone');
                    const passwordCheck = checkError(password, 'password');
                    const passwordAgainCheck = checkError(passwordAgain, 'password');

                    if (emailCheck && loginCheck && firstNameCheck && secondNameCheck && phoneCheck && passwordCheck
                        && passwordAgainCheck) {
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

                        console.log(login.inputValue, email.inputValue, firstName.inputValue, secondName.inputValue,
                            phone.inputValue, password.inputValue, passwordAgain.inputValue);
                    }
                }
            }
        })
        this.children.emailInput = new Input({
            class: 'form__input',
            name: 'email',
            placeholder: 'Введите почту',
            value : '',
            events: {
                focus: () => {
                    that.children.emailInput.element.classList.remove('error');
                    if (document.getElementById(`error${that.children.emailInput.id}`)) {
                        document.getElementById(`error${that.children.emailInput.id}`)!.remove();
                    }
                },
                blur () {
                    const emailInput = that.children.emailInput;
                    checkError(emailInput, 'email');
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
        })
        this.children.firstNameInput = new Input({
            class: 'form__input',
            name: 'first_name',
            placeholder: 'Введите имя',
            value : '',
            events: {
                focus: () => {
                    that.children.firstNameInput.element.classList.remove('error');
                    if (document.getElementById(`error${that.children.firstNameInput.id}`)) {
                        document.getElementById(`error${that.children.firstNameInput.id}`)!.remove();
                    }
                },
                blur () {
                    const firstNameInput = that.children.firstNameInput;
                    checkError(firstNameInput, 'name');
                }
            }
        })
        this.children.secondNameInput = new Input({
            class: 'form__input',
            name: 'second_name',
            placeholder: 'Введите фамилию',
            value : '',
            events: {
                focus: () => {
                    that.children.secondNameInput.element.classList.remove('error');
                    if (document.getElementById(`error${that.children.secondNameInput.id}`)) {
                        document.getElementById(`error${that.children.secondNameInput.id}`)!.remove();
                    }
                },
                blur () {
                    const secondNameInput = that.children.secondNameInput;
                    checkError(secondNameInput, 'name');
                }
            }
        })
        this.children.phoneInput = new Input({
            class: 'form__input',
            name: 'phone',
            placeholder: 'Введите телефон',
            value : '',
            events: {
                focus: () => {
                    that.children.phoneInput.element.classList.remove('error');
                    if (document.getElementById(`error${that.children.phoneInput.id}`)) {
                        document.getElementById(`error${that.children.phoneInput.id}`)!.remove();
                    }
                },
                blur () {
                    const phoneInput = that.children.phoneInput;
                    checkError(phoneInput, 'phone');
                }
            }
        })
        this.children.passwordInput = new Input({
            class: 'form__input',
            name: 'password',
            type: 'password',
            placeholder: 'Введите пароль',
            value : '',
            events: {
                focus: () => {
                    that.children.passwordInput.element.classList.remove('error');
                    if (document.getElementById(`error${that.children.passwordInput.id}`)) {
                        document.getElementById(`error${that.children.passwordInput.id}`)!.remove();
                    }
                },
                blur () {
                    const passwordInput = that.children.passwordInput;
                    checkError(passwordInput, 'password');
                }
            }
        })
        this.children.passwordAgainInput = new Input({
            class: 'form__input',
            name: 'password2',
            type: 'password',
            placeholder: 'Введите пароль еще раз',
            value : '',
            events: {
                focus: () => {
                    that.children.passwordAgainInput.element.classList.remove('error');
                    if (document.getElementById(`error${that.children.passwordAgainInput.id}`)) {
                        document.getElementById(`error${that.children.passwordAgainInput.id}`)!.remove();
                    }
                },
                blur () {
                    const passwordAgainInput = that.children.passwordAgainInput;
                    checkError(passwordAgainInput, 'password');
                }
            }
        })
    }

    render() {
        return this.compile(template, {});
    }
}
