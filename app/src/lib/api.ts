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
        `Error: ${response.status} - ${
          responseJson.message || response.statusText
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
  export const fetchPosts = async (search?: string): Promise<PostWithUserData[]> => {
    let url = `${API_URL}/posts?withUserData=true`;

    // Add the search parameter to the URL if it's provided
    if (search) {
        // Encode the search string to ensure it's properly formatted in the URL
        const encodedSearch = encodeURIComponent(search);
        url += `&search=${encodedSearch}`;
    }

    const response = await fetch(url);
    const responseJson = await response.json();
    return responseJson.data;
  };

  // Fetch all housing items with filters
  export const fetchHousingItemsWithFilters = async (
    minAvgRating?: number,
    minReviewCount?: number,
    maxDistance?: number,
    maxPrice?: string,
  ): Promise<HousingItem[]> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const queryParams = new URLSearchParams();

    if (minAvgRating !== null && minAvgRating !== undefined) {
      queryParams.append('minAvgRating', minAvgRating.toString());
    }
  
    if (minReviewCount !== null && minReviewCount !== undefined) {
      queryParams.append('minReviewCount', minReviewCount.toString());
    }
  
    if (maxDistance !== null && maxDistance !== undefined) {
      queryParams.append('maxDistance', maxDistance.toString());
    }
  
    if (maxPrice !== null && maxPrice !== undefined) {
      queryParams.append('maxPrice', maxPrice);
    }

    const url = `${API_URL}/housings/filtered?${queryParams}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  };

  // Fetch all housing items
  export const fetchHousingItems = async (search?: string): Promise<HousingItem[]> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const queryParams = new URLSearchParams({
      limit: '50', // Default limit
    });

    // Add the search parameter to the query if it's provided
    if (search) {
      queryParams.append('search', search);
    }

    // Construct the final URL with query parameters
    const url = `${API_URL}/housings?${queryParams.toString()}`;
  
    // Fetch housing items using the constructed URL
    const response = await fetch(url);
    const responseJson = await response.json();

    if (!response.ok) {
        throw new Error(
          `Error: ${response.status} - ${
            responseJson.message || response.statusText
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
          `Error: ${response.status} - ${
            responseJson.message || response.statusText
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
        `Error: ${response.status} - ${
          responseJson.message || response.statusText
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
    console.log(housingId);
    console.log(id);
  
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