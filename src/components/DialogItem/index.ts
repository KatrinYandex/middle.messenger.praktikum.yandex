import Component from "../../utils/Component";
import template from "./dialog-item.hbs";

interface DialogItemProps {
    id: string,
    src: string,
    name_message: string,
    date: string,
    message: string,
    style: string,
    count:number,
    events: {
        click: () => void
        //openDialog
    }
}
export class DialogItem extends Component {
    constructor(props: DialogItemProps) {
        super('div', props);
    }

    render() {
        return this.compile(template, this.props);
    }
}
