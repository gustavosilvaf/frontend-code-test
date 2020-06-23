import { baseUrl } from '../utils/constants';

export const loadPeople = async () => {
  const response = await fetch(`${baseUrl}/people.json`).then((res) =>
    res.json()
  );
  return await response;
};

export const getUUID = (e) => {
  return e.split('/')[5];
};
