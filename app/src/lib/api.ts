import { getAuthenticatedUser, getAuthenticatedUserToken, removeAuthenticatedUserToken, storeAuthenticatedUserToken } from "./auth";
import { User } from "./types";

const API_URL = import.meta.env.VITE_API_URL;

export const fetchUser = async (
    email: string
) : Promise<User> => {
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
          `Error: ${response.status} - ${
            responseJson.message || response.statusText
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
        `Error: ${response.status} - ${
          responseJson.message || response.statusText
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
  
  
  import { HousingItem } from "./types";

// Fetch all housing items
export const fetchHousingItems = async (): Promise<HousingItem[]> => {
    const API_URL = import.meta.env.VITE_API_URL;
    const response = await fetch(`${API_URL}/housings?limit=50`)
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
  
    // originally, ...responseJson.data
    return {
      ...responseJson
    };
  };