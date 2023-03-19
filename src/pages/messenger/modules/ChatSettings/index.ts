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
    name: string
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
                    const title = that.children.chatNameInput.inputValue;
                    // ChatController.create(title);

                    const users = this.children.memberContainer.getContent();
                    console.log(users)

                    Router.go('/messenger')
                }
            }
        })

        this.children.memberContainer = new Container();

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
                                id: addUser.id
                            }).getContent()
                        )

                    }
                }
            }
        })
        this.children.chatNameInput = new Input({
            class: 'chat-settings__name',
            name: 'add-member',
            placeholder: 'Введите название чата',
            value : ''
        })
    }

    render() {
        return this.compile(template, this.props);
    }
}
