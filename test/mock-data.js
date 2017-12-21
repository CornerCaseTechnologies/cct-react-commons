export function addHeaders(options) {
    let headers = {};

    if (Object.prototype.toString.call(options.body) !== '[object FormData]') {
        headers['Content-Type'] = 'application/json';
    }

    const result = options;
    result.headers = headers;

    return result;
}
