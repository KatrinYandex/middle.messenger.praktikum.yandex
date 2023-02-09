import Handlebars from 'handlebars/dist/handlebars.runtime';
import button from './partials/button.hbs';
import dialog_item from './partials/dialog-item.hbs';
import right_message from './partials/right-message.hbs';
import left_message from './partials/left-message.hbs';
import left_message_group from './partials/left-message-group.hbs';
import date_message from './partials/date-message.hbs';
import member from './partials/member.hbs';

export default function register() {
    Handlebars.registerPartial("button", button);
    Handlebars.registerPartial("dialog-item", dialog_item);
    Handlebars.registerPartial("left-message", left_message);
    Handlebars.registerPartial("left-message-group", left_message_group);
    Handlebars.registerPartial("right-message", right_message);
    Handlebars.registerPartial("date-message", date_message);
    Handlebars.registerPartial("member", member);
}