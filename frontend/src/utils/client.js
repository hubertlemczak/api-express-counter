const LOCAL_SERVER_URL = 'http://localhost:3030/';

const response = async (path, opts, url) => {
  const res = await fetch(`${url || LOCAL_SERVER_URL}${path}`, opts);
  const data = await res.json();
  return data;
};

export const client = {
  get: async (path, url) => await response(path, url),
  post: async (path, opts, url) => await response(path, opts, url),
  put: async (path, opts, url) => await response(path, opts, url),
  delete: async (path, opts, url) => await response(path, opts, url),
};
