import { request } from './apiClient';

export function loginUser(user) {
    return request('/api/v1/auth/login', {
        method : 'POST',
        body : JSON.stringify(user)
    });
}