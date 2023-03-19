import AuthAPI from "../api/AuthAPI";
import {SigninData, SignupData} from "../types";
import store from "../utils/Store";
import Router from "../utils/Router";

class AuthController {
    private api: AuthAPI;
    constructor() {
        this.api = new AuthAPI();
    }
    async signup(data: SignupData) {
        try {
            const result = await this.api.signup(data);
            if (result.status === 200) {
                await this.user();
                Router.go('/messenger');
            }
            else {
                console.log(result);
            }
        } catch (e) {
            store.set('user.error', e.message);
        }
    }

    async signin(data: SigninData) {
        try {
            const result = await this.api.signin(data);
            if (result.status === 200) {
                await this.user().then(() => {Router.go('/messenger')});
            }
            else if (result.status === 400) {
                await this.user().then(() => {Router.go('/messenger')});
            }
        } catch (e) {
            store.set('user.error', e.message);
        }
    }

    async logout() {
        try {
            await this.api.logout();
            store.set('user.data', undefined)
            Router.go('/');
        } catch (e) {
            store.set('user.error', e.message);
        }
    }

    async user() {
        try {
            await this.api.user()
                .then((data: any) => {
                    store.set('user.data', JSON.parse(data.response));
                })
        } catch (e) {
            throw new Error(e);
        }
    }
}

export default new AuthController();
