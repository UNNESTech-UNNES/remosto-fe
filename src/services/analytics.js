import axiosServices from '@/services/axios.config';

export async function insertAnalytics({ visitedUrl = null }) {
  try {
    const payload = {
      visitedUrl: visitedUrl,
    };
    const response = await axiosServices.post('/analytics', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}
