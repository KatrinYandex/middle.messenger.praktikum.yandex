import Component from "../../../../utils/Component";
import template from "./chat-settings.hbs";
import {Button} from "../../../../components/Button";
import {Input} from "../../../../components/Input";
import ChatController from "../../../../controllers/ChatController";
import Router from "../../../../utils/Router";
import UserController from "../../../../controllers/UserController";
import {Container} from "../../../../components/Container";
import {Member} from "../../../../components/Member";
// import {Member} from "../../../../components/Member";

interface ChatSettingsProps {
    name: string,
    id: any,
    users?: Record<string, any>[]
}
export class ChatSettings extends Component {
    constructor(props: ChatSettingsProps) {
        super('div', props);
    }

    init() {
        const that = this;
        this.children.saveButton = new Button({
            label: 'Сохранить',
            type: 'submit',
            class: 'button-green button-filled-bordered',
            events: {
                click: () => {
                    if (this.props.id === '') {
                        const title = that.children.chatNameInput.inputValue;
                        ChatController.create(title);
                    }

                    // const users = this.children.memberContainer.getContent();
                    // console.log(users)
                    // // @ts-ignore
                    // for (const child of users.children) {
                    //     console.log(child.id)
                    // }

                    Router.go('/messenger')
                }
            }
        })
        this.children.backButton = new Button({
            label: 'Назад',
            type: 'button',
            class: 'button-white button-empty-bordered',
            events: {
                click: () => {
                    const settings = document.getElementById('chat-settings');
                    if (settings) {
                        settings.remove()
                    }
                }
            }
        })
        this.children.member = new Member({
            name: '2222', id: 1, chatId: this.id
        })

        if (this.props.id !== '') {
            this.children.deleteButton = new Button({
                label: 'Удалить чат',
                type: 'button',
                class: 'button-white button-empty-bordered',
                events: {
                    click: () => {
                        ChatController.deleteChat({chatId: this.props.id})

                        Router.go('/messenger')
                    }
                }
            })

            this.children.memberContainer = new Container();

            if (this.props.users && this.props.users.length > 0) {
                this.props.users.forEach((user: Record<string, any>) => {
                    that.children.memberContainer.getContent().appendChild(
                        new Member({
                            name: user.first_name + ' ' + user.second_name,
                            id: user.id,
                            chatId: this.id
                        }).getContent()
                    )
                })
            }
            this.children.addMemberInput = new Input({
                class: 'add-new-member',
                name: 'add-member',
                placeholder: 'Поиск...',
                value : '',
                events: {
                    change: async () => {
                        const user = await UserController.search({login: 'Amirika18'});
                        if (user.length > 0) {
                            const addUser = {id: user[0].id, name: user[0].first_name};
                            that.children.memberContainer.getContent().appendChild(
                                new Member({
                                    name: addUser.name,
                                    id: addUser.id,
                                    chatId: this.id
                                }).getContent()
                            )
                            ChatController.addUser({users: [addUser.id], chatId: this.props.id})
                        }
                        else {
                            that.children.memberContainer.getContent().appendChild(that.children.member.getContent())
                        }
                    }
                }
            })
        }

        this.children.chatNameInput = new Input({
            class: 'chat-settings__name',
            name: 'add-member',
            placeholder: 'Введите название чата',
            value : this.props.name
        })
    }

    render() {
        return this.compile(template, this.props);
    }
}
