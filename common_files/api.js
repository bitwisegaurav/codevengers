const server = "http://127.0.0.1:8000/api/v1";

async function apiCall(api, method = "POST", data) {
    if(!api) return null;

    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        ...(data && {body: JSON.stringify(data)}),
        credentials: "include"
    }

    try {
        const response = await fetch(server + api, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Fetch Error:', error);
        return null;
    }
}