import AuthAPI from "./AuthAPI";
import {expect} from "chai";
describe('AuthAPI', () => {
    const authAPI = new AuthAPI();

    it('should create and return an instance of AuthAPI after call', () => {
        expect(authAPI).to.be.instanceof(AuthAPI);
    });

    it('should make a POST request to /signin and return Promise object', () => {
        const data = {login: 'John', email: 'john@example.com', password: 'password'};

        const response = authAPI.signin(data);

        expect(response).to.be.instanceof(Promise);
    });

    it('should make a GET request to /user and return Promise object', () => {
        const response = authAPI.user();

        expect(response).to.be.instanceof(Promise);
    });

    it('should make a POST request to /logout and return Promise object', () => {
        const response = authAPI.logout();

        expect(response).to.be.instanceof(Promise);
    });

    it('should make a POST request to /signup and return Promise object', () => {
        const data = {first_name: 'John', second_name: 'Doe', phone: '+79111111111', login: 'John', email: 'john@example.com', password: 'password'};

        const response = authAPI.signup(data);

        expect(response).to.be.instanceof(Promise);
    });
});
