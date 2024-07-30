import axiosServices from '@/services/axios.config';

export async function insertFeedback({
  section = null,
  star = null,
  categories = null,
  desc = null,
}) {
  try {
    const payload = {
      section,
      star,
      categories,
      desc,
    };
    const response = await axiosServices.post('/feedback', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}
