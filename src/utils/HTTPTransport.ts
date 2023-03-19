const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

function queryStringify(data: any): string {
  if (data) {
    let props = "?";
    Object.keys(data).forEach((key) => {
        let tempProp = `${key}=${data[key]}&`;
        props = props + tempProp;
    })
    return props.slice(0, -1)
  }
  else return ''
}

export default class HTTPTransport {
    static API_URL = 'https://ya-praktikum.tech/api/v2';
    protected endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = HTTPTransport.API_URL + endpoint;
    }

    public get<Response>(path: string = '/', data?: any): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: METHODS.GET,
            options: data
        });
    };

    public post<Response = any>(path: string, data?: any): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: METHODS.POST,
            options: data,
        });
    };

    public put<Response = any>(path: string, data?: any): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: METHODS.PUT,
            options: data
        });
    };

    public delete<Response = any>(path: string, data?: any): Promise<Response> {
        return this.request<Response>(this.endpoint + path, {
            method: METHODS.DELETE,
            options: data
        });
    };

    private request<Response>(url: string, options?: any): Promise<Response> {
        let data: any;
        let headers: any;
        if (options && options.options) {
            data = options.options.data;
            headers = options.options.headers;
        }

        return new Promise<Response>((resolve: (value: any) => any, reject: (value: unknown) => void) => {
            const xhr = new XMLHttpRequest();

            if (data && options.method === METHODS.GET) {
                const dataSend = queryStringify(data)
                xhr.open(options.method, url + dataSend);
            } else {
                xhr.open(options.method, url);
            }

            if (headers) {
                Object.keys(headers).forEach((key) => {
                    xhr.setRequestHeader(key, headers[key]);
                })
            }
            else if (data instanceof FormData) {
                console.log(data.get('avatar'))
            }
            else {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }

            xhr.withCredentials = true;

            if (options.method === METHODS.GET || !data) {
                xhr.send();
            }
            else if (data instanceof FormData) {
                console.log(data.get('avatar'))
                xhr.send(data)
            }
            else {
                xhr.send(JSON.stringify(data));
            }

            xhr.onload = function (): void {
                resolve(xhr);
            };
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;
      })
    };
}
