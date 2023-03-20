import {PasswordData, ProfileChangingData} from "../types";
import store from "../utils/Store";
import Router from "../utils/Router";
import UserAPI from "../api/UserAPI";
import AuthController from "./AuthController";

class UserController {
    private api: UserAPI;
    constructor() {
        this.api = new UserAPI();
    }
    async profile(data: ProfileChangingData) {
        try {
            const result = await this.api.profile(data);
            if (result.status === 200) {
                await AuthController.user().then(() => {
                    Router.back();
                })
            }
            else {
                console.log(result);
            }
        } catch (e) {
            store.set('user.error', e.message);
        }
    }

    async password(data: PasswordData) {
        try {
            const result = await this.api.password(data);
            if (result.status === 200) {
                await AuthController.user().then(() => {
                    Router.back();
                })
            }
        } catch (e) {
            store.set('user.error', e.message);
        }
    }

    async avatar(data: FormData) {
        try {
            const result = await this.api.avatar(data);
            if (result.status === 200) {
                return JSON.parse(result.response).avatar;
            }
            // Router.go('/');
        } catch (e) {
            store.set('user.error', e.message);
        }
    }

    async search(data: {login: string}) {
        try {
            const result = await this.api.search(data);
            if ((result as any).status === 200) {
                console.log(JSON.parse((result as any).response))
                return JSON.parse((result as any).response)
            }
        } catch (e) {}
    }
}

export default new UserController();
