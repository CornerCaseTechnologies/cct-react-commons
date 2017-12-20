export function storeToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage['token'] || null;
}

export function removeToken() {
  localStorage.removeItem('token');
}
