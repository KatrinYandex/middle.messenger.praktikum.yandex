import BaseAPI from "./BaseAPI";
import {SigninData} from "../types";
import {SignupData} from "../types";
export default class AuthAPI extends BaseAPI {
    constructor() {
        super('/auth');
    }

    signup(data: SignupData) {
        return this.http.post('/signup', {data: data, headers: {'Content-Type': 'application/json'}});
    }

    signin(data: SigninData) {
        return this.http.post('/signin', {data: data});
    }

    user() {
        return this.http.get('/user');
    }

    logout() {
        return this.http.post('/logout');
    }

    create = undefined;
    delete = undefined;
    read = undefined;
    update = undefined;
}
