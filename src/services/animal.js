import axiosServices from '@/services/axios.config';
import { prefered } from '@/app/api/camera/route';

export async function getAllAnimals({ page = null }) {
  try {
    const queryParams = {
      page: page,
    };
    const response = await axiosServices.get('/animal', { params: queryParams });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getShortestAnimalDistance({ xPosition = 0, yPosition = 0 }) {
  try {
    const payload = {
      xRequest: xPosition,
      yRequest: yPosition,
    };
    const response = await axiosServices.post('/shortest/animal', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getDetailAnimal({ animalId }) {
  try {
    const response = await axiosServices.get(`/animal/${animalId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getRecomendationAnimal() {
  try {
    const { gender, age } = prefered;
    const payload = {
      prefGender: gender,
      prefAge: age,
    };
    const response = await axiosServices.post('/reccomendation/animal', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}
