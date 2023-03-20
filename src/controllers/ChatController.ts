import store from "../utils/Store";
import ChatAPI from "../api/ChatAPI";
import {ChatFilter} from "../types";
import MessagesController from "./MessagesController";

class ChatController {
    private api: ChatAPI;
    constructor() {
        this.api = new ChatAPI();
    }
    async getChats(data: ChatFilter) {
        try {
            const result = await this.api.getChats(data);
            if ((result as any).status === 200) {
                store.set('chats', JSON.parse((result as any).response))
                store.getState().chats!.map(async (chat) => {
                    await this.getToken({chatId: chat.id})
                    await MessagesController.connect(chat.id, store.getState().token![chat.id])
                });
            }
            else {
                console.log(result);
            }
        } catch (e) {
            store.set('user.error', e.message);
        }
    }

    async create(title: string) {
        try {
            const result = await this.api.create(title);
            if ((result as any).status === 200) {
                await this.getChats({});
            }
        } catch (e) {
            store.set('user.error', e);
        }
    }

    async getUsers(data: {id: any}) {
        try {
            const result = await this.api.getUsers(data);
            if ((result as any).status === 200) {
                store.set('chat.users', JSON.parse((result as any).response))
            }
        } catch (e) {
            console.log(e);
        }
    }

    async getUsersforChat(data: {id: any}) {
        try {
            const result = await this.api.getUsers(data);
            if ((result as any).status === 200) {
                return JSON.parse((result as any).response)
            }
        } catch (e) {
            console.log(e);
        }
    }

    async addUser(data: { users: any[], chatId: any }) {
        try {
            const result = await this.api.addUser(data);
            if ((result as any).status === 200) {
                await this.getUsers(data.chatId);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async deleteUser(data: { users: any[], chatId: any }) {
        try {
            const result = await this.api.deleteUser(data);
            if ((result as any).status === 200) {
                await this.getUsers(data.chatId);
            }
        } catch (e) {
            console.log(e);
        }
    }

    async deleteChat(data: { chatId: any }) {
        try {
            const result = await this.api.deleteChat(data);
            if ((result as any).status === 200) {
                await this.getChats({});
            }
        } catch (e) {
            console.log(e);
        }
    }

    async avatar(data: FormData) {
        try {
            await this.api.avatar(data);
        } catch (e) {
            console.log(e);
        }
    }

    async getToken(data: { chatId: number }) {
        try {
            const result = await this.api.getToken(data);
            if ((result as any).status === 200) {
                store.set(`token.${data.chatId}`, JSON.parse(result.response).token)
            }
        } catch (e) {}
    }
}

export default new ChatController();
