import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const DEEPSEEK_API_URL = 'https://api.deepseek.com/recommend'; // Replace with the actual DeepSeek API URL
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

export async function getMovieRecommendationFromDeepSeek(analysisResult: any) {
  try {
    const response = await axios.post(DEEPSEEK_API_URL, analysisResult, {
      headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return response.data; // Adjust based on the API's response structure
  } catch (error) {
    console.error('Error fetching recommendation from DeepSeek:', error);
    throw new Error('Failed to fetch recommendation from DeepSeek');
  }
}