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

    getUsers(data: {id: any}) {
        return this.http.get(`/${data.id}/users`, {data: data});
    }

    addUser( data: {users: any[], chatId: any}) {
        return this.http.put('/users', {data: data});
    }

    deleteUser( data: {users: any[], chatId: any}) {
        return this.http.delete('/users', {data: data});
    }

    deleteChat( data: {chatId: any}) {
        return this.http.delete('/', {data: data});
    }


    avatar( data: FormData) {
        return this.http.put('/avatar', {data: data});
    }

    getToken( data: {chatId: any}) {
        return this.http.post(`/token/${data.chatId}`);
    }
    delete = undefined;
    read = undefined;
    update = undefined;
}
