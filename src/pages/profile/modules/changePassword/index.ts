import Component from "../../../../utils/Component";
import {Button} from "../../../../components/Button";
import template from "./change-password.hbs";
import {Input} from "../../../../components/Input";
import Block from "../../../../utils/Component";
import inputCheck from "../../../../utils/inputCheck";

function checkError(field: Block, type: string): boolean {
    const check = inputCheck(field.inputValue, type);
    if (!check) {
        field.element.classList.add('error');
    }
    return check
}

export class ChangePassword extends Component {
    constructor() {
        super('div');
    }

    init() {
        const that = this;

        this.children.saveButton = new Button({
            label: 'Сохранить',
            type: 'submit',
            class: 'button-green button-filled-bordered',
            events: {
                click: (event) => {
                    event.preventDefault();
                    const oldPassword = that.children.oldPassword;
                    const newPassword = that.children.newPassword;
                    const repeatPassword = that.children.repeatPassword;

                    const repeatPasswordCheck = checkError(repeatPassword, 'password');
                    const oldPasswordCheck = checkError(oldPassword, 'password');
                    const newPasswordCheck = checkError(newPassword, 'password');

                    if (repeatPasswordCheck && oldPasswordCheck && newPasswordCheck) {
                        console.log(oldPassword.inputValue, newPassword.inputValue, repeatPassword.inputValue)
                    }
                }
            }
        })
        this.children.oldPassword = new Input({
            class: 'change-password__item__data',
            name: 'oldPassword',
            type: 'password',
            placeholder: 'Old password',
            events: {
                focus: () => {
                    that.children.oldPassword.element.classList.remove('error');
                },
                blur () {
                    const oldPassword = that.children.oldPassword;
                    checkError(oldPassword, 'password');
                }
            }
        })
        this.children.newPassword = new Input({
            class: 'change-password__item__data',
            name: 'newPassword',
            type: 'password',
            placeholder: 'New password',
            events: {
                focus: () => {
                    that.children.newPassword.element.classList.remove('error');
                },
                blur () {
                    const newPassword = that.children.newPassword;
                    checkError(newPassword, 'password');
                }
            }
        })
        this.children.repeatPassword = new Input({
            class: 'change-password__item__data',
            name: 'repeatPassword',
            type: 'password',
            placeholder: 'Repeat password',
            events: {
                focus: () => {
                    that.children.repeatPassword.element.classList.remove('error');
                },
                blur () {
                    const repeatPassword = that.children.repeatPassword;
                    checkError(repeatPassword, 'password');
                }
            }
        })
    }

    render() {
        return this.compile(template, {});
    }
}
