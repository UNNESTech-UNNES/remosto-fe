import axiosServices from '@/services/axios.config';

export async function getListStoresFnB() {
  try {
    const response = await axiosServices.get('/store/all/1');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getListShortestStoresFnB({ xPosition, yPosition }) {
  try {
    const payload = {
      xRequest: xPosition,
      yRequest: yPosition,
      storeType: 1,
    };
    const response = await axiosServices.post(`/shortest/store`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getListStoresSouvenir() {
  try {
    const response = await axiosServices.get('/store/all/2');
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getDetailStore({ id }) {
  try {
    const response = await axiosServices.get(`/store/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getListProductsOnStore({ id }) {
  try {
    const response = await axiosServices.get(`/store/product/${id}/all`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
