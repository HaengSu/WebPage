export async function request(url, option = {}) {
    const response = await fetch(`http://localhost:5000${url}`, {
        headers : {
            'Content-Type' : 'application/json',
        },
        ...option,
    });

    if(response.ok == false) {
        throw new Error('API ERROR = '+ response.status);
    }

    return response.json();
}