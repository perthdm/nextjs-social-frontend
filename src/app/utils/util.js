export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ENV = process.env.NODE_ENV;

export const delay = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

export const STORAGE = {
  GET: (key) => sessionStorage.getItem(key),
  SET: (key, value) => sessionStorage.setItem(key, value),
  CLEAR: () => sessionStorage.clear(),
};
