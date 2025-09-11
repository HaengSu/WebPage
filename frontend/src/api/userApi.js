import { request } from './apiClient';

export function getUsers(user) {
    return request(`/api/v1/users/${encodeURIComponent(user.email)}`);
}

export function registerUser(user) {
    return request('/api/v1/users', {
        method: 'POST',
        body: JSON.stringify(user)
    });
}

export function updateUserLevel(user) {
    console.log('new level = ',user.level);
    return request(`/api/v1/users/${encodeURIComponent(user.email)}`, {
        method : 'PATCH',
        body : JSON.stringify({level : user.level}),
    });
}


export function deleteUser(user) {
    return request(`/api/v1/users/${encodeURIComponent(user.email)}`, {
        method : 'DELETE',
        body : JSON.stringify({level : user.level}),
    });
}
