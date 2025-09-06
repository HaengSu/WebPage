import {request} from './apiClient';

export function getUsers() {
    return request('/auth/users');
}

export function registerUser(user) {
    return request('/auth/register', {
        method : 'POST',
        body : JSON.stringify(user)
    });
}