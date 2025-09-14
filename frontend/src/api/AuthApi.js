import { request } from './apiClient';

export function loginUser(user) {
    return request('/api/v1/auth/login', {
        method : 'POST',
        body : JSON.stringify(user),
        credentials: "include"
    });
}

// 로그인 상태 확인
export function checkUser() {
  return request("/api/v1/auth/check", {
    method: "GET",
    credentials: "include" //  세션 쿠키 포함
  });
}

// 로그아웃
export function logoutUser() {
  return request("/api/v1/auth/logout", {
    method: "POST",
    credentials: "include" //  세션 쿠키 포함
  });
}