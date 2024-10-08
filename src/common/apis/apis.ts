import axios from 'axios';
import instance from './instance';

const base_url = import.meta.env.VITE_BASE_URL;

export const getData = async () => {
  try {
    const { data } = await axios.get(`${base_url}/api/onboarding`);
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getDashboard = async (address: string | null) => {
  if (!address) return;
  const { data } = await instance.get(
    `${base_url}/api/dashboard?user_id=${address}`
  );
  return data;
};
