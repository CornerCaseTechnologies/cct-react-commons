import {Cookies} from 'react-cookie';

export function getCookie(cookieName) {
    const cookies = new Cookies();

    return cookies.get(cookieName);
}

export function setCookie(cookieName, value) {
    const cookies = new Cookies();

    return cookies.set(cookieName, value);
}
