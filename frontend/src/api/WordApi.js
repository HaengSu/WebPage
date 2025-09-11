import { BorderAll } from "@mui/icons-material";
import { request } from "./apiClient";

export function getWord(wordId) {
    return request(`/api/v1/words/${wordId}`, {
        method : 'GET',
    });
}

export function saveWord(word) {
    return request('/api/v1/words', {
        method : 'POST',
        body : JSON.stringify(word)
    });
}

export function deleteWord(wordId) {
    return request(`/api/v1/words/${wordId}`, {
        method : 'DELETE',
    });
}