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

export function updateUserLevel(user) {
    console.log('new level = ',user.level);
    return request(`/auth/user?email=${encodeURIComponent(user.email)}`, {
        method : 'PATCH',
        body : JSON.stringify({level : user.level}),
    });
}