const domain = process.env.REACT_APP_BACKEND_URL;

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
    console.log(error);
    return {
      status: false,
      type: "Auth",
      error: 600,
      data: null,
    };
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
      data: null,
    };
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
      data: null,
    };
  }
};
