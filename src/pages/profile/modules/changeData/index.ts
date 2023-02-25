import Component from "../../../../utils/Component";
import {Button} from "../../../../components/Button";
import template from "./change-data.hbs";
import {ProfileData} from "../../../../types";
import {Input} from "../../../../components/Input";
import inputCheck from "../../../../utils/inputCheck";
import Block from "../../../../utils/Component";

function checkError(field: Block, type: string): boolean {
    const check = inputCheck(field.inputValue, type);
    if (!check) {
        field.element.classList.add('error');
    }
    return check
}

export class ChangeData extends Component {
    constructor(props: ProfileData) {
        super('div', props);
    }

    init() {
        const that = this;

        this.children.saveButton = new Button({
            label: 'Сохранить',
            type: 'submit',
            class: 'button-green button-filled-bordered',
            events: {
                click: (event) => {
                    event!.preventDefault();

                    const email = that.children.emailInput;
                    const login = that.children.loginInput;
                    const firstName = that.children.firstNameInput;
                    const secondName = that.children.secondNameInput;
                    const nickName = that.children.nickNameInput;
                    const phone = that.children.phoneInput;

                    const emailCheck = checkError(email, 'email');
                    const loginCheck = checkError(login, 'login');
                    const firstNameCheck = checkError(firstName, 'name');
                    const secondNameCheck = checkError(secondName, 'name');
                    const nickNameCheck = checkError(nickName, 'login');
                    const phoneCheck = checkError(phone, 'phone');

                    if (emailCheck && loginCheck && firstNameCheck && secondNameCheck && nickNameCheck && phoneCheck) {
                        console.log(email.inputValue, login.inputValue, firstName.inputValue, secondName.inputValue,
                            nickName.inputValue, phone.inputValue);
                    }
                }
            }
        })

        this.children.emailInput = new Input({
            class: 'form__item__data-edit',
            name: 'email',
            placeholder: '',
            value : this.props.email,
            events: {
                focus: () => {
                    that.children.emailInput.element.classList.remove('error');
                },
                blur () {
                    const emailInput = that.children.emailInput;
                    checkError(emailInput, 'email');
                }
            }
        })

        this.children.loginInput = new Input({
            class: 'form__item__data-edit',
            name: 'login',
            placeholder: '',
            value : this.props.login,
            events: {
                focus: () => {
                    that.children.loginInput.element.classList.remove('error');
                },
                blur () {
                    const loginInput = that.children.loginInput;
                    checkError(loginInput, 'login');
                }
            }
        })
        this.children.firstNameInput = new Input({
            class: 'form__item__data-edit',
            name: 'first_name',
            placeholder: '',
            value : this.props.first_name,
            events: {
                focus: () => {
                    that.children.firstNameInput.element.classList.remove('error');
                },
                blur () {
                    const firstNameInput = that.children.firstNameInput;
                    checkError(firstNameInput, 'name');
                }
            }
        })
        this.children.secondNameInput = new Input({
            class: 'form__item__data-edit',
            name: 'second_name',
            placeholder: '',
            value : this.props.second_name,
            events: {
                focus: () => {
                    that.children.secondNameInput.element.classList.remove('error');
                },
                blur () {
                    const secondNameInput = that.children.secondNameInput;
                    checkError(secondNameInput, 'name');
                }
            }
        })
        this.children.nickNameInput = new Input({
            class: 'form__item__data-edit',
            name: 'nick_name',
            placeholder: '',
            value : this.props.nick_name,
            events: {
                focus: () => {
                    that.children.nickNameInput.element.classList.remove('error');
                },
                blur () {
                    const nickNameInput = that.children.nickNameInput;
                    checkError(nickNameInput, 'login');
                }
            }
        })
        this.children.phoneInput = new Input({
            class: 'form__item__data-edit',
            name: 'phone',
            placeholder: '',
            value : this.props.phone,
            events: {
                focus: () => {
                    that.children.phoneInput.element.classList.remove('error');
                },
                blur () {
                    const phoneInput = that.children.phoneInput;
                    checkError(phoneInput, 'phone');
                }
            }
        })
    }

    render() {
        return this.compile(template, this.props);
    }
}
