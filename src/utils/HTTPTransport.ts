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
    console.log(props.slice(0, -1))
    return props.slice(0, -1)
  }
  else return ''
}

class HTTPTransport {
    get = (url: string, options: any) => {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    post = (url: string, options: any) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    put = (url: string, options: any) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    delete = (url: string, options: any) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    request = (url: string, options: any, timeout: number = 5000) => {
        console.log(timeout)
        const {data, headers} = options;
        return new Promise((resolve: (value: unknown) => void, reject: (value: unknown) => void) => {
            const xhr = new XMLHttpRequest();
            if (headers) {
                Object.keys(headers).forEach((key) => {
                    xhr.setRequestHeader(`${key}`, headers[key]);
                })
            }
            if (data && options.method === METHODS.GET) {
                const dataSend = queryStringify(data)
                xhr.open(options.method, url + dataSend);
            } else {
                xhr.open(options.method, url);
            }

            xhr.onload = function (): void {
                resolve(xhr);
            };

            xhr.timeout = options.timeout;
            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

        if (options.method === METHODS.GET || !data) {
          xhr.send();
        }
        else {
          xhr.send(JSON.stringify(data));
        }
      })
    };
}
