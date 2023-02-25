import Component from "../../../../utils/Component";
import template from "./chat-settings.hbs";
import {Button} from "../../../../components/Button";
import {Input} from "../../../../components/Input";
import {Member} from "../../../../components/Member";

interface ChatSettingsProps {
    name: string
}
export class ChatSettings extends Component {
    constructor(props: ChatSettingsProps) {
        super('div', props);
    }

    init() {
        this.children.saveButton = new Button({
            label: 'Сохранить',
            type: 'submit',
            class: 'button-green button-filled-bordered',
            events: {
                click: () => {}
            }
        })
        this.children.member1 = new Member({
            name: 'Vita'
        })
        this.children.member2 = new Member({
            name: 'Vita'
        })
        this.children.member3 = new Member({
            name: 'Vita'
        })
        this.children.addMemberInput = new Input({
            class: 'add-new-member',
            name: 'add-member',
            placeholder: 'Поиск...',
            value : ''
        })
        this.children.chatNameInput = new Input({
            class: 'chat-settings__name',
            name: 'add-member',
            placeholder: 'Поиск...',
            value : 'SomeName'
        })
    }

    render() {
        return this.compile(template, this.props);
    }
}
