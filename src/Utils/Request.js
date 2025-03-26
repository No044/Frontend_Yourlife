const domain = "http://localhost:3001/api/v1/";

export const GetData = async (path) => {
    try {
        const response = await fetch(domain + path, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
        });



        return await response.json();
    } catch (error) {
        return {
            status: false,
            type: "Auth",
            error: 600,
            data: null
        }


    }
};

export const PostData = async (path, option) => {
    try {
        const response = await fetch(domain + path, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(option),
        });



        return await response.json();
    } catch (error) {
        return {
            status: false,
            type: "Auth",
            error: 600,
            data: null
        }

    }
};

export const PatchData = async (path, option) => {
    try {
        const response = await fetch(domain + path, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(option),
        });


        return await response.json();
    } catch (error) {
        return {
            status: false,
            type: "Auth",
            error: 600,
            data: null
        }
    }
};
