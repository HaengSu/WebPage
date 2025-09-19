import { BorderAll } from "@mui/icons-material";
import { request } from "./apiClient";

export function getAllBookmarks() {
    return request('/api/v1/bookmarks/', {
        method : 'GET',
    });
}

export function patchBookamrk(userId) {
    return request(`/api/v1/bookmarks/${userId}`, {
        method : 'PATCH'
    });
}

export function updateBookamrk(bookmark) {
    return request('/api/v1/bookmarks/', {
        method : 'POST',
        body : JSON.stringify(bookmark)
    });
}

export function deleteBookmark(bookmarkId) {
    return request(`/api/v1/bookmarks/${bookmarkId}`, {
        method : 'DELETE',
    });
}