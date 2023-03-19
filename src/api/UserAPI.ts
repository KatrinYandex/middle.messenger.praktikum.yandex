import BaseAPI from "./BaseAPI";
import {PasswordData, ProfileChangingData} from "../types";
export default class UserAPI extends BaseAPI {
    constructor() {
        super('/user');
    }

    profile(data: ProfileChangingData) {
        return this.http.put('/profile', {data: data, headers: {'Content-Type': 'application/json'}});
    }

    password(data: PasswordData) {
        return this.http.put('/password', {data: data, headers: {'Content-Type': 'application/json'}});
    }

    avatar(data: FormData) {
        return this.http.put('/profile/avatar', {data: data, headers: {'Content-Type': 'multipart/form-data'}});
    }

    search(data: {login: string}) {
        return this.http.post('/search', {data: data});
    }

    create = undefined;
    delete = undefined;
    read = undefined;
    update = undefined;
}
