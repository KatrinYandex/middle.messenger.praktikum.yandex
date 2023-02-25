import Component from "../../../utils/Component";
import template from "./error-50x.hbs";
import {Button} from "../../../components/Button";

interface ErrorProps {
    code: string,
}
export class Error50xPage extends Component {
    constructor(props: ErrorProps) {
        super('div', props);
    }

    init() {
        this.children.backButton = new Button({
            label: 'Назад к мессенджеру',
            class: 'button-empty-bordered button-white',
            type: 'button',
            events: {
                click: () => {}
            }
        })
    }

    render() {
        return this.compile(template, this.props);
    }
}
