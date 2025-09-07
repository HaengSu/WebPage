import { request } from './apiClient';

export function getUsers() {
    return request('/auth/users');
}

export function registerUser(user) {
    return request('/auth/register', {
        method: 'POST',
        body: JSON.stringify(user)
    });
}

export function loginUser(user) {
    return request('/auth/login', {
        method : 'POST',
        body : JSON.stringify(user)
    });
}