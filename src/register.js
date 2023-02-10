import Handlebars from 'handlebars/dist/handlebars.runtime';
import button from './components/button.hbs';
import dialog_item from './components/dialog-item.hbs';
import right_message from './components/right-message.hbs';
import left_message from './components/left-message.hbs';
import left_message_group from './components/left-message-group.hbs';
import date_message from './components/date-message.hbs';
import member from './components/member.hbs';

export default function register() {
    Handlebars.registerPartial("button", button);
    Handlebars.registerPartial("dialog-item", dialog_item);
    Handlebars.registerPartial("left-message", left_message);
    Handlebars.registerPartial("left-message-group", left_message_group);
    Handlebars.registerPartial("right-message", right_message);
    Handlebars.registerPartial("date-message", date_message);
    Handlebars.registerPartial("member", member);
}
