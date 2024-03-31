import { getAuthenticatedUser, getAuthenticatedUserToken, removeAuthenticatedUserToken, storeAuthenticatedUserToken } from "./auth";
import { PostType, PostWithUserData, User, HousingItem, ReviewWithUserData } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUser = async (
  email: string
): Promise<User> => {
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/users/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }

  return responseJson.data;

};

// Login, store the token, and return the user
export const login = async (
  email: string,
  password: string,
): Promise<User> => {
  const response = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }

  const { access_token } = responseJson.data;

  if (!access_token) {
    throw new Error("Authentication token is missing from the response!");
  }

  storeAuthenticatedUserToken(access_token);
  const user = getAuthenticatedUser();
  return user;
};

// Logout and clear the token
export const logout = async (): Promise<void> => {
  // You can send a request to the server to perform server-side logout
  // Here we just clear the token
  removeAuthenticatedUserToken();
};


// Register a new user
export const register = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  avatar?: string,
): Promise<void> => {
  const response = await fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, firstName, lastName, avatar }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }
};

export const createPost = async (
  title: string,
  content: string,
  cost: number,
  address: string,
  type: PostType,
  image?: string,
): Promise<PostWithUserData> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();

  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content, cost, address, image, type }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }

  return {
    ...responseJson.data,
    user: user,
  };
};

export const deletePost = async (id: string): Promise<void> => {
  const token = getAuthenticatedUserToken();

  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }
};

export const editPost = async (
  postId: string,
  title?: string,
  content?: string,
  cost?: number,
  address?: string,
  image?: string,
  type?: PostType,
): Promise<PostWithUserData | undefined> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();

  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, content, cost, address, image, type }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }

  return {
    ...responseJson.data,
    user: user,
  };
};

// Fetch all posts with user data
export const fetchPosts = async (query?: string): Promise<PostWithUserData[]> => {
  let url = `${API_URL}/posts?withUserData=true`;
  if (query) {
    url += `${query}`;
  }
  const response = await fetch(url);
  const responseJson = await response.json();
  return responseJson.data;
};

// Fetch all housing items
export const fetchHousingItems = async (query?: string): Promise<HousingItem[]> => {
  const API_URL = import.meta.env.VITE_API_URL;
  let url = `${API_URL}/housings?limit=50`;
  if (query) {
    url += `&${query}`;
  }
  const response = await fetch(url)
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }

  const housingItems = responseJson.data.map((item: HousingItem) => ({
    ...item,
    latitude: typeof item.latitude === 'number' ? item.latitude : parseFloat(item.latitude || '0'),
    longitude: typeof item.longitude === 'number' ? item.longitude : parseFloat(item.longitude || '0'),
  }));


  return housingItems;
};

// Fetch one housing item
export const fetchHousingItem = async (
  id: string
): Promise<HousingItem> => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/housings/${id}`)
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }

  return responseJson.data;
};

// NOT consistent with backend
// Add housing items
export const createHousingItem = async (
  name: string,
  address: string,
  distance: number,
  price: string,
  imageURL?: string,
): Promise<HousingItem> => {
  const API_URL = import.meta.env.VITE_API_URL;
  const response = await fetch(`${API_URL}/housings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, address, distance, price, imageURL }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }

  return responseJson.data;
};

//reviews ----
export const createReview = async (
  content: string,
  rating: number,
  housingId: string
): Promise<ReviewWithUserData> => {
  const user = getAuthenticatedUser();
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/housings/${housingId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content, rating }),
  });
  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText}`,
    );
  }

  return {
    ...responseJson.data,
    user: user,
  };
};

export const fetchReviews = async (housingId: string): Promise<ReviewWithUserData[]> => {
  const response = await fetch(`${API_URL}/housings/${housingId}/reviews?withUserData=true`);
  const responseJson = await response.json();
  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText}`,
    );
  }
  return responseJson.data; // Assuming the server responds with an array of reviews
};

export const deleteReview = async (housingId: string, id: string): Promise<void> => {
  const token = getAuthenticatedUserToken();

  const response = await fetch(`${API_URL}/housings/${housingId}/reviews/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const responseJson = await response.json();
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText}`,
    );
  }

  // Assuming no content is returned for a DELETE operation
};

export const editUser = async (
  id: number,
  firstName?: string,
  lastName?: string,
  avatar?: string,
  bio?: string,
): Promise<User> => {
  const token = getAuthenticatedUserToken();
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ firstName, lastName, avatar, bio }),
  });

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }

  return responseJson.data;

};

export const sendEmail = async (
  name: string,
  email: string,
  subject: string,
  message: string,
  emailTo: User,
) => {
  const apiKey = "api-CE75802CDC984ECA988EAA1C66B5A40F";
  const url = "https://api.smtp2go.com/v3/email/send";

  const emailData = {
    to: [`${emailTo.firstName} ${emailTo.lastName} <${emailTo.email}>, ${name} <${email}>`],
    sender: "Off Campus Housing <ooseoffcampushousing@outlook.com>",
    subject: `${subject}`,
    text_body: `${message}`
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: apiKey,
        ...emailData
      })
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(`Error: ${response.status} - ${errorResponse.message}`);
    }

    const responseData = await response.json();
    console.log("Email sent successfully:", responseData);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const incrementNotifications = async (
  email: string,
): Promise<User> => {
  const response = await fetch(
    `${API_URL}/users/${email}/notifications`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }

  return responseJson.data;
};

export const clearNotifs = async (
  email: string,
): Promise<User> => {
  const response = await fetch(
    `${API_URL}/users/${email}/clearNotifs`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const responseJson = await response.json();

  if (!response.ok) {
    throw new Error(
      `Error: ${response.status} - ${responseJson.message || response.statusText
      }`,
    );
  }

  return responseJson.data;
};

