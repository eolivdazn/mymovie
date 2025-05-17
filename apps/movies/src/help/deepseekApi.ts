import axios from 'axios';
import * as dotenv from 'dotenv';
dotenv.config();

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

export async function getMovieRecommendationFromDeepSeek(analysisResult: any) {
  try {
    const requestBody = {
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: `Can you recommend movie to watch? Here is my analysis: ${JSON.stringify(
            analysisResult,
          )}.Please reply with https://www.themoviedb.org/ id. mandatory reply JSON format. {data:id}`,
        },
      ],
      stream: false,
    };

    console.log('Sending request to DeepSeek...');
    const response = await axios.post(DEEPSEEK_API_URL, requestBody, {
      headers: {
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });


    return response.data.choices?.[0]?.message?.content || 'No recommendation found.';
  } catch (error: any) {
    if (error.response?.data?.error?.message === 'Insufficient Balance') {
      throw new Error('DeepSeek API request failed: Insufficient balance. Please check your account quota.');
    }
    console.error('Error fetching recommendation from DeepSeek:', error.response?.data || error.message);
    throw new Error('Failed to fetch recommendation from DeepSeek');
  }
}
