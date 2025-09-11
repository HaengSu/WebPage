import { ResetTvTwoTone } from "@mui/icons-material";

export async function request(url, option = {}) {
    const response = await fetch(`http://localhost:5000${url}`, {
        headers : {
            'Content-Type' : 'application/json',
        },
        ...option,
    });

    if(response.ok == false) {
        const errorData = await response.json();
        throw new Error(`status : ${response.status}\nmessage : ${errorData.error.message}`);

        
    }

    return response.json();
}