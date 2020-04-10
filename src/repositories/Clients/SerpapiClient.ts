// Warning this client doesn't work due to CORS policy

import axios from 'axios';

const baseURL = 'https://serpapi.com/search';

const defaultParams = {
  tbm: 'isch',
  ijn: 0,
};

const client = axios.create({
  baseURL,
});

// Unfortunately due to a bug in axios there is no means
// of setting default query parameters. More on this:
// https://github.com/axios/axios/issues/2190
client.interceptors.request.use((config) => {
  Object.entries(defaultParams).forEach(([key, value]) => {
    // eslint-disable-next-line no-param-reassign
    config.params[key] = value;
  });

  return config;
});

export default client;
