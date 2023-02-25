import Component from "../../../../utils/Component";
import {Button} from "../../../../components/Button";
import template from "./change-password.hbs";
import {Input} from "../../../../components/Input";
import {checkErrorProfile} from "../../../../utils/errors";

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
                    event!.preventDefault();
                    const oldPassword = that.children.oldPassword;
                    const newPassword = that.children.newPassword;
                    const repeatPassword = that.children.repeatPassword;

                    const repeatPasswordCheck = checkErrorProfile(repeatPassword, 'password');
                    const oldPasswordCheck = checkErrorProfile(oldPassword, 'password');
                    const newPasswordCheck = checkErrorProfile(newPassword, 'password');

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
                    if (document.getElementById(`error${that.children.oldPassword.id}`)) {
                        document.getElementById(`error${that.children.oldPassword.id}`)!.remove();
                    }
                },
                blur () {
                    const oldPassword = that.children.oldPassword;
                    checkErrorProfile(oldPassword, 'password');
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
                    if (document.getElementById(`error${that.children.newPassword.id}`)) {
                        document.getElementById(`error${that.children.newPassword.id}`)!.remove();
                    }
                },
                blur () {
                    const newPassword = that.children.newPassword;
                    checkErrorProfile(newPassword, 'password');
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
                    if (document.getElementById(`error${that.children.repeatPassword.id}`)) {
                        document.getElementById(`error${that.children.repeatPassword.id}`)!.remove();
                    }
                },
                blur () {
                    const repeatPassword = that.children.repeatPassword;
                    checkErrorProfile(repeatPassword, 'password');
                }
            }
        })
    }

    render() {
        return this.compile(template, {});
    }
}
