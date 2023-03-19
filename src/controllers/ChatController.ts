import store from "../utils/Store";
import ChatAPI from "../api/ChatAPI";
import {ChatFilter} from "../types";

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
            if ((result as any).response === 200) {
                await this.getChats({});
            }
        } catch (e) {
            store.set('user.error', e);
        }
    }
}

export default new ChatController();
