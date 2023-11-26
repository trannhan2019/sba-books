const url =
  `${import.meta.env.VITE_BACK_END_URL}/storage` ||
  "http://localhost:8000/storage";

export const getUrlImage = (photo = "") => {
  return `${url}/${photo}`;
};

import.meta.env.VITE_TEST_VAR;
