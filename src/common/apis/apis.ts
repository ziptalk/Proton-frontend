import axios from 'axios';

const base_url = import.meta.env.VITE_BASE_URL;

export const getData = async () => {
  try {
    const { data } = await axios.get(`${base_url}/api/onboarding`);
    return data;
  } catch (err) {
    console.log(err);
  }
};
