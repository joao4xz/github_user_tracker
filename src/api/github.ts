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
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};
