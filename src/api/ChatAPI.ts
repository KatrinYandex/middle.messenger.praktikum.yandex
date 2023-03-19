import BaseAPI from "./BaseAPI";
import {ChatFilter} from "../types";
export default class ChatAPI extends BaseAPI {
    constructor() {
        super('/chats');
    }

    getChats(data: ChatFilter) {
        return this.http.get('/', {data: data});
    }

    create(title: string) {
        return this.http.post('/', {data: {title: title}})
    };
    delete = undefined;
    read = undefined;
    update = undefined;
}
