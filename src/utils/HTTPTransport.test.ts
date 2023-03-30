import sinon, { SinonFakeXMLHttpRequest, SinonFakeXMLHttpRequestStatic } from 'sinon';
import { expect } from 'chai';
import HTTPTransport from "./HTTPTransport";
describe('HTTPTransport class', () => {
    let xhr: SinonFakeXMLHttpRequestStatic;
    let instance: HTTPTransport;
    const requests: SinonFakeXMLHttpRequest[] = [];

    beforeEach(() => {
        xhr = sinon.useFakeXMLHttpRequest();

        // @ts-ignore
        global.XMLHttpRequest = xhr;

        xhr.onCreate = ((request: SinonFakeXMLHttpRequest) => {
            requests.push(request);
        });

        instance = new HTTPTransport('/');
    })

    afterEach(() => {
        requests.length = 0;
    })

    it('.get should make GET request', () =>{
        instance.get('');

        expect(requests[0].method.toUpperCase()).to.eq('GET');
    })

    it('.post should make POST request', () =>{
        instance.post('');

        expect(requests[0].method.toUpperCase()).to.eq('POST');
    })

    it('.put should make PUT request', () =>{
        instance.put('');

        expect(requests[0].method.toUpperCase()).to.eq('PUT');
    })

    it('.delete should make DELETE request', () =>{
        instance.delete('');

        expect(requests[0].method.toUpperCase()).to.eq('DELETE');
    })
})
