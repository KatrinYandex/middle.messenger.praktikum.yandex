import Component from "../../../../utils/Component";
import {Button} from "../../../../components/Button";
import template from "./change-data.hbs";
import {ProfileData} from "../../../../types";
import {Input} from "../../../../components/Input";
import {checkErrorProfile} from "../../../../utils/errors";
import {withStore} from "../../../../utils/Store";
import Router from "../../../../utils/Router";
import UserController from "../../../../controllers/UserController";

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
                click: async (event) => {
                    event!.preventDefault();

                    const email = that.children.emailInput;
                    const login = that.children.loginInput;
                    const firstName = that.children.firstNameInput;
                    const secondName = that.children.secondNameInput;
                    const nickName = that.children.nickNameInput;
                    const phone = that.children.phoneInput;
                    // const formElement = document.querySelector('form');
                    const avatar = document.querySelector('#avatar')
                    let formData = new FormData()
                    if ((avatar as HTMLInputElement).files){
                        formData.append('avatar', (avatar as HTMLInputElement).files![0]);
                        await UserController.avatar(formData);
                    }

                    const emailCheck = checkErrorProfile(email, 'email');
                    const loginCheck = checkErrorProfile(login, 'login');
                    const firstNameCheck = checkErrorProfile(firstName, 'name');
                    const secondNameCheck = checkErrorProfile(secondName, 'name');
                    // const nickNameCheck = checkErrorProfile(nickName, 'login');
                    const phoneCheck = checkErrorProfile(phone, 'phone');

                    if (emailCheck && loginCheck && firstNameCheck && secondNameCheck && phoneCheck) {
                        UserController.profile({
                            first_name: firstName.inputValue,
                            second_name: secondName.inputValue,
                            display_name: nickName.inputValue ? nickName.inputValue : firstName.inputValue,
                            login: login.inputValue,
                            email: email.inputValue,
                            phone: phone.inputValue
                        })
                    }
                }
            }
        })
        this.children.backButton = new Button({
            label: 'Назад',
            type: 'button',
            class: 'button-white button-empty-bordered',
            events: {
                click: (event) => {
                    event!.preventDefault();
                    Router.back();
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
                    if (document.getElementById(`error${that.children.emailInput.id}`)) {
                        document.getElementById(`error${that.children.emailInput.id}`)!.remove();
                    }
                },
                blur () {
                    const emailInput = that.children.emailInput;
                    checkErrorProfile(emailInput, 'email');
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
                    if (document.getElementById(`error${that.children.loginInput.id}`)) {
                        document.getElementById(`error${that.children.loginInput.id}`)!.remove();
                    }
                },
                blur () {
                    const loginInput = that.children.loginInput;
                    checkErrorProfile(loginInput, 'login');
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
                    if (document.getElementById(`error${that.children.firstNameInput.id}`)) {
                        document.getElementById(`error${that.children.firstNameInput.id}`)!.remove();
                    }
                },
                blur () {
                    const firstNameInput = that.children.firstNameInput;
                    checkErrorProfile(firstNameInput, 'name');
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
                    if (document.getElementById(`error${that.children.secondNameInput.id}`)) {
                        document.getElementById(`error${that.children.secondNameInput.id}`)!.remove();
                    }
                },
                blur () {
                    const secondNameInput = that.children.secondNameInput;
                    checkErrorProfile(secondNameInput, 'name');
                }
            }
        })
        this.children.nickNameInput = new Input({
            class: 'form__item__data-edit',
            name: 'display_name',
            placeholder: '',
            value : this.props.display_name,
            events: {
                focus: () => {
                    that.children.nickNameInput.element.classList.remove('error');
                    if (document.getElementById(`error${that.children.nickNameInput.id}`)) {
                        document.getElementById(`error${that.children.nickNameInput.id}`)!.remove();
                    }
                },
                blur () {
                    // const nickNameInput = that.children.nickNameInput;
                    // checkErrorProfile(nickNameInput, 'login');
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
                    if (document.getElementById(`error${that.children.phoneInput.id}`)) {
                        document.getElementById(`error${that.children.phoneInput.id}`)!.remove();
                    }
                },
                blur () {
                    const phoneInput = that.children.phoneInput;
                    checkErrorProfile(phoneInput, 'phone');
                }
            }
        })
    }

    render() {
        return this.compile(template, this.props);
    }
}

export const ChangeDataPage = withStore((state) => {
    if (state.user) return state.user.data
    else return {}
})(ChangeData)
