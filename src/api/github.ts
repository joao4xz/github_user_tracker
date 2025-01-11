import axios from 'axios'
import { GitHubHeaders } from '../@types/headers';

const BASE_URL = 'https://api.github.com';

export const fetchUserData = async (username: string, token: string = '') => {
  const headers: GitHubHeaders = {
    'X-GitHub-Api-Version': '2022-11-28',
  }

  token !== '' ? headers['Authorization'] = `Bearer ${token}` : null;

  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`, { headers })
    return response.data
  } catch (error: any) {
    if (error.response.status === 404) {
      console.error("Resource not found (404):", error.message);
    } else if (error.response.status === 500) {
      console.error("Server error (500):", error.message);
    } else {
      console.error('Error fetching user data:', error);
    }

    throw error;
  }
};
