import { BorderAll } from "@mui/icons-material";
import { request } from "./apiClient";

export function getWord(wordId) {
    return request(`/api/v1/words/${wordId}`, {
        method : 'GET',
    });
}

export async function saveWord(word) {
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

//크롤링 관련 api
export function extractWord(url,level, purpose) {
    const query = new URLSearchParams({
        url : url,
        level : level,
        purpose : purpose
    }).toString();

    return request(`/api/v1/extract-words?${query}`, {
        method : 'GET',
    })
}