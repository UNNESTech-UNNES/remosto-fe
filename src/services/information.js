import axiosServices from '@/services/axios.config';
import { prefered } from '@/app/api/camera/route';

export async function getListInformations({ keywoard = null }) {
  try {
    const queryParams = {
      keywoard: keywoard,
    };
    const response = await axiosServices.get('/search/all', { params: queryParams });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getListInformationByInfra({ infraId = null }) {
  try {
    const response = await axiosServices.get(`/infrastructure/type/${infraId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getAllInfrastructure() {
  try {
    const amusementResult = (await axiosServices.get(`/infrastructure/type/1`)).data;
    const publicFacilitiesResult = (await axiosServices.get(`/infrastructure/type/2`)).data;
    const souvenirStoreResult = (await axiosServices.post(`/shortest/store`, {
      xRequest: 0,
      yRequest: 0,
      storeType: 2
    })).data;

    const amusementData = await amusementResult.data.map((value, key) => ({...value, type: 1}))
    const publicFacilitiesData = await publicFacilitiesResult.data.map((value, key) => ({...value, type: 2}))
    const souvenirStoreData = await souvenirStoreResult.data.map((value, key) => ({...value, type: 3}))

    const response = [
      ...amusementData,
      ...publicFacilitiesData,
      ...souvenirStoreData
    ]
    return response
  } catch (error) {
    throw error;
  }
}

export async function getListShortestInformation({ xPosition = 0, yPosition = 0 }) {
  try {
    const payload = {
      xRequest: xPosition,
      yRequest: yPosition,
    };
    const response = await axiosServices.post('/shortest/information', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getDetailInformation({ type, id }) {
  try {
    let response;
    if (type === 'information') {
      response = await axiosServices.get(`/information/${id}`);
      response.data.data.type = 'information';
    } else if (type === 'animal') {
      response = await axiosServices.get(`/animal/${id}`);
      response.data.data.type = 'animal';
    } else if (type === 'store') {
      response = await axiosServices.get(`/store/${id}`);
      response.data.data.type = 'store';
    } else {
      throw 'type not defined';
    }
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getRecomendationInformation() {
  try {
    const { gender, age } = prefered;
    const payload = {
      prefGender: gender,
      prefAge: age,
    };
    const animalResult = await axiosServices.post('/reccomendation/animal', payload);
    const animalData = await animalResult.data.data.map( (value, index) => {
      value.type = "animal"
      return value
    })
    const infoResult = await axiosServices.post('/reccomendation/information', payload);
    const infoData = await infoResult.data.data.map( (value, index) => {
      value.type = "information"
      return value
    })
    const storeResult = await axiosServices.post('/reccomendation/store', payload);
    const storeData = await storeResult.data.data.map( (value, index) => {
      value.type = "store"
      return value
    })

    const response = {
      data: [...animalData, ...infoData, ...storeData],
    };
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getDetailPublicFacility({ id, type = 1 }) {
  try {
    const endpoint = type === 3 ? `store/${id}` : `/information/${id}`
    const response = await axiosServices.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getRecomendationPublicFacility() {
  try {
    const { gender, age } = prefered;
    const payload = {
      prefGender: gender,
      prefAge: age,
    };
    const response = await axiosServices.post('/reccomendation/information', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}
