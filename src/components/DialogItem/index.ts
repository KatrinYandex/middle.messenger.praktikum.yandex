import Component from "../../utils/Component";
import template from "./dialog-item.hbs";

export interface DialogItemProps {
    id: number,
    src: string | null | undefined,
    name_message: string | null | undefined,
    date: string | null | undefined,
    message: string | null | undefined,
    style: string,
    count:number,
    events: {
        click: () => void
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
